"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from "react";
import NavigationContext from "@/lib/NavigationProvider";
import { Menu } from "lucide-react";

export default function Header() {
  const { setIsMobileNavOpen, isMobileNavOpen } = use(NavigationContext);

  console.log(isMobileNavOpen);
  return (
    <div className="border-b bg-white shadow-sm">
      <div className="h-16 container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center">
            <h1 className="p-4 font-bold text-2 bg-gradient-to-r from-black via-teal-600 to-teal-400 bg-clip-text text-transparent">
              AI Agent Assistant
            </h1>
          </Link>
        </div>

        <div className="flex gap-4 items-center p-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
