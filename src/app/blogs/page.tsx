import { redirect } from "next/navigation";

export default function BlogsPage() {
    const posts = [
        {
            title: "Building a Modern AI Shopping Agent",
            description:
                "A practical look at building an AI-powered shopping experience with intelligent product discovery and recommendations.",
            createdAt: "2026-09-07",
            slug: "building-modern-ai-shopping-agent",
        },
        {
            title: "Designing Better Developer Experiences",
            description:
                "Exploring simple principles for creating fast, intuitive, and enjoyable tools for developers.",
            createdAt: "2026-09-03",
            slug: "designing-better-developer-experiences",
        },
        {
            title: "Why Simplicity Matters in UI Design",
            description:
                "How reducing visual noise and focusing on hierarchy can make interfaces easier to understand and use.",
            createdAt: "2026-08-28",
            slug: "why-simplicity-matters-in-ui-design",
        },
        {
            title: "Getting Started with Next.js",
            description:
                "A concise guide to building modern web applications with Next.js, React, and TypeScript.",
            createdAt: "2026-08-21",
            slug: "getting-started-with-nextjs",
        },
        {
            title: "Building Scalable APIs",
            description:
                "Key considerations for designing reliable, maintainable, and scalable backend APIs.",
            createdAt: "2026-08-15",
            slug: "building-scalable-apis",
        },
        {
            title: "My Approach to Full-Stack Development",
            description:
                "A breakdown of the tools, architecture, and development practices I use when building full-stack applications.",
            createdAt: "2026-08-08",
            slug: "my-approach-to-full-stack-development",
        },
    ];
    return <h1>Test</h1>
}
