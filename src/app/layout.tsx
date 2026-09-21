import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Property Network",
  description: "Trust-first property intelligence and transaction platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
