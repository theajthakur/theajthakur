export const blogsData = [{
    title: "Building a Modern AI Shopping Agent",
    description:
        "A practical look at building an AI-powered shopping experience with intelligent product discovery and recommendations.",
    createdAt: "2026-09-07",
    slug: "building-modern-ai-shopping-agent",

    content: `# Building a Modern AI Shopping Agent

An AI shopping agent can transform a traditional product search experience into something more conversational and intelligent.

Instead of asking users to manually browse categories, filters, and dozens of product pages, the agent can understand *what they actually want* and help them find it.

> The goal isn't to replace the shopping experience — it's to make the experience feel effortless.

---

## What We're Building

Our AI shopping agent combines:

- Natural language understanding
- Product search
- Product recommendations
- Intelligent filtering
- Price comparison
- Conversational interactions
- Checkout assistance

![AI Shopping Agent Architecture](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop)

---

## Demo

**User:**

> I need wireless headphones under ₹10,000 with good noise cancellation for working in a noisy office.

**AI Agent:**

> I found 8 headphones that match your requirements. The Sony WH-1000XM5 and Bose QuietComfort are the strongest options for noise cancellation.

### Product Comparison

| Product | Price | Noise Cancellation | Rating |
|---|---:|---|---:|
| Sony WH-1000XM5 | ₹29,990 | ⭐⭐⭐⭐⭐ | 4.6 |
| Bose QuietComfort | ₹24,900 | ⭐⭐⭐⭐⭐ | 4.5 |
| Soundcore Space Q45 | ₹9,999 | ⭐⭐⭐⭐ | 4.4 |
| JBL Live 770NC | ₹7,999 | ⭐⭐⭐⭐ | 4.3 |

---

## How It Works

The agent follows a simple pipeline:

\`\`\`text
User Query
    ↓
Intent Detection
    ↓
Requirement Extraction
    ↓
Product Search
    ↓
Ranking & Filtering
    ↓
Recommendation
    ↓
User Feedback
    ↓
Refined Results
\`\`\`

The system doesn't treat every query as a simple keyword search.

For example:

\`\`\`text
"Something good for working in a noisy office"
\`\`\`

can be transformed into structured requirements:

\`\`\`json
{
  "category": "headphones",
  "use_case": "office",
  "noise_cancellation": true,
  "budget": {
    "currency": "INR",
    "maximum": 10000
  }
}
\`\`\`

---

## Tech Stack

The frontend is built with **Next.js** and **React**.

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- PostgreSQL
- Redis

### Installation

\`\`\`bash
npm install react react-dom next
npm install openai
npm install zod
\`\`\`

Then create your environment variables:

\`\`\`env
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://localhost/shopagent
\`\`\`

> Never expose your API key in client-side code.

---

## Example API Route

A simplified Next.js API route might look like this:

\`\`\`ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await openai.responses.create({
    model: "gpt-5",
    input: message,
  });

  return NextResponse.json({
    response: response.output_text,
  });
}
\`\`\`

The client can then send a request:

\`\`\`ts
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Find me wireless headphones under ₹10,000.",
  }),
});

const data = await response.json();

console.log(data.response);
\`\`\`

---

## Product Search

The search layer is responsible for finding candidate products.

\`\`\`ts
type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  categories: string[];
};

function filterProducts(
  products: Product[],
  maxPrice: number
) {
  return products.filter(
    (product) => product.price <= maxPrice
  );
}
\`\`\`

For larger catalogs, semantic search can be used instead of relying entirely on keyword matching.

\`\`\`python
def search_products(query, products):
    embedding = create_embedding(query)

    results = vector_database.search(
        embedding=embedding,
        limit=10
    )

    return results
\`\`\`

---

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

You can also visit the [ShopAgent project](https://example.com/shopagent).

---

## Video

### Product Walkthrough

<video controls width="100%">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## YouTube Video

https://www.youtube.com/watch?v=dQw4w9WgXcQ

---

## Image With Link

[![Shopping Agent](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop)](https://example.com)

---

## Lists

### Unordered List

- Product discovery
- Product comparison
  - Price
  - Rating
  - Availability
- Personalized recommendations

### Ordered List

1. Understand the user query
2. Extract requirements
3. Search the catalog
4. Rank products
5. Present recommendations

### Task List

- [x] Build product search
- [x] Add conversational interface
- [x] Add product filtering
- [ ] Add personalized recommendations
- [ ] Add checkout automation

---

## Blockquotes

> Good recommendations aren't about showing users more products.
>
> They're about helping users make better decisions with less effort.

Nested quote:

> The agent recommended three products.
>
> > The first option was selected because of its battery life.
>
> The user then refined the requirements.

---

## Formatting

This is **bold text**, this is *italic text*, and this is ***bold italic text***.

You can also use ~~strikethrough~~ text.

Here is some \`inline code\`.

You can combine **bold text with \`inline code\`**.

---

## Keyboard Shortcuts

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.

On macOS:

<kbd>⌘</kbd> + <kbd>K</kbd>

---

## Mathematical Content

The recommendation score can be represented as:

$$
Score = w_1R + w_2P + w_3C + w_4S
$$

Where:

- \`R\` = rating
- \`P\` = price relevance
- \`C\` = category relevance
- \`S\` = semantic similarity

---

## Long Code Example

\`\`\`tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ShoppingAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    if (!message.trim()) return;

    const result = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await result.json();

    setResponse(data.response);
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        ShopAgent
      </h1>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="What are you looking for?"
        className="min-h-32 w-full rounded-lg border p-4"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
      >
        Ask ShopAgent
      </button>

      {response && (
        <article className="prose mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {response}
          </ReactMarkdown>
        </article>
      )}
    </main>
  );
}
\`\`\`

---

## Edge Cases

Let's test some unusual Markdown content.

### Emoji

🛒 🛍️ 🤖 ✨ 🚀 💳

### Special Characters

\`<div>\` \`</div>\` \`{}\` \`[]\` \`()\` \`=>\` \`&&\` \`||\`

### URL

https://example.com/products?category=headphones&sort=price

### Email

hello@example.com

### Escaped Characters

\\*This should not be italic\\*

\\# This should not be a heading

---

## Conclusion

Building an AI shopping agent requires more than connecting a language model to a product database.

The real value comes from combining:

1. *Understanding*
2. *Search*
3. *Ranking*
4. *Context*
5. *Personalization*
6. *A great user interface*

When these pieces work together, shopping becomes less about navigating a catalog and more about having a conversation.

> *The best shopping interface is the one that helps you find what you want before you know exactly how to search for it.*

---

**Built with Next.js, React, TypeScript, and AI.**

[← Back to ShopAgent](https://example.com/shopagent)
`,
}]