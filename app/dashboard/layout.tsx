"use client";
import { Authenticated } from "convex/react";
import Header from "../../components/Header";
import { NavigationProvider } from "@/lib/NavigationProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <DashboardContent>{children}</DashboardContent>
      </NavigationProvider>
    </ThemeProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-screen flex relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[size:30px_30px]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-primary) 1px, transparent 1px)`
          }}
        />
      </div>

      <Authenticated>
        <Sidebar />
      </Authenticated>
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Header />
        <main
          className="flex-1 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--color-background)95, var(--color-surface)20)`
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
