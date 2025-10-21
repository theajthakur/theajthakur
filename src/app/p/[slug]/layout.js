import React from "react";
import Link from "next/link";
import { ChevronRight, HomeIcon } from "lucide-react";

export default async function Layout({ children, params }) {
  const { slug } = await params;
  const baseUrl = "https://dev.vijstack.com/";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        item: `${baseUrl}p/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="p-4 text-sm text-muted-foreground"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              <HomeIcon />
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight />
            <span className="text-foreground font-medium">
              {slug.toUpperCase()}
            </span>
          </li>
        </ol>
      </nav>

      <main className="page-container">{children}</main>
    </div>
  );
}
