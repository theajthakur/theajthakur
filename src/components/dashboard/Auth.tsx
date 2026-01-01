"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Using ShadCN input here actually, wait, the import was @/components/ui/input.
// Previously: import { Input } from "@/components/ui/input";
// The user has `src/components/ui/Input.js` (custom) AND `src/components/ui/input.jsx` (ShadCN).
// The user's code in Auth.js imported from "@/components/ui/input", which typically resolves to `input.jsx` (shadcn) if lowercase, OR failing that, maybe case insensitive?
// Actually, `Input.js` (Uppercased) exists. `input.jsx` (lowercased) exists.
// Code usage: <Input id="email" ... className="bg-background/50" />
// In Auth.js line 13: `import { Input } from "@/components/ui/input";`
// This likely refers to the ShadCN one (lowercase).
// I renamed ALL `*.jsx` to `*.tsx`. So `src/components/ui/input.tsx` (ShadCN) exists.
// I also renamed `Input.js` to `Input.tsx`.
// So we have `Input.tsx` (custom) and `input.tsx` (shadcn).
// I should check `Auth.tsx` imports again carefully. It imports from `@/components/ui/input`.
// This usually implies ShadCN input.
// Let's ensure types are correct for ShadCN input too. I haven't updated ShadCN `input.tsx` yet, I just renamed it.

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Similarly, ShadCN button.
import { Loader2 } from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { toast } from "sonner";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Login successful");
        // Force a hard reload to ensure the session cookie is recognized by the middleware/server
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundLines className="flex items-center justify-center min-h-screen w-full px-4">
      <Card className="w-full max-w-md mx-auto z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-primary/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Access
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground/80">
            Secure authentication required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            <Button
              className="w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                "Grant Access"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </BackgroundLines>
  );
}
