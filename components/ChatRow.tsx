import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import TimeAgo from "react-timeago";
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
  const lastMessage = useQuery(api.messages.getLastMessage, {
    chatId: chatId,
  });
  return (
    <Link
      href={`/dashboard/chat/${chatId}`}
      onClick={onMobileNavClose}
      className="group flex flex-col gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {lastMessage ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-medium"> {lastMessage.content}</span>
            <button
              onClick={(e) => onDelete(chatId, e)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              <TimeAgo date={lastMessage.createdAt} />
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-medium">New Chat</span>
          <button
            onClick={(e) => onDelete(chatId, e)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}
    </Link>
  );
}
