import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-section mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
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
        </div>
      </div>
    </footer>
  );
}
