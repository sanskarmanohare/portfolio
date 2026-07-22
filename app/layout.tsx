import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanskar-manohare-portfolio.alphalogic905.chatgpt.site"),
  title: {
    default: "Sanskar Manohare - Full Stack Developer",
    template: "%s - Sanskar Manohare",
  },
  description:
    "Portfolio of Sanskar Manohare, a full stack developer specializing in React, FastAPI, Python, APIs, and AI integration.",
  keywords: ["Sanskar Manohare", "Full Stack Developer", "React", "FastAPI", "Python", "AI Integration"],
  authors: [{ name: "Sanskar Manohare" }],
  openGraph: {
    title: "Sanskar Manohare - Full Stack Developer",
    description: "Engineering fast, intelligent digital products from interface to infrastructure.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sanskar Manohare - Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanskar Manohare - Full Stack Developer",
    description: "Engineering fast, intelligent digital products from interface to infrastructure.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E6FAF5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
