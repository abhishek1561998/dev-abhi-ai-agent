"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";
import { Menu, X, Zap, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FuturisticHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Futuristic Logo */}
          <Link href="/" className="flex items-center space-x-4 group relative z-20">
            <div className="relative">
              {/* Main logo container with multiple layers */}
              <div className="relative w-12 h-12 group-hover:scale-110 transition-all duration-500">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>

                {/* Middle ring */}
                <div className="absolute inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Inner core */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded-md flex items-center justify-center">
                  {/* AI Symbol - Custom designed */}
                  <div className="relative">
                    {/* Central brain/AI icon */}
                    <Brain className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />

                    {/* Orbiting particles */}
                    <div className="absolute -inset-2">
                      <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-spin origin-bottom transform -translate-x-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-400 rounded-full animate-spin origin-top-left" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-1/2 left-0 w-1 h-1 bg-pink-400 rounded-full animate-spin origin-right transform -translate-y-1/2" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center z-20 group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                {/* Scanning line effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -skew-x-12 animate-pulse group-hover:animate-none"></div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              {/* Company name with enhanced typography */}
              <div className="relative">
                <h1 className="text-xl xl:text-2xl font-bold leading-tight">
                  {/* Main text with gradient */}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    Digital
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-red-400 transition-all duration-300">
                    ai
                  </span>
                  <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-red-400 group-hover:to-orange-400 transition-all duration-300">
                    india
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    .com
                  </span>
                </h1>

                {/* Tagline with typing effect */}
                <div className="flex items-center space-x-1 -mt-1">
                  <p className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 font-medium">
                    Future of AI
                  </p>
                  <div className="w-1 h-3 bg-cyan-400 animate-pulse"></div>
                </div>

                {/* Underline effect */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#solutions"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <SignedOut>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl="/dashboard"
                forceRedirectUrl="/dashboard"
              >
                <Button
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl="/dashboard"
                forceRedirectUrl="/dashboard"
              >
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 group">
                  Get Started
                  <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 group">
                  Dashboard
                  <Zap className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </Link>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 z-40">
            <nav className="flex flex-col space-y-4 p-6">
              <Link
                href="#features"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <SignedOut>
                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl="/dashboard"
                    forceRedirectUrl="/dashboard"
                  >
                    <Button
                      variant="outline"
                      className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 w-full"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl="/dashboard"
                    forceRedirectUrl="/dashboard"
                  >
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 w-full">
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 w-full">
                      Dashboard
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
