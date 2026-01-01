"use client";

import MDEditor from "@uiw/react-md-editor";

type RenderMode = "markdown" | "plain";

type Props = {
  content: string;
  mode?: RenderMode;
};

export default function MarkdownRender({ content, mode = "markdown" }: Props) {
  if (mode === "plain") {
    const plainText = stripMarkdown(content);

    return (
      <span className="text-neutral-700 whitespace-pre-line">{plainText}</span>
    );
  }

  // Markdown rendering
  return (
    <div data-color-mode="light" className="prose max-w-none">
      <MDEditor.Markdown source={content} />
    </div>
  );
}

/**
 * Simple & safe markdown stripper
 */
function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[#>*_~\-]+/g, "") // symbols
    .replace(/\n{3,}/g, "\n\n") // normalize newlines
    .trim();
}
