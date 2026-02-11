import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background-elevated/95 backdrop-blur supports-[backdrop-filter]:bg-background-elevated/80">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6" aria-label="Main">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground transition-colors hover:text-accent"
        >
          Portfolio
        </Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-foreground-muted transition-colors hover:text-foreground"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-foreground-muted transition-colors hover:text-foreground"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="text-foreground-muted transition-colors hover:text-foreground"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/employer"
              className="text-accent transition-colors hover:text-accent-hover"
            >
              Employer
            </Link>
          </li>
          <li>
            <Link
              href="/personal"
              className="text-blue-300 transition-colors hover:text-foreground"
            >
              Personal
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
