"use client";
import { Sparkles, Brain, Zap, MessageSquare, TrendingUp, Activity } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export default function DashboardPage() {
  const { currentTheme } = useTheme();

  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "Powered by cutting-edge machine learning",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant responses and real-time processing",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Natural Conversation",
      description: "Human-like interactions and understanding",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Adapts and improves with every interaction",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-4 md:py-8">
          <div className="relative mb-4 md:mb-6">
          {/* Animated icon */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
            <div
              className="absolute inset-0 rounded-2xl opacity-20 animate-pulse blur-sm"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
              }}
            />
            <div
              className="absolute inset-2 rounded-xl opacity-60"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
              }}
            />
            <div
              className="absolute inset-3 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: currentTheme.colors.background }}
            >
              <Sparkles
                className="h-6 w-6 md:h-8 md:w-8 animate-pulse"
                style={{ color: currentTheme.colors.primary }}
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${currentTheme.colors.text}, ${currentTheme.colors.textSecondary})`
            }}
          >
            Welcome to
          </span>
          <br />
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary}, ${currentTheme.colors.accent})`
            }}
          >
            AI Agent Assistant
          </span>
        </h1>

        <p
          className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Your intelligent companion for seamless conversations and advanced AI assistance.
          Start a new chat to experience the future of AI interaction.
        </p>

        {/* Status indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-8 px-4">
          <div
            className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full border"
            style={{
              backgroundColor: currentTheme.colors.surface + "50",
              borderColor: currentTheme.colors.success + "20"
            }}
          >
            <Activity
              className="w-4 h-4 animate-pulse"
              style={{ color: currentTheme.colors.success }}
            />
            <span
              className="text-sm"
              style={{ color: currentTheme.colors.text }}
            >
              AI Online
            </span>
          </div>
          <div
            className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full border"
            style={{
              backgroundColor: currentTheme.colors.surface + "50",
              borderColor: currentTheme.colors.primary + "20"
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.colors.primary }}
            />
            <span
              className="text-sm"
              style={{ color: currentTheme.colors.text }}
            >
              Ready to Chat
            </span>
          </div>
        </div>
      </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-4 md:p-6 backdrop-blur-xl rounded-2xl border transition-all duration-500 hover:transform hover:scale-105"
                style={{
                  backgroundColor: currentTheme.colors.surface + "80",
                  borderColor: currentTheme.colors.border + "40"
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                    }}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3
                    className="text-base md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:opacity-90"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed transition-colors duration-300"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="text-center px-4">
          <div
            className="max-w-2xl mx-auto p-6 md:p-8 backdrop-blur-xl rounded-3xl border"
            style={{
              backgroundColor: currentTheme.colors.surface + "40",
              borderColor: currentTheme.colors.primary + "20"
            }}
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: currentTheme.colors.text }}
            >
              Ready to get started?
            </h3>
            <p
              className="mb-6 leading-relaxed"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Click "New Chat" in the sidebar to begin your conversation with our advanced AI assistant.
            </p>
            <div
              className="flex items-center justify-center space-x-2"
              style={{ color: currentTheme.colors.primary }}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Start chatting now</span>
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: currentTheme.colors.primary }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
