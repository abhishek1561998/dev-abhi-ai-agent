"use client";

import { use } from "react";
import { Plus, X,  } from "lucide-react";
import NavigationContext from "@/lib/NavigationProvider";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import ChatRow from "./ChatRow";
import { useTheme } from "@/lib/ThemeProvider";
import ThemeSelector from "./ThemeSelector";

export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = use(NavigationContext);
  const { currentTheme } = useTheme();

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
      <div
        className="hidden lg:flex w-72 border-r shadow-2xl flex-col relative h-screen"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.colors.surface}, ${currentTheme.colors.background})`,
          borderColor: currentTheme.colors.border + "40"
        }}
      >
        {/* Background effects */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colors.primary}10, ${currentTheme.colors.secondary}10, ${currentTheme.colors.accent}10)`
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${currentTheme.colors.primary}80, transparent)`
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-4">
          {/* New Chat Button */}
          <Button
            onClick={handleCreateChat}
            className="w-full flex items-center gap-3 cursor-pointer text-white border-0 shadow-lg group transition-all duration-300 py-3 mb-6"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              boxShadow: `0 4px 20px ${currentTheme.colors.primary}25`
            }}
          >
            <div className="relative">
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            <span className="font-medium">New Chat</span>
            <div
              className="ml-auto w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.colors.success }}
            />
          </Button>

          {/* Theme Selector */}
          <div className="mb-6">
            <ThemeSelector />
          </div>

          {/* Chat History Section */}
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <div className="flex items-center justify-between px-2">
              <h3
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                <div
                  className="w-1 h-4 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                  }}
                />
                Chat History
              </h3>
              <div
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  color: currentTheme.colors.textSecondary,
                  backgroundColor: currentTheme.colors.surface + "80"
                }}
              >
                {chats.length}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent pr-2"
                 style={{
                   scrollbarColor: `${currentTheme.colors.border} transparent`
                 }}>
              {chats.length === 0 ? (
                <div className="text-center py-8" style={{ color: currentTheme.colors.textSecondary }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: currentTheme.colors.surface + "80" }}
                  >
                    <Plus className="w-6 h-6" style={{ color: currentTheme.colors.textSecondary }} />
                  </div>
                  <p className="text-sm">No chats yet</p>
                  <p className="text-xs mt-1 opacity-70">Start a new conversation</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <ChatRow
                      key={chat._id}
                      chatId={chat._id}
                      title={chat.title}
                      onDelete={handleDeleteChat}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 backdrop-blur-sm transition-opacity"
            style={{ backgroundColor: currentTheme.colors.background + "80" }}
            onClick={closeMobileNav}
          />
          <div
            className="relative w-72 shadow-2xl flex flex-col border-r h-full"
            style={{
              background: `linear-gradient(to bottom, ${currentTheme.colors.surface}, ${currentTheme.colors.background})`,
              borderColor: currentTheme.colors.border + "40"
            }}
          >
            {/* Background effects */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}10, ${currentTheme.colors.secondary}10, ${currentTheme.colors.accent}10)`
              }}
            />

            <div
              className="relative z-10 p-4 border-b flex justify-between items-center"
              style={{ borderColor: currentTheme.colors.border + "40" }}
            >
              <h2
                className="font-semibold text-xl flex items-center gap-2"
                style={{ color: currentTheme.colors.text }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                />
                AI Menu
              </h2>
              <button
                onClick={closeMobileNav}
                className="p-2 rounded-lg transition-all duration-300 group"
                style={{
                  backgroundColor: 'transparent'
                }}
              >
                <X
                  className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ color: currentTheme.colors.textSecondary }}
                />
              </button>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col">
              <Button
                onClick={handleCreateChat}
                className="w-full flex items-center gap-3 mb-6 text-white border-0 shadow-lg group transition-all duration-300 py-3"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  boxShadow: `0 4px 20px ${currentTheme.colors.primary}25`
                }}
              >
                <div className="relative">
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <span className="font-medium">New Chat</span>
                <div
                  className="ml-auto w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentTheme.colors.success }}
                />
              </Button>

              {/* Theme Selector */}
              <div className="mb-6">
                <ThemeSelector />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between px-2">
                  <h3
                    className="text-sm font-medium flex items-center gap-2"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <div
                      className="w-1 h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to bottom, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                      }}
                    />
                    Chat History
                  </h3>
                  <div
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      color: currentTheme.colors.textSecondary,
                      backgroundColor: currentTheme.colors.surface + "80"
                    }}
                  >
                    {chats.length}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {chats.length === 0 ? (
                    <div className="text-center py-8" style={{ color: currentTheme.colors.textSecondary }}>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: currentTheme.colors.surface + "80" }}
                      >
                        <Plus className="w-6 h-6" style={{ color: currentTheme.colors.textSecondary }} />
                      </div>
                      <p className="text-sm">No chats yet</p>
                      <p className="text-xs mt-1 opacity-70">Start a new conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
