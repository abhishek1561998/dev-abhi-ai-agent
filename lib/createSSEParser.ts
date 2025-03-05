import { Stream } from "stream";
import {
  SSE_DONE_MESSAGE,
  streamMessageType,
  SSE_DATA_PREFIX,
  streamMessage,
} from "./types";

/**
 * Create a parser for Server-Sent Events (SSE) stream
 *
 * SSE allows real-time communication from the server to the client.
 */

export function createSSEParser() {
  let buffer = "";

  return {
    parse(chunk: string) {
      buffer += chunk;
      const messages = [];
      const lines = buffer.split("\n");
      buffer = "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = line.slice(6).trim(); // Remove 'data: ' prefix and trim
            if (data === "[DONE]") {
              messages.push({ type: "done" });
              continue;
            }
            const parsedData = JSON.parse(data);
            messages.push(parsedData);
          } catch (error) {
            console.error("Failed to parse SSE message:", error, line);
            // Add the raw line to help with debugging
            messages.push({
              type: "error",
              error: `Failed to parse: ${line}`,
              raw: line,
            });
          }
        } else if (line.trim()) {
          buffer += line + "\n";
        }
      }

      return messages;
    },
  };
}
