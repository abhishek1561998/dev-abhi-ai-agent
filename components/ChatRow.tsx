import Link from "next/link";
import { Trash2, MessageSquare } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useTheme } from "@/lib/ThemeProvider";
// import TimeAgo from "react-timeago";
interface ChatRowProps {
  chatId: Id<"chats">;
  title: string;
  onDelete: (chatId: string, e: React.MouseEvent) => Promise<void>;
  onMobileNavClose?: () => void;
}

export default function ChatRow({
  chatId,
  onDelete,
  onMobileNavClose,
}: ChatRowProps) {
  const { currentTheme } = useTheme();
  const lastMessage = useQuery(api.messages.getLastMessage, {
    chatId: chatId,
  });

  return (
    <Link
      href={`/dashboard/chat/${chatId}`}
      onClick={onMobileNavClose}
      className="group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${currentTheme.colors.border}20`,
        ':hover': {
          backgroundColor: currentTheme.colors.surface + '40',
          borderColor: currentTheme.colors.primary + '40'
        }
      }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
        }}
      />

      {/* Chat icon */}
      <div
        className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{
          backgroundColor: currentTheme.colors.surface + '60',
          border: `1px solid ${currentTheme.colors.border}40`
        }}
      >
        <MessageSquare
          className="w-4 h-4"
          style={{ color: currentTheme.colors.primary }}
        />
      </div>

      {/* Chat content */}
      <div className="relative z-10 flex-1 min-w-0">
        {lastMessage ? (
          <div className="space-y-1">
            <p
              className="text-sm font-medium truncate leading-tight"
              style={{ color: currentTheme.colors.text }}
            >
              {lastMessage.content}
            </p>
            <p
              className="text-xs opacity-70"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Recent message
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <p
              className="text-sm font-medium"
              style={{ color: currentTheme.colors.text }}
            >
              New Chat
            </p>
            <p
              className="text-xs opacity-70"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Start conversation
            </p>
          </div>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => onDelete(chatId, e)}
        className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1.5 rounded-lg hover:scale-110"
        style={{
          backgroundColor: 'transparent',
          ':hover': {
            backgroundColor: currentTheme.colors.error + '20'
          }
        }}
      >
        <Trash2
          className="h-4 w-4 transition-colors duration-200"
          style={{
            color: currentTheme.colors.textSecondary,
            ':hover': { color: currentTheme.colors.error }
          }}
        />
      </button>

      {/* Active indicator */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: currentTheme.colors.primary }}
      />
    </Link>
  );
}
