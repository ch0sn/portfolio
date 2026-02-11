"use client";

import { clearStoredToken, type AuthGate } from "@/lib/auth";

// ============================================================================
// CONTENT: Employer Area
// ============================================================================
// This section contains content specifically for recruiters and hiring teams.

/**
 * ============================================================================
 * CV / RESUME SETUP
 * ============================================================================
 * To add your CV for download:
 *
 * OPTION 1: Local file (Recommended)
 * 1. Create a folder: /public/cv/
 * 2. Add your CV file: /public/cv/your-name-cv.pdf
 * 3. Update CV_DOWNLOAD_PATH below to: "/cv/your-name-cv.pdf"
 * 4. The file will be accessible at: https://yourdomain.com/cv/your-name-cv.pdf
 *
 * OPTION 2: External link
 * 1. Upload your CV to Google Drive, Dropbox, or your personal website
 * 2. Get a direct download link (make sure it's publicly accessible)
 * 3. Update CV_DOWNLOAD_PATH below with the full URL
 *
 * Tips:
 * - Name your file professionally: "firstname-lastname-cv.pdf"
 * - Keep file size under 2MB for fast downloads
 * - Update this whenever you revise your CV
 * - Consider versioning: "john-doe-cv-2025.pdf"
 */
const CV_DOWNLOAD_PATH = "#"; // TODO: Replace with "/cv/your-name-cv.pdf" or external URL

/**
 * ============================================================================
 * PROFESSIONAL SUMMARY
 * ============================================================================
 * Write a concise summary of your professional experience and qualifications.
 * This is what recruiters see first, so make it count!
 *
 * Content guidelines:
 * - Length: 3-5 sentences or 100-150 words
 * - Tone: Professional but personable
 * - Include: Years of experience, key skills, notable achievements
 * - Focus on: What you bring to a team, your unique value proposition
 *
 * Structure suggestion:
 * 1. Who you are + years of experience
 * 2. Key technical skills and expertise areas
 * 3. Notable achievements or projects
 * 4. What you're looking for next
 */
const PROFESSIONAL_SUMMARY = [
  // TODO: Replace with your professional summary
  "Software developer with X years of experience in [your specialties]. Skilled in [key technologies] with a track record of [key achievements].",

  "Looking for opportunities to [your goals] in a [type of team/company] where I can contribute to [types of projects].",
];

/**
 * ============================================================================
 * KEY HIGHLIGHTS / ACHIEVEMENTS
 * ============================================================================
 * Bullet points highlighting your most impressive accomplishments.
 * Focus on measurable impact and results.
 *
 * Examples:
 * - "Led development of a feature that increased user engagement by 40%"
 * - "Reduced API response time by 60% through optimization"
 * - "Mentored 3 junior developers, improving team velocity by 25%"
 * - "Published open-source library with 1000+ GitHub stars"
 */
const KEY_HIGHLIGHTS = [
  // TODO: Add your key achievements (3-5 bullet points)
  // "Achievement 1 with measurable impact",
  // "Achievement 2 showing technical expertise",
  // "Achievement 3 demonstrating leadership or collaboration",
];

/**
 * ============================================================================
 * CONTACT INFORMATION (Optional)
 * ============================================================================
 * Add additional contact methods if you want to make it easy for recruiters
 * to reach you beyond what's in your CV.
 */
const CONTACT_INFO = {
  // TODO: Fill in your preferred contact information
  // email: "your.email@example.com",
  // linkedin: "https://linkedin.com/in/yourprofile",
  // phone: "+1 (555) 123-4567", // Optional: only if you're comfortable sharing
};

type EmployerContentProps = {
  gate: AuthGate;
  onLogout: () => void;
};

export function EmployerContent({ gate, onLogout }: EmployerContentProps) {
  function handleLogout() {
    clearStoredToken(gate);
    onLogout();
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Employer area
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
          CV and professional background for recruiters and hiring teams.
        </p>
        <div className="mt-12 space-y-8">
          {/* CV / Resume Download */}
          <div className="rounded-xl border border-white/10 bg-background-section p-8">
            <h2 className="text-xl font-semibold text-foreground">CV / Resume</h2>
            <p className="mt-4 text-foreground-muted">
              Download my full CV for detailed information about my experience, education, and qualifications.
            </p>
            {CV_DOWNLOAD_PATH !== "#" ? (
              <a
                href={CV_DOWNLOAD_PATH}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Download CV →
              </a>
            ) : (
              <div className="mt-4">
                <button
                  disabled
                  className="inline-block rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-foreground-muted cursor-not-allowed"
                >
                  CV not yet available
                </button>
                <p className="mt-2 text-xs text-foreground-muted">
                  TODO: Add your CV file to /public/cv/ and update CV_DOWNLOAD_PATH at the top of this file
                </p>
              </div>
            )}
          </div>

          {/* Professional Summary */}
          <div className="rounded-xl border border-white/10 bg-background-section p-8">
            <h2 className="text-xl font-semibold text-foreground">
              Professional summary
            </h2>
            <div className="mt-4 space-y-3">
              {PROFESSIONAL_SUMMARY.map((paragraph, index) => (
                <p key={index} className="text-foreground-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            {KEY_HIGHLIGHTS.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground">Key Highlights</h3>
                <ul className="mt-3 space-y-2">
                  {KEY_HIGHLIGHTS.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span className="text-sm text-foreground-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Information */}
            {Object.keys(CONTACT_INFO).length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-sm font-semibold text-foreground">Contact</h3>
                <div className="mt-3 space-y-2">
                  {"email" in CONTACT_INFO && CONTACT_INFO.email && (
                    <p className="text-sm text-foreground-muted">
                      Email: <a href={`mailto:${CONTACT_INFO.email}`} className="text-accent hover:underline">{CONTACT_INFO.email}</a>
                    </p>
                  )}
                  {"linkedin" in CONTACT_INFO && CONTACT_INFO.linkedin && (
                    <p className="text-sm text-foreground-muted">
                      LinkedIn: <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View Profile →</a>
                    </p>
                  )}
                  {"phone" in CONTACT_INFO && CONTACT_INFO.phone && (
                    <p className="text-sm text-foreground-muted">
                      Phone: {CONTACT_INFO.phone}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
