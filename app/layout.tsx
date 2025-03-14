import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Idle Game",
  description: "A simple idle game built with Next.js and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
