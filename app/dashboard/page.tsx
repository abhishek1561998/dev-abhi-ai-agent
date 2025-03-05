import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div className="text-center py-8">
        <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to AI Chat
        </h2>
        <p className="text-gray-600">
          Start a conversation with your AI assistant
        </p>
      </div>
    </div>
  );
}
