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
  title: "Arqovia Digital Studio | Premium Web Design & Digital Experiences",
  description: "We design premium websites, digital products and brands for ambitious startups and modern businesses.",
  keywords: ["Digital Agency", "Web Design", "Premium Websites", "Branding", "Startups", "Next.js", "Luxury Design"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Arqovia Digital Studio | Premium Web Design & Digital Experiences",
    description: "We design premium websites, digital products and brands for ambitious startups and modern businesses.",
    siteName: "Arqovia Digital Studio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arqovia Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arqovia Digital Studio | Premium Web Design & Digital Experiences",
    description: "We design premium websites, digital products and brands for ambitious startups and modern businesses.",
    images: ["/og-image.jpg"],
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
