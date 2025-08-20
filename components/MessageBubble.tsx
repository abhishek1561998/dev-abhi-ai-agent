"use client";

import { MessageBubbleProps } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BotIcon, User } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

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
  const { currentTheme } = useTheme();
  const formattedContent = formalMessage(content);

  return (
    <div className="group animate-in fade-in-0 duration-300">
      <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
        {/* Avatar - Left side for AI */}
        {!isUser && (
          <div className="flex-shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border"
              style={{
                backgroundColor: currentTheme.colors.primary,
                borderColor: currentTheme.colors.border + "40"
              }}
            >
              <BotIcon className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-3 max-w-[85%] md:max-w-[75%] shadow-sm border transition-all duration-200 ${
            isUser ? "rounded-br-md" : "rounded-bl-md"
          }`}
          style={{
            backgroundColor: isUser
              ? currentTheme.colors.primary
              : currentTheme.colors.surface,
            color: isUser
              ? 'white'
              : currentTheme.colors.text,
            borderColor: currentTheme.colors.border + "20"
          }}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {formattedContent.includes("<div") ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
                style={{
                  color: isUser ? 'white' : currentTheme.colors.text
                }}
              />
            ) : (
              <div className="prose prose-sm max-w-none">
                {formattedContent}
              </div>
            )}
          </div>
        </div>

        {/* Avatar - Right side for User */}
        {isUser && (
          <div className="flex-shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border + "40"
              }}
            >
              {user?.imageUrl ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback
                    className="text-xs"
                    style={{
                      backgroundColor: currentTheme.colors.primary + "20",
                      color: currentTheme.colors.primary
                    }}
                  >
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User
                  className="h-4 w-4"
                  style={{ color: currentTheme.colors.textSecondary }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
