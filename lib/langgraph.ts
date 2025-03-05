import { ChatAnthropic } from "@langchain/anthropic";
import wxflows from "@wxflows/sdk/langchain";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import SYSTEM_MESSAGE from "@/constants/systemMessage";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";
// Connect to wxflows

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

const toolClient = new wxflows({
  endpoint: process.env.WXFLOW_ENDPOINT || "",
  apikey: process.env.WXFLOW_APIKEY,
});

// Retrieve all tools from wxflows
const tools = await toolClient.lcTools;

const toolNode = new ToolNode(tools);

const initialiseModel = () => {
  const model = new ChatAnthropic({
    modelName: "claude-3-7-sonnet-20250219",
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    temperature: 0.7,
    maxTokens: 4096,
    streaming: true,
    clientOptions: {
      defaultHeaders: {
        "anthropic-version": "2023-06-01",
      },
      maxRetries: 10,
    },
    callbacks: [
      {
        handleLLMStart: async (llm, prompts) => {
          console.log("LLM Start");
        },
        handleLLMEnd: async (output) => {
          console.log("LLM End", output);
          const usage = output.llmOutput?.usage;

          output.generations.map((generation) => {
            generation.map((message) => {
              console.log("Message------------->", JSON.stringify(message));
            });
          });
          if (usage) {
            console.log(
              `LLM Usage: ${usage.promptTokens} prompt tokens, ${usage.completionTokens} completion tokens, ${usage.totalTokens} total tokens`
            );
          }
        },
      },
    ],
  }).bindTools(tools);
  return model;
};

const shouldContinue = (state: typeof MessagesAnnotation.State) => {
  const message = state.messages;
  const lastMessage = message[message.length - 1] as AIMessage;

  // If  the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // If the last message is a tool message , then return back to the agent
  if (lastMessage.content && lastMessage._getType() === "tool") {
    return "agent";
  }
  // Otherwise, we stop (reply to the user)
  return END;
};

const createWorkflow = async () => {
  const model = initialiseModel();
  const stateGraph = new StateGraph(MessagesAnnotation)
    .addNode("agent", async (state) => {
      const systemContent = SYSTEM_MESSAGE;
      //create a prompt template with the system message and the user message
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemContent, {
          cache_control: { type: "ephemeral" }, // set a cache breakpoint (max number  of breakpoints is 4)
        }),
        new MessagesPlaceholder("messages"),
      ]);

      // trim the message to manage the conversation history

      const trimmedMessages = await trimmer.invoke(state.messages);

      const prompt = await promptTemplate.invoke({ messages: trimmedMessages });

      const response = await model.invoke(prompt);

      return { messages: [response] };
    })
    .addEdge(START, "agent")
    .addNode("tool", toolNode)
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tool", "agent");

  return stateGraph;
};

function addCachingHeaders(messages: BaseMessage[]): BaseMessage[] {
  // Rules of the caching headers for turn-by-turn the Conversation
  // 1. Cache the first SYSTEM message
  // 2. Cache the last SYSTEM message
  // 3. Cache the last messages
  // 4. Cache the second to last messages

  if (!messages.length) return messages;

  // Create the copy of message to avoid  mutating the original messages
  const cachedMessages = [...messages];

  // Helper to add the cache control
  const addCache = (message: BaseMessage) => {
    message.content = [
      {
        type: "text",
        text: message.content as string,
        cache_control: { type: "ephemeral" },
      },
    ];
  };
  // Cache the last SYSTEM message
  addCache(cachedMessages.at(-1)!);
  // Find the Cached the second-to-last human message
  let humanCount = 0;
  for (let i = cachedMessages.length - 1; i >= 0; i--) {
    if (cachedMessages[i] instanceof HumanMessage) {
      humanCount++;
      if (humanCount === 2) {
        addCache(cachedMessages[i]);
        break;
      }
    }
  }
  return cachedMessages;
}

export async function submitQuestion(messages: BaseMessage[], chatId: string) {
  const cachedMessages = addCachingHeaders(messages);
  console.log("cachedMessages", cachedMessages);
  const workflow = await createWorkflow();

  //create a check point to save the state of the conversation
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer });

  console.log("messages", messages);
  // Run the graph and stream

  const stream = await app.streamEvents(
    {
      messages: cachedMessages,
    },
    {
      version: "v2",
      configurable: {
        thread_id: chatId, // Fixed: Changed thread_Id to thread_id
      },
      streamMode: "messages",
      runId: chatId,
    }
  );

  //return the stream
  return stream;
}
