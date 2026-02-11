import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Work and ongoing projects",
};

// ============================================================================
// CONTENT: Project Data
// ============================================================================
// Edit this section to showcase your projects. Each project should highlight
// your technical skills, problem-solving abilities, and real-world impact.

/**
 * TypeScript interface defining the structure of a project entry.
 * All fields are required to maintain consistent formatting.
 */
interface Project {
  /**
   * Project name (keep it concise, 2-6 words)
   * Example: "E-commerce Analytics Dashboard"
   */
  title: string;

  /**
   * Brief description of the project (aim for 1-2 sentences, ~100-150 characters)
   * Should include:
   * - What the project does
   * - Key technologies used
   * - Your role or contribution
   * - Any notable outcomes or metrics
   *
   * Example: "Built a real-time analytics dashboard using React and Firebase.
   * Improved user engagement by 40% through data-driven insights."
   */
  description: string;

  /**
   * Current status of the project
   * Options: "Completed", "In progress", "Maintained", "Archived"
   */
  status: "Completed" | "In progress" | "Maintained" | "Archived";

  /**
   * Link to the project (GitHub repo, live demo, or case study)
   * - Use "#" for projects without public links
   * - GitHub repos: "https://github.com/username/repo"
   * - Live demos: "https://example.com"
   * - Make sure links are accessible (not behind auth)
   */
  href: string;

  /**
   * Optional: Technology tags to highlight your tech stack
   * Example: ["React", "TypeScript", "Node.js", "PostgreSQL"]
   */
  technologies?: string[];
}

/**
 * ============================================================================
 * PROJECT LIST
 * ============================================================================
 * Add your projects here. The examples below show the expected format.
 * Keep projects ordered by importance or recency (most impressive first).
 *
 * Tips for writing great project descriptions:
 * - Focus on impact and outcomes, not just features
 * - Mention specific technologies when relevant
 * - Quantify results when possible (e.g., "reduced load time by 50%")
 * - Be honest about your role (solo project vs. team contribution)
 * - Link to live demos or repos whenever possible
 *
 * To add a new project:
 * 1. Copy one of the example objects below
 * 2. Fill in your project details
 * 3. Make sure to include a working href or use "#" as placeholder
 * 4. Remove or replace the EXAMPLE projects when you're ready
 */
const PROJECTS: Project[] = [
  // EXAMPLE 1: Full-stack application
  {
    title: "Project one",
    description:
      "Short description of what it does, tech stack, and your role. Link to live demo or repo if public.",
    status: "Completed",
    href: "#",
    technologies: ["React", "TypeScript", "Node.js"], // Optional: add technologies
  },

  // EXAMPLE 2: Work in progress
  {
    title: "Project two",
    description:
      "Another project — ongoing or in progress. Mention key outcomes or learnings.",
    status: "In progress",
    href: "#",
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"], // Optional
  },

  // EXAMPLE 3: Side project or contribution
  {
    title: "Project three",
    description:
      "Optional third entry. Keep descriptions concise and scannable.",
    status: "Completed",
    href: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-foreground-muted">
          A selection of my work and ongoing projects.
        </p>
        <ul className="mt-12 space-y-8">
          {PROJECTS.map((project, index) => (
            <li key={index}>
              <article className="rounded-xl border border-white/10 bg-background-section p-6 transition-colors hover:border-accent/30">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h2>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-foreground-muted">
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 text-foreground-muted">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.href && project.href !== "#" && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    View project →
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
