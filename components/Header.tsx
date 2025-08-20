"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from "react";
import NavigationContext from "@/lib/NavigationProvider";
import { Menu, Brain, Zap, Activity } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export default function Header() {
  const { setIsMobileNavOpen, isMobileNavOpen } = use(NavigationContext);
  const { currentTheme } = useTheme();

  return (
    <div
      className="relative border-b shadow-2xl"
      style={{
        background: `linear-gradient(to right, ${currentTheme.colors.surface}, ${currentTheme.colors.background}, ${currentTheme.colors.surface})`,
        borderColor: currentTheme.colors.border + "40"
      }}
    >
      {/* Animated background */}
      <div
        className="absolute inset-0 animate-pulse opacity-20"
        style={{
          background: `linear-gradient(to right, ${currentTheme.colors.primary}10, ${currentTheme.colors.secondary}10, ${currentTheme.colors.accent}10)`
        }}
      />

      {/* Scanning line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 animate-pulse"
        style={{
          background: `linear-gradient(to right, transparent, ${currentTheme.colors.primary}, transparent)`
        }}
      />

      <div className="relative h-16 container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 hover:bg-cyan-500/10 rounded-lg lg:hidden transition-all duration-300 group"
          >
            <Menu className="h-6 w-6 text-gray-300 group-hover:text-cyan-400" />
          </button>

          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="relative w-10 h-10 group-hover:scale-110 transition-all duration-500">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>

                {/* Middle ring */}
                <div className="absolute inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Inner core */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded-md flex items-center justify-center">
                  <Brain className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-lg font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  AI Agent
                </span>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ml-1">
                  Assistant
                </span>
              </h1>
              <div className="flex items-center space-x-1 -mt-1">
                <Activity className="w-2 h-2 text-green-400 animate-pulse" />
                <p className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 font-medium">
                  Online
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <SignedIn>
            {/* AI Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-cyan-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300 font-medium">AI Ready</span>
            </div>

            {/* User Button with custom styling */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm"></div>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-cyan-400/50 hover:border-cyan-400 transition-colors duration-300",
                    userButtonPopoverCard: "bg-gray-900 border border-cyan-500/20",
                    userButtonPopoverActionButton: "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 group">
              <Link href="/sign-in" className="flex items-center">
                <Zap className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Sign In
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
