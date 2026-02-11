import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal | Portfolio",
  description: "Space for friends and family only — blog and inner thoughts",
};

export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
