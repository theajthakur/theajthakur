"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_BLOGS = [
  {
    id: 1,
    title: "The Future of Web Development",
    description:
      "Exploring the latest trends and technologies shaping the web in 2025. From AI-driven interfaces to WebAssembly.",
    tags: ["Trends", "Web Dev", "AI"],
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    date: "2025-01-10",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    description:
      "A comprehensive guide to building responsive and beautiful UIs with Tailwind CSS. Best practices and utility tips.",
    tags: ["CSS", "Tailwind", "Frontend"],
    thumbnail:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=60",
    date: "2025-02-14",
  },
  {
    id: 3,
    title: "Next.js 15: What's New?",
    description:
      "Breaking down the new features in Next.js 15. Server Actions, Partial Prerendering, and improved caching strategies.",
    tags: ["Next.js", "React", "JavaScript"],
    thumbnail:
      "https://images.unsplash.com/photo-1618477247222-ac5913054c90?w=800&auto=format&fit=crop&q=60",
    date: "2025-03-20",
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    description:
      "Techniques to make your React applications faster. Memoization, code splitting, and rendering optimizations.",
    tags: ["React", "Performance", "Coding"],
    thumbnail:
      "https://images.unsplash.com/photo-1550439062-609e15333758?w=800&auto=format&fit=crop&q=60",
    date: "2025-04-05",
  },
  {
    id: 5,
    title: "Understanding TypeScript Generics",
    description:
      "Demystifying generics in TypeScript. Learn how to write reusable and type-safe code with practical examples.",
    tags: ["TypeScript", "Programming", "Guide"],
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
    date: "2025-05-12",
  },
  {
    id: 6,
    title: "UI/UX Design Principles for Developers",
    description:
      "Essential design principles that every developer should know to build better user experiences.",
    tags: ["Design", "UI/UX", "Creativity"],
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
    date: "2025-06-30",
  },
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const uniqueTags = [
    "All",
    ...new Set(MOCK_BLOGS.flatMap((blog) => blog.tags)),
  ];

  const filteredBlogs = MOCK_BLOGS.filter((blog) => {
    const query = searchQuery.toLowerCase();
    const matchQuery =
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchTag = selectedTag === "All" || blog.tags.includes(selectedTag);

    return matchQuery && matchTag;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Our Latest Blogs
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Insights, tutorials, and updates from the world of web development.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-6 text-lg rounded-full border-2 border-primary/20 focus-visible:ring-primary/50 transition-all font-secondary"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {uniqueTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className={`cursor-pointer text-sm px-4 py-1 transition-all ${
                selectedTag === tag
                  ? "hover:bg-primary/90"
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="space-y-2 pb-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {blog.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground font-secondary border-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl font-heading text-card-foreground group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-primary">
                    {blog.date}
                  </CardDescription>
                </CardHeader>

                <CardContent className="grow">
                  <p className="text-muted-foreground line-clamp-3 font-primary">
                    {blog.description}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-secondary text-lg"
                  >
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blogs found matching "{searchQuery}"{" "}
                {selectedTag !== "All" && `with tag "${selectedTag}"`}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
