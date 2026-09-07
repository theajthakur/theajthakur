"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  Search,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  User,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BoneyardSkeleton, DashboardBlogsSkeleton } from "@/components/common/Skeletons";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  message: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        toast.error("Failed to load messages");
      }
    } catch {
      toast.error("Error loading messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete message from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Error deleting message");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query) ||
      (msg.mobile && msg.mobile.includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Contact Inbox
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage queries and messages sent from your portfolio website contact form.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit text-sm py-1 px-3 rounded-full font-mono">
            Total Messages: {messages.length}
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search messages by name, email, mobile, or message content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rounded-xl border-border focus-visible:ring-primary/50"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Messages List */}
        <BoneyardSkeleton
          loading={isLoading}
          name="dashboard-messages"
          fallback={<DashboardBlogsSkeleton count={4} />}
        >
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "group flex flex-col md:flex-row justify-between gap-6 p-6 rounded-2xl border border-border/50 bg-card transition-all duration-200",
                    "hover:bg-accent/30 hover:shadow-md hover:border-primary/30"
                  )}
                >
                  <div className="flex-1 space-y-4">
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="font-heading font-bold text-lg text-foreground">
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-muted-foreground/60">•</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/60 px-2.5 py-1 rounded-full border border-border/30">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:underline hover:text-primary transition-colors"
                        >
                          {msg.email}
                        </a>
                        <button
                          onClick={() => copyToClipboard(msg.email)}
                          className="ml-1 text-muted-foreground hover:text-foreground p-0.5"
                          title="Copy Email"
                        >
                          {copiedEmail === msg.email ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      {msg.mobile && (
                        <>
                          <span className="text-muted-foreground/60">•</span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/60 px-2.5 py-1 rounded-full border border-border/30">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <a
                              href={`tel:${msg.mobile}`}
                              className="hover:underline hover:text-primary transition-colors"
                            >
                              {msg.mobile}
                            </a>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content Message */}
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed p-4 rounded-xl bg-muted/20 border border-border/30">
                      {msg.message}
                    </p>

                    {/* Date Footer */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>
                        Received on{" "}
                        {new Date(msg.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start justify-end md:border-l border-border/50 md:pl-4 pt-2 md:pt-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-muted"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(`mailto:${msg.email}`)}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Reply via Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(msg.id, msg.name)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Message</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-2xl border-dashed p-8">
                <div className="bg-muted/50 p-4 rounded-full">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium text-foreground">
                    No messages found
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery
                      ? `No messages matching "${searchQuery}"`
                      : "You haven't received any messages yet."}
                  </p>
                </div>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </BoneyardSkeleton>
      </div>
    </div>
  );
}
