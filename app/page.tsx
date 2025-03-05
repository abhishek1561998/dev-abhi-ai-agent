import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Fast",
      description: "Quick responses and efficient task handling.",
      icon: "⚡️",
    },
    {
      title: "Modern",
      description: "Utilizes the latest AI technologies.",
      icon: "🤖",
    },
    {
      title: "Smart",
      description: "Adapts to your preferences and improves over time.",
      icon: "🧠",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-700"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

      {/* Main content */}
      <div className="relative flex items-center justify-center h-full z-10">
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-white/20 hover:border-white/30 transition-all duration-300">
          <h1 className="text-5xl text-center font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black via-teal-600 to-teal-400 tracking-tight">
            AI Agent Assistant
          </h1>
          <p className="text-xl text-center text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            Your intelligent companion for seamless task automation and enhanced
            productivity
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <SignedOut>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl="/dashboard"
                forceRedirectUrl="/dashboard"
              >
                <Button
                  size="lg"
                  className="group relative px-6 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 border-0 shadow-lg hover:shadow-blue-500/25"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignInButton>
            </SignedOut>

            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer bg-gradient-to-r from-gray via-teal-500 to-teal-600 group relative px-6 py-2 text-base font-medium backdrop-blur"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="text-center grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index}>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
