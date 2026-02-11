"use client";

import { clearStoredToken, type AuthGate } from "@/lib/auth";

// ============================================================================
// CONTENT: Personal Area - Blog Posts
// ============================================================================
// This section is for personal content shared with friends and family only.
// Write about your thoughts, experiences, learnings, or anything personal.

/**
 * TypeScript interface for blog post structure
 */
interface BlogPost {
  /**
   * Post title (keep it short and descriptive)
   */
  title: string;

  /**
   * Publication date (format: "YYYY-MM-DD" or "Month DD, YYYY")
   * Example: "2025-02-11" or "February 11, 2025"
   */
  date: string;

  /**
   * Main content of the post (can include line breaks with \n)
   * You can write in paragraphs separated by \n\n for spacing
   *
   * Tips:
   * - Be authentic and personal
   * - Share insights, experiences, or reflections
   * - No length limit - write as much or as little as you want
   * - Consider adding links to external content if relevant
   */
  content: string;

  /**
   * Optional: Tags or categories for organizing posts
   * Example: ["reflection", "learning", "travel"]
   */
  tags?: string[];
}

/**
 * ============================================================================
 * BLOG POSTS
 * ============================================================================
 * Add your personal blog posts here. Since this area is password-protected,
 * you can share more personal thoughts, reflections, and experiences.
 *
 * Content ideas:
 * - Personal reflections and life updates
 * - Learning experiences and insights
 * - Travel stories or adventures
 * - Book/movie/music recommendations
 * - Technical deep-dives on interesting problems
 * - Creative writing or poetry
 * - Photos and memories (describe or link to them)
 *
 * To add a new post:
 * 1. Copy the example structure below
 * 2. Fill in title, date, and content
 * 3. Add to the beginning of the array (newest first)
 * 4. Optional: Add tags to categorize your posts
 */
const BLOG_POSTS: BlogPost[] = [
  // EXAMPLE POST 1: Recent reflection
  // {
  //   title: "Learning to embrace uncertainty",
  //   date: "February 11, 2025",
  //   content: "I've been thinking a lot about how uncertainty has shaped my journey...\n\nWhat I've learned is that...",
  //   tags: ["reflection", "growth"],
  // },

  // EXAMPLE POST 2: Experience sharing
  // {
  //   title: "My first hackathon experience",
  //   date: "January 15, 2025",
  //   content: "Last weekend I participated in my first hackathon. Here's what happened...",
  //   tags: ["experience", "coding"],
  // },

  // TODO: Add your blog posts here
];

/**
 * ============================================================================
 * WELCOME MESSAGE
 * ============================================================================
 * A personal welcome message for visitors to this private area.
 */
const WELCOME_MESSAGE = "Welcome to my personal space! This is where I share thoughts, experiences, and reflections with friends and family.";

type PersonalContentProps = {
  gate: AuthGate;
  onLogout: () => void;
};

export function PersonalContent({ gate, onLogout }: PersonalContentProps) {
  function handleLogout() {
    clearStoredToken(gate);
    onLogout();
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Personal
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Log out
          </button>
        </div>
        <p className="mt-4 text-foreground-muted">
          {WELCOME_MESSAGE}
        </p>

        {/* Blog Posts */}
        <div className="mt-12 space-y-8">
          {BLOG_POSTS.length > 0 ? (
            BLOG_POSTS.map((post, index) => (
              <article
                key={index}
                className="rounded-xl border border-white/10 bg-background-section p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
                  <time className="text-sm text-foreground-muted">{post.date}</time>
                </div>

                {/* Post Content */}
                <div className="mt-4 space-y-3">
                  {post.content.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-foreground-muted whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-white/10 bg-background-section p-8">
              <h2 className="text-xl font-semibold text-foreground">Blog & thoughts</h2>
              <p className="mt-4 text-foreground-muted">
                No blog posts yet. Add your first post to the BLOG_POSTS array at the top of this file.
              </p>
              <div className="mt-6 rounded-lg bg-white/5 p-4">
                <p className="text-sm text-foreground-muted">
                  <strong>To add a blog post:</strong>
                </p>
                <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-foreground-muted">
                  <li>Open: <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">components/PersonalContent.tsx</code></li>
                  <li>Find the BLOG_POSTS array</li>
                  <li>Copy the example structure and fill in your content</li>
                  <li>Save the file and refresh</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
