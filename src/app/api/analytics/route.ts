import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch posts, projects, and messages in parallel
    const [
      { data: posts, error: postsErr },
      { data: projects, error: projectsErr },
      { data: messages, error: messagesErr },
    ] = await Promise.all([
      supabase.from("posts").select("id, title, slug, created_at").order("created_at", { ascending: false }),
      supabase.from("projects").select("id, name, slug, featured, created_at").order("created_at", { ascending: false }),
      supabase.from("messages").select("id, name, email, message, created_at").order("created_at", { ascending: false }),
    ]);

    if (postsErr) console.error("Analytics fetch posts error:", postsErr);
    if (projectsErr) console.error("Analytics fetch projects error:", projectsErr);
    if (messagesErr) console.error("Analytics fetch messages error:", messagesErr);

    const safePosts = posts || [];
    const safeProjects = projects || [];
    const safeMessages = messages || [];

    // Calculate stat metrics
    const blogsCount = safePosts.length;
    const projectsCount = safeProjects.length;
    const featuredProjectsCount = safeProjects.filter((p) => p.featured).length;
    const messagesCount = safeMessages.length;
    const timelinesCount = 5; // Default timeline milestones count

    // Aggregate monthly activity for current year
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    const monthlyCounts = Array(12).fill(0);

    const processItem = (createdAtStr: string) => {
      if (!createdAtStr) return;
      const date = new Date(createdAtStr);
      if (date.getFullYear() === currentYear) {
        monthlyCounts[date.getMonth()] += 1;
      }
    };

    safePosts.forEach((p) => processItem(p.created_at));
    safeProjects.forEach((p) => processItem(p.created_at));
    safeMessages.forEach((m) => processItem(m.created_at));

    const chartData = months.map((monthName, idx) => ({
      name: monthName,
      total: monthlyCounts[idx],
    }));

    // Generate recent activity feed combining latest posts, projects, and messages
    const recentPosts = safePosts.slice(0, 3).map((p) => ({
      id: `post-${p.id}`,
      type: "Blog",
      title: p.title,
      subtitle: `/blogs/${p.slug}`,
      created_at: p.created_at,
    }));

    const recentProjects = safeProjects.slice(0, 3).map((p) => ({
      id: `project-${p.id}`,
      type: "Project",
      title: p.name,
      subtitle: `/p/${p.slug}`,
      created_at: p.created_at,
    }));

    const recentMessagesList = safeMessages.slice(0, 3).map((m) => ({
      id: `msg-${m.id}`,
      type: "Message",
      title: `Message from ${m.name}`,
      subtitle: m.email,
      created_at: m.created_at,
    }));

    const recentActivity = [...recentPosts, ...recentProjects, ...recentMessagesList]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);

    return NextResponse.json({
      stats: {
        blogsCount,
        projectsCount,
        featuredProjectsCount,
        messagesCount,
        timelinesCount,
      },
      chartData,
      recentActivity,
    });
  } catch (error: any) {
    console.error("Exception in GET /api/analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
