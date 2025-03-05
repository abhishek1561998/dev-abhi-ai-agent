"use client";

import { use } from "react";
import Link from "next/link";
import { Plus, X, Trash2 } from "lucide-react";
import NavigationContext from "@/lib/NavigationProvider";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import ChatRow from "./ChatRow";
import TimeAgo from "react-timeago";

export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = use(NavigationContext);

  const chats = useQuery(api.chats.list) || [];
  const createChat = useMutation(api.chats.create);
  const deleteChat = useMutation(api.chats.deleteChat);

  const handleCreateChat = async () => {
    try {
      const chatId = await createChat({
        title: "New Chat",
      });
      router.push(`/dashboard/chat/${chatId}`);
      closeMobileNav();
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    try {
      e.preventDefault();
      await deleteChat({ chatId: chatId as Id<"chats"> });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r p-4 shadow-sm flex-col gap-4">
        <Button
          onClick={handleCreateChat}
          className="w-full flex items-center gap-2 cursor-pointer bg-gradient-to-r from-black via-teal-600 to-teal-400 hover:from-gray-500 hover:to-teal-400"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </Button>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500 px-2">
            Previous Chats
          </h3>
          {chats.map((chat) => (
            <ChatRow
              key={chat._id}
              chatId={chat._id}
              title={chat.title}
              onDelete={handleDeleteChat}
            />
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobileNav}
          />
          <div className="relative w-64 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold text-xl">Menu</h2>
              <button
                onClick={closeMobileNav}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Button
                onClick={handleCreateChat}
                className="w-full flex items-center gap-2 mb-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400"
              >
                <Plus className="h-5 w-5" />
                New Chat
              </Button>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-500 px-2">
                  Previous Chats
                </h3>
                {chats?.map((chat) => (
                  <ChatRow
                    key={chat._id}
                    chatId={chat._id}
                    title={chat.title}
                    onDelete={handleDeleteChat}
                    onMobileNavClose={closeMobileNav}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
