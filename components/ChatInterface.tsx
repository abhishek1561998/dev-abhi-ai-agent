"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { ChatRequestBody, streamMessageType } from "@/lib/types";
import { createSSEParser } from "@/lib/createSSEParser";
import { getConvexClient } from "@/lib/convex";
import MessageBubble from "./MessageBubble";
import WelcomeMessage from "./WelcomeMessage";
import { useTheme } from "@/lib/ThemeProvider";

interface Message {
  _id: Id<"messages">;
  content: string;
  role: "user" | "assistant";
  createdAt: number;
}

interface ChatInterfaceProps {
  chatId: Id<"chats">;
  initalMessages: Message[];
}

export default function ChatInterface({
  chatId,
  initalMessages,
}: ChatInterfaceProps) {
  const { user } = useUser();
  const { currentTheme } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initalMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useMutation(api.messages.send);
  const latestMessages = useQuery(api.messages.list, { chatId });
  const [streamedResponse, setStreamedResponse] = useState<string>("");
  const [currentTool, setCurrentTool] = useState<{
    name: string;
    input: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatToolOutput = (output: unknown) => {
    if (typeof output === "string") return output;
    try {
      return JSON.stringify(output, null, 2);
    } catch (err) {
      return String(output);
    }
  };

  const formatTerminalOutput = (
    tool: string,
    input: unknown,
    output: unknown
  ) => {
    const terminalHtml = `
        <div class="bg-[#1e1e1e] text-white font-mono p-4 rounded-lg my-3 overflow-x-auto whitespace-normal max-w-[600px] shadow-lg">
            <div class="flex items-center gap-2 border-b border-gray-700 pb-2">
                <span class="text-red-400 text-lg">●</span>
                <span class="text-yellow-400 text-lg">●</span>
                <span class="text-green-400 text-lg">●</span>
                <span class="text-gray-300 ml-2 text-sm font-semibold">${tool}</span>
            </div>
            <div class="text-gray-300 mt-3 font-semibold">$ Input</div>
            <pre class="text-yellow-300 mt-1 whitespace-pre-wrap overflow-x-auto bg-black/20 p-2 rounded">${formatToolOutput(input)}</pre>
            <div class="text-gray-300 mt-3 font-semibold">$ Output</div>
            <pre class="text-green-300 mt-1 whitespace-pre-wrap overflow-x-auto bg-black/20 p-2 rounded">${formatToolOutput(output)}</pre>
        </div>`;

    return `----START----\n${terminalHtml}\n---END----`;
  };

  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onChunk: (chunk: string) => Promise<void>
  ) => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        try {
          await onChunk(chunk);
        } catch (err) {
          console.error("Error processing chunk:", err);
          throw err;
        }
      }
    } finally {
      reader.releaseLock();
    }
  };

  let trimmedInput = "";
  useEffect(() => {
    if (latestMessages) {
      setMessages(latestMessages);
    }
  }, [latestMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Reset UI state for new message
    setInput("");
    setStreamedResponse("");
    setCurrentTool(null);
    setIsLoading(true);

    // Add optimistic user message - users message imidiatly for better UX
    const optimisticUserMessage: Doc<"messages"> = {
      _id: `temp_${Date.now()}`,
      chatId,
      content: trimmedInput,
      role: "user",
      createdAt: Date.now(),
    } as Doc<"messages">;

    // Update messages state with optimistic user message
    setMessages((prevMessages) => [...prevMessages, optimisticUserMessage]);

    let fullResponse = "";

    // Start streaming response
    try {
      const requestBody: ChatRequestBody = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        newMessage: trimmedInput,
        chatId,
      };

      // Initialize SSE connection
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      if (!response.body) throw new Error("No response body available");

      // Handle the stream
      const parser = createSSEParser();
      const reader = response.body.getReader();

      await processStream(reader, async (chunk) => {
        console.log("Raw chunk:", chunk);
        const messages = parser.parse(chunk);
        console.log("Parsed messages:", messages);

        for (const message of messages) {
          try {
            console.log("Processing message:", message);
            switch (message.type) {
              case streamMessageType.Token:
                if (message.token) {
                  fullResponse += message.token;
                  setStreamedResponse(fullResponse);
                }
                break;
              case "text":
                if (message.content) {
                  fullResponse += message.content;
                  setStreamedResponse(fullResponse);
                }
                break;
              case streamMessageType.ToolStart:
                if (message.tool) {
                  setCurrentTool({
                    name: message.tool,
                    input: message.input as string,
                  });
                  fullResponse += formatTerminalOutput(
                    message.tool,
                    message.input,
                    "processing..."
                  );
                  setStreamedResponse(fullResponse);
                }
                break;
              case streamMessageType.ToolEnd:
                if (message.tool && currentTool) {
                  const lastTerminalIndex = fullResponse.lastIndexOf(
                    '<div class="bg-[#1e1e1e]'
                  );
                  if (lastTerminalIndex !== -1) {
                    fullResponse =
                      fullResponse.substring(0, lastTerminalIndex) +
                      formatTerminalOutput(
                        message.tool,
                        currentTool.input,
                        message.output
                      );
                    setStreamedResponse(fullResponse);
                  }
                  setCurrentTool(null);
                }
                break;
              case streamMessageType.Error:
                console.error("Stream error:", message.error);
                setStreamedResponse(
                  formatTerminalOutput(
                    "error",
                    "Error processing message",
                    message.error || "Unknown error"
                  )
                );
                break;
              case streamMessageType.Done:
                if (fullResponse) {
                  const assistantMessage: Doc<"messages"> = {
                    _id: `temp_assistant_${Date.now()}`,
                    chatId,
                    content: fullResponse,
                    role: "assistant",
                    createdAt: Date.now(),
                  } as Doc<"messages">;
                  setMessages((prev) => [...prev, assistantMessage]);
                  setStreamedResponse("");
                }
                return;
            }
          } catch (error) {
            console.error("Error processing message:", error, message);
            setStreamedResponse(
              formatTerminalOutput(
                "error",
                "Failed to process message",
                error instanceof Error ? error.message : "Unknown error"
              )
            );
          }
        }
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prevMessages) =>
        prevMessages.filter(
          (messages) => messages._id !== optimisticUserMessage._id
        )
      );
      setStreamedResponse(
        formatTerminalOutput(
          "error",
          "Failed to Process message",
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const optimisticUserMessage: Doc<"messages"> = {
    _id: `temp_${Date.now()}`,
    chatId,
    content: trimmedInput,
    role: "user",
    createdAt: Date.now(),
  } as Doc<"messages">;

  return (
    <main
      className="flex flex-col h-full backdrop-blur-sm relative"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.background}95, ${currentTheme.colors.surface}20)`
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[size:20px_20px]"
          style={{
            backgroundImage: `radial-gradient(circle, ${currentTheme.colors.primary} 1px, transparent 1px)`
          }}
        />
      </div>

      {/* Messages Container */}
      <section
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${currentTheme.colors.border}40 transparent`
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Welcome Message */}
          {messages.length === 0 && <WelcomeMessage />}

          {/* Messages */}
          {messages?.map((message) => (
            <MessageBubble
              key={message._id}
              content={message.content}
              isUser={message.role === "user"}
            />
          ))}
          {streamedResponse && (
            <MessageBubble content={streamedResponse} isUser={false} />
          )}

          {isLoading && !streamedResponse && (
            <div className="flex justify-start animate-in fade-in-0">
              <div className="rounded-2xl px-4 py-3 bg-white text-gray-900 rounded-bl-none shadow-md ring-1 ring-inset ring-gray-200">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500 animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    {[0.3, 0.15, 0].map((delay, i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-blue-500/70 animate-bounce"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Last Message */}
          <div ref={messagesEndRef} />
        </div>
      </section>

      {/* Input Form */}
      <footer
        className="relative z-10 border-t backdrop-blur-xl p-4 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}90, ${currentTheme.colors.background}90)`,
          borderColor: currentTheme.colors.border + "20"
        }}
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-3">
            {/* AI Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                 style={{ backgroundColor: currentTheme.colors.surface + "60" }}>
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: currentTheme.colors.success }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                AI
              </span>
            </div>

            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 py-3 px-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
              style={{
                color: currentTheme.colors.text,
                backgroundColor: currentTheme.colors.surface + "60",
                borderColor: currentTheme.colors.border + "40",
                '--tw-ring-color': currentTheme.colors.primary + "60"
              } as any}
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              style={{
                background: input.trim()
                  ? `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                  : currentTheme.colors.surface + "60",
                color: input.trim() ? 'white' : currentTheme.colors.textSecondary,
                border: `1px solid ${input.trim() ? currentTheme.colors.primary : currentTheme.colors.border}40`,
                cursor: input.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>

            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 rounded-xl h-12 w-12 p-0 flex items-center justify-center transition-all duration-300 group hover:scale-105"
              style={{
                background: input.trim()
                  ? `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                  : currentTheme.colors.surface,
                color: input.trim() ? 'white' : currentTheme.colors.textSecondary,
                boxShadow: input.trim() ? `0 4px 20px ${currentTheme.colors.primary}25` : 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              {isLoading ? (
                <div className="relative">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <div
                    className="absolute inset-0 rounded-full animate-pulse opacity-20"
                    style={{ backgroundColor: currentTheme.colors.primary }}
                  />
                </div>
              ) : (
                <Send className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </form>
      </footer>
    </main>
  );
}
