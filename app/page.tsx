import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-gradient-to-b from-background-elevated to-background px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Sontek Daniel Cho
          </h1>
          <p className="mt-4 text-xl text-foreground-muted sm:text-2xl">
            Software for the self
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground-muted">
            Welcome to my portfolio. I focus on clean solutions and thoughtful design.
            Explore my background or use the private area if you have access.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about"
              className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              View my work
            </Link>
            <Link
              href="/personal"
              className="rounded-lg border border-white/20 bg-transparent px-6 py-3 text-base font-medium text-foreground transition-colors hover:border-accent hover:bg-white/5 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Access private area
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-foreground">Quick links</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              href="/about"
              className="block rounded-xl border border-white/10 bg-background-section p-6 transition-colors hover:border-accent/50 hover:bg-background-elevated"
            >
              <span className="font-medium text-foreground">About me</span>
              <p className="mt-2 text-sm text-foreground-muted">
                Background, skills, and what I&apos;m looking for.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="block rounded-xl border border-white/10 bg-background-section p-6 transition-colors hover:border-accent/50 hover:bg-background-elevated"
            >
              <span className="font-medium text-foreground">Projects</span>
              <p className="mt-2 text-sm text-foreground-muted">
                List and showcase of my work and ongoing projects.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/employer"
              className="block rounded-xl border border-white/10 bg-background-section p-6 transition-colors hover:border-accent/50 hover:bg-background-elevated"
            >
              <span className="font-medium text-foreground">Employer</span>
              <p className="mt-2 text-sm text-foreground-muted">
                Password-protected area for recruiters to review my CV.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/personal"
              className="block rounded-xl border border-white/10 bg-background-section p-6 transition-colors hover:border-accent/50 hover:bg-background-elevated"
            >
              <span className="font-medium text-foreground">Personal</span>
              <p className="mt-2 text-sm text-foreground-muted">
                Space for friends and family only — inner thoughts and blog.
              </p>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
