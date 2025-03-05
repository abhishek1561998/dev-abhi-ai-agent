import ChatInterface from "@/components/ChatInterface";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getConvexClient } from "@/lib/convex";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChatPageProps {
  params: Promise<{
    chatId: Id<"chats">;
  }>;
}

async function chatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  // Get user authantication
  const user = await auth();

  if (!user) {
    redirect("/");
  }

  try {
    const convex = getConvexClient();
    const initalMessages = await convex.query(api.messages.list, { chatId });
    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initalMessages={initalMessages} />
      </div>
    );
  } catch (error) {
    console.error("Error loading chat", error);
    redirect("/dashboard");
  }
}

export default chatPage;
