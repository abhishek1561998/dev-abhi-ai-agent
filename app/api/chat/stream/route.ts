import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";
import { submitQuestion } from "@/lib/langgraph";
import {
  ChatRequestBody,
  SSE_DATA_PREFIX,
  SSE_LINE_DELIMITER,
  streamMessage,
  streamMessageType,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";

function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  data: streamMessage
) {
  const encoder = new TextEncoder();
  return writer.write(
    encoder.encode(
      `${SSE_DATA_PREFIX}: ${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
    )
  );
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as ChatRequestBody;
    const { messages, newMessage, chatId } = body;

    const convex = getConvexClient();

    // Create stream with larger queue strategy for better UX
    const stream = new TransformStream({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter();

    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disable buffering for nginx which is required for SSE to worj properly
      },
    });

    const startStream = async () => {
      try {
        // stream will be implemented here

        // Send initial message to indicate the connection is established
        await sendSSEMessage(writer, { type: streamMessageType.Connected });

        console.log("chatId", chatId);
        console.log("newMessage", newMessage);
        // Send User Message to Convex
        await convex.mutation(api.messages.send, {
          chatId,
          content: newMessage,
        });

        // convert message to langchain formate
        const langchainMessages = [
          ...messages.map((message) =>
            message.role === "user"
              ? new HumanMessage(message.content)
              : new AIMessage(message.content)
          ),
          new HumanMessage(newMessage),
        ];

        try {
          //Create the event stream
          const eventStream = await submitQuestion(langchainMessages, chatId);

          // Process the events
          for await (const event of eventStream) {
            if (event.event === "on_chat_model_stream") {
              const token = event.data.chunk;
              if (token) {
                const text = token.content.at(0)?.["text"];
                if (text) {
                  await sendSSEMessage(writer, {
                    type: streamMessageType.Token,
                    token: text,
                  });
                }
              }
            } else if (event.event === "on_tool_start") {
              await sendSSEMessage(writer, {
                type: streamMessageType.ToolStart,
                tool: event.name || "Unknown",
                input: event.data.input,
              });
            } else if (event.event === "on_tool_end") {
              const toolMessage = new ToolMessage(event.data.output);
              await sendSSEMessage(writer, {
                type: streamMessageType.ToolEnd,
                tool: toolMessage.lc_kwargs.name || "Unknown",
                output: event.data.output,
              });
            }
          }

          // Send the final message without stroring the response
          await sendSSEMessage(writer, {
            type: streamMessageType.Done,
          });
        } catch (streamError) {
          console.error("Error streaming response:", streamError);
          await sendSSEMessage(writer, {
            type: streamMessageType.Error,
            error:
              streamError instanceof Error
                ? streamError.message
                : "Stream Processing failed",
          });
        }
      } catch (error) {
        console.error("Error starting stream:", error);
        await sendSSEMessage(writer, {
          type: streamMessageType.Error,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        try {
          await writer.close();
        } catch (closeError) {
          console.error("Error closing writer:", closeError);
        }
      }
    };
    startStream();

    return response;
  } catch (error) {
    console.error("Error in chat stream", error);
    return NextResponse.json(
      { error: "Failed to process chat request" } as const,
      { status: 500 }
    );
  }
}
