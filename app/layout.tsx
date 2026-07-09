import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Consequence Chamber",
  description: "A consequence has been prepared for you.",
  openGraph: {
    title: "The Consequence Chamber",
    description: "A consequence has been prepared for you.",
    url: "https://consequence-chamber.vercel.app",
    siteName: "The Consequence Chamber",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Consequence Chamber",
    description: "A consequence has been prepared for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
