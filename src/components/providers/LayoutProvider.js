"use client";
import React from "react";
import Navbar from "../common/Navbar/Navbar";
import { Toaster } from "sonner";
import Footer from "../common/Navbar/Footer";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard") || pathname === "/login") {
    return (
      <SessionProvider>
        <div>{children}</div>
        <Toaster
          position="bottom-right"
          richColors
          expand
          icons={{
            success: <CheckCircle className="text-green-500" />,
            error: <XCircle className="text-red-500" />,
            info: <Info className="text-blue-500" />,
            warning: <AlertTriangle className="text-yellow-500" />,
          }}
          toastOptions={{
            classNames: {
              toast:
                "rounded-xl border shadow-lg bg-background text-foreground",
              title: "text-sm font-semibold",
              description: "text-xs text-muted-foreground",
              success: "border-green-500/30 bg-green-500/10",
              error: "border-red-500/30 bg-red-500/10",
              info: "border-blue-500/30 bg-blue-500/10",
              warning: "border-yellow-500/30 bg-yellow-500/10",
              actionButton: "bg-primary text-primary-foreground",
              cancelButton: "bg-muted text-muted-foreground",
              icon: "pr-6",
            },
          }}
        />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <div className="body-container px-4 xl:px-40">
        <div className="navbar sticky top-0 bg-background z-50">
          <Navbar />
        </div>
        <div className="main-body">{children}</div>
        <Footer />
        <Toaster
          position="bottom-right"
          richColors
          expand
          icons={{
            success: <CheckCircle className="text-green-500" />,
            error: <XCircle className="text-red-500" />,
            info: <Info className="text-blue-500" />,
            warning: <AlertTriangle className="text-yellow-500" />,
          }}
          toastOptions={{
            classNames: {
              toast:
                "rounded-xl border shadow-lg bg-background text-foreground",
              title: "text-sm font-semibold",
              description: "text-xs text-muted-foreground",
              success: "border-green-500/30 bg-green-500/10",
              error: "border-red-500/30 bg-red-500/10",
              info: "border-blue-500/30 bg-blue-500/10",
              warning: "border-yellow-500/30 bg-yellow-500/10",
              actionButton: "bg-primary text-primary-foreground",
              cancelButton: "bg-muted text-muted-foreground",
              icon: "pr-6",
            },
          }}
        />
      </div>
    </SessionProvider>
  );
}
