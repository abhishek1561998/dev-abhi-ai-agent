import { Id } from "@/convex/_generated/dataModel";

// SSE Constants
export const SSE_DATA_PREFIX = "data" as const;
export const SSE_DONE_MESSAGE = "[DONE]" as const;
export const SSE_LINE_DELIMITER = "\n\n" as const;

export type MessageRole = "user" | "assistant";

export type Message = {
  role: MessageRole;
  content: string;
};

export interface ChatRequestBody {
  messages: Message[];
  newMessage: string;
  chatId: Id<"chats">;
}

export interface ChatResponseBody {
  messages: Message[];
}

export enum streamMessageType {
  Token = "token",
  Error = "error",
  Connected = "connected",
  Done = "done",
  ToolStart = "tool_start",
  ToolEnd = "tool_end",
}

export interface BaseStreamMessage {
  type: streamMessageType;
}

export interface TokenMessage extends BaseStreamMessage {
  type: streamMessageType.Token;
  token: string;
}

export interface ErrorMessage extends BaseStreamMessage {
  type: streamMessageType.Error;
  error: string;
}
export interface ConnectedMessage extends BaseStreamMessage {
  type: streamMessageType.Connected;
}

export interface DoneMessage extends BaseStreamMessage {
  type: streamMessageType.Done;
}

export interface ToolStartMessage extends BaseStreamMessage {
  type: streamMessageType.ToolStart;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends BaseStreamMessage {
  type: streamMessageType.ToolEnd;
  tool: string;
  output: string;
}

// export interface ToolErrorMessage extends BaseStreamMessage {
//     type: streamMessageType.ToolError;
// }

// export interface ToolResultMessage extends BaseStreamMessage {
//     type: streamMessageType.ToolResult;
// }

export type streamMessage =
  | TokenMessage
  | ErrorMessage
  | ConnectedMessage
  | DoneMessage
  | ToolStartMessage
  | ToolEndMessage;

export interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
}
