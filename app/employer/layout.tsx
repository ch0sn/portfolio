import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employer | Portfolio",
  description: "Password-protected area for recruiters and hiring teams",
};

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
