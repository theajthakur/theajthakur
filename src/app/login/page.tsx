"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft, LayoutDashboard, FolderKanban, FileText, BarChart2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { toast.error(error.message || "Invalid credentials"); return; }
      if (data?.user) {
        toast.success("Welcome back!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">

      {/* ── Left: Login form ── */}
      <div className="flex flex-1 lg:max-w-[420px] xl:max-w-[480px] flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 bg-background relative z-10">

        {/* Brand mark */}
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-sm tracking-widest uppercase text-foreground">
              Dashboard
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-heading tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in…</> : "Sign In"}
          </Button>
        </form>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to site
          </Link>
        </div>
      </div>

      {/* ── Right: Decorative panel (hidden on mobile) ── */}
      {/*
        Key: the outer div is just a flex container with overflow-hidden.
        Layer 1 (bg div) — has clip-path creating the diagonal edge. No children affected.
        Layer 2 (content div) — sibling of bg div, NOT subject to any clip-path.
      */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">

        {/* Layer 1: Diagonal primary background ONLY — clip-path stays here, away from content */}
        <div
          className="absolute inset-0 bg-primary"
          style={{ clipPath: "polygon(72px 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          {/* Noise — inside bg div so it only renders over primary area */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
          {/* Glow blobs */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Layer 2: Content — sibling of bg div, zero clip-path interference */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div />

          <div className="space-y-4">
            <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-6">
              What you can manage
            </p>
            {[
              { icon: FolderKanban, label: "Projects",  desc: "Showcase & manage your portfolio" },
              { icon: FileText,     label: "Blog Posts", desc: "Write and publish articles" },
              { icon: BarChart2,    label: "Analytics",  desc: "Track visitor insights" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">{label}</p>
                  <p className="text-white/60 text-xs mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Separator className="bg-white/10 mb-4" />
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Vijay Thakur · Admin Portal
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
