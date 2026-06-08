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

export const metadata: Metadata = {
  title: "Arqovia Digital | Premium Design & Development Agency",
  description: "Arqovia Digital is a high-end international digital agency specializing in premium web development, graphic design, and marketing for ambitious brands.",
  openGraph: {
    title: "Arqovia Digital | Premium Design & Development Agency",
    description: "Arqovia Digital is a high-end international digital agency specializing in premium web development, graphic design, and marketing for ambitious brands.",
    siteName: "Arqovia Digital",
    type: "website",
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
