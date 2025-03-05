"use client";

import { MessageBubbleProps } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BotIcon } from "lucide-react";

const formalMessage = (content: string): string => {
  if (!content) return "";

  // First unescape backslashes
  content = content.replace(/\\\\/g, "\\");
  // Then handle newlines
  content = content.replace(/\\\n/g, "\n");
  // Remove only the markers but keep the content between them
  content = content
    .replace(/----START----\n?/g, "")
    .replace(/\n?---END----/g, "");
  // Trim any extra whitespace that might be left
  return content.trim();
};

function MessageBubble({ content, isUser }: MessageBubbleProps) {
  const { user } = useUser();
  const formattedContent = formalMessage(content);

  return (
    <div className="group animate-in fade-in-0 duration-100">
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2 max-w-[85%] md:max-w-[75%] shadow-md ring-1 ring-inset relative transition-all duration-200 ${
            isUser
              ? "bg-teal-600 text-white rounded-br-none ring-gray hover:bg-teal-500"
              : "bg-white text-gray-800 rounded-bl-none ring-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
            {formattedContent.includes("<div") ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            ) : (
              <div className="prose prose-sm max-w-none">
                {formattedContent}
              </div>
            )}
          </div>
          <div
            className={`absolute bottom-0 ${
              isUser ? "-right-3 translate-y-1/2" : "-left-3 translate-y-1/2"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 ${
                isUser
                  ? "bg-white border-blue-200 group-hover:border-blue-300"
                  : "bg-blue-600 border-white group-hover:bg-blue-700"
              } flex items-center justify-center shadow-md transition-colors duration-200`}
            >
              {isUser ? (
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <BotIcon className="h-5 w-5 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
