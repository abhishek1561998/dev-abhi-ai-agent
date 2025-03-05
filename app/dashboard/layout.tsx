"use client";
import { Authenticated } from "convex/react";
import Header from "../../components/Header";
import { NavigationProvider } from "@/lib/NavigationProvider";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="min-h-screen flex">
        <Authenticated>
          <Sidebar />
        </Authenticated>
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {children}
          </main>
        </div>
      </div>
    </NavigationProvider>
  );
}
