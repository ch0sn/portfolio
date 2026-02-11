import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "Background, skills, and professional profile",
};

// ============================================================================
// CONTENT: About Page Information
// ============================================================================
// Edit this section to personalize your About page with your background,
// skills, and professional links.

/**
 * ============================================================================
 * PROFESSIONAL LINKS
 * ============================================================================
 * Add your professional and social media links here.
 * These will be displayed prominently on your About page.
 *
 * Recommended links:
 * - GitHub: Your code portfolio and open-source contributions
 * - LinkedIn: Professional network and experience
 * - Email: Professional contact email
 * - Personal Website: If you have one
 * - Twitter/X: Optional, if you're active in tech communities
 * - Stack Overflow: If you contribute to discussions
 *
 * Format: { label: "Platform Name", href: "https://..." }
 */
const PROFESSIONAL_LINKS: Array<{ label: string; href: string }> = [
  // TODO: Uncomment and fill in your links
  // { label: "GitHub", href: "https://github.com/yourusername" },
  // { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
  // { label: "Email", href: "mailto:your.email@example.com" },
  // { label: "Portfolio", href: "https://yourwebsite.com" },
];

/**
 * ============================================================================
 * BIO / BACKGROUND
 * ============================================================================
 * Your personal and professional story (2-4 paragraphs recommended).
 *
 * Content tips:
 * - Start with a hook: What makes you unique?
 * - Include your background: Where you're from, education, journey into tech
 * - Highlight key experiences: Studies, projects, interests
 * - Show personality: What drives you? What are you passionate about?
 * - Keep it authentic and conversational
 *
 * Length: Aim for 300-500 words total (about 2-3 paragraphs)
 */
const BIO_PARAGRAPHS = [
  // Paragraph 1: Background and journey
  "Born in Berlin, raised in differnet cities in Germany not only bilingual but also while experiencing two different cultures in Korean and German. As a child I was interested in video games and just using the computer. But my first line of code was in 2014 when I started to learn HTML and CSS in high school. Since 2017 I began studying \"Business Computer Science\" at the University in Mannheim and changed the location to the University of Applied Sciences in Friedberg in 2021/2022.",

  // Paragraph 2: Aspirations and goals
  "I want to become a software engineer and work on projects that are meaningful and help people to reflect on their own life.",

  // TODO: Add more paragraphs if needed
  // "Another paragraph about your experiences, interests, or goals...",
];

/**
 * ============================================================================
 * SKILLS & TECHNOLOGIES
 * ============================================================================
 * List your technical skills organized by category.
 *
 * Tips for choosing skills to list:
 * - Be honest: Only list skills you can demonstrate
 * - Be specific: "React with TypeScript" > "Frontend development"
 * - Prioritize: List your strongest/most relevant skills first
 * - Keep current: Remove outdated technologies
 *
 * Suggested categories:
 * - Languages (e.g., JavaScript, Python, Java)
 * - Frameworks & Libraries (e.g., React, Next.js, Node.js)
 * - Tools & Platforms (e.g., Git, Docker, AWS)
 * - Concepts (e.g., REST APIs, Database Design, CI/CD)
 */
const SKILLS = {
  // TODO: Fill in your skills by category
  languages: [
    // "JavaScript/TypeScript",
    // "Python",
    // "Java",
  ],
  frameworks: [
    // "React & Next.js",
    // "Node.js & Express",
    // "Tailwind CSS",
  ],
  tools: [
    // "Git & GitHub",
    // "VS Code",
    // "Docker",
  ],
  concepts: [
    // "REST APIs",
    // "Database Design",
    // "Agile Development",
  ],
};

/**
 * ============================================================================
 * WHAT I'M LOOKING FOR
 * ============================================================================
 * Describe your ideal role, team, or company (1-2 paragraphs).
 *
 * Consider mentioning:
 * - Type of role (Full-stack, Frontend, Backend, etc.)
 * - Company size/stage (Startup, Scale-up, Enterprise)
 * - Work environment (Remote, Hybrid, On-site)
 * - Team culture (Collaborative, Learning-focused, etc.)
 * - Technologies you want to work with
 * - Impact you want to make
 *
 * Keep it focused but not too restrictive - you want to attract the right
 * opportunities without limiting yourself unnecessarily.
 */
const LOOKING_FOR = [
  // TODO: Fill in what you're looking for
  "Describe the kind of role, team, or company you're interested in. What's important to you in your next position?",

  // Optional second paragraph for more details
  // "Additional details about your preferences, goals, or ideal work environment...",
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About me
        </h1>
        {/* Bio / Background */}
        {BIO_PARAGRAPHS.map((paragraph, index) => (
          <p key={index} className="mt-4 text-lg leading-8 text-foreground-muted">
            {paragraph}
          </p>
        ))}

        {/* Professional Links */}
        {PROFESSIONAL_LINKS.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {PROFESSIONAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-accent hover:underline"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
        {/* Education / Background */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Background</h2>
            <p className="mt-2 text-foreground-muted">
              2021/10 - now: University of Applied Sciences, Friedberg, Business Computer Science (B.Sc.)
            </p>
            <p className="mt-2 text-foreground-muted">
              2017/10 - 2021/09: University of Mannheim, Business Computer Science (B.Sc. incomplete due to transfer to Friedberg)
            </p>
          </div>

          {/* Skills & Technologies */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">Skills & interests</h2>
            {/* Check if any skill category has entries */}
            {Object.values(SKILLS).some(arr => arr.length > 0) ? (
              <div className="mt-4 space-y-3">
                {SKILLS.languages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-muted">Languages</h3>
                    <p className="mt-1 text-foreground-muted">
                      {SKILLS.languages.join(" • ")}
                    </p>
                  </div>
                )}
                {SKILLS.frameworks.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-muted">Frameworks & Libraries</h3>
                    <p className="mt-1 text-foreground-muted">
                      {SKILLS.frameworks.join(" • ")}
                    </p>
                  </div>
                )}
                {SKILLS.tools.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-muted">Tools & Platforms</h3>
                    <p className="mt-1 text-foreground-muted">
                      {SKILLS.tools.join(" • ")}
                    </p>
                  </div>
                )}
                {SKILLS.concepts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground-muted">Concepts & Practices</h3>
                    <p className="mt-1 text-foreground-muted">
                      {SKILLS.concepts.join(" • ")}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-foreground-muted">
                {/* TODO: Fill in the SKILLS constant at the top of this file */}
                List technologies, tools, or domains you work with. Add your skills to the SKILLS constant at the top of this file.
              </p>
            )}
          </div>

          {/* What I'm Looking For */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">What I&apos;m looking for</h2>
            {LOOKING_FOR.map((paragraph, index) => (
              <p key={index} className="mt-2 text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
