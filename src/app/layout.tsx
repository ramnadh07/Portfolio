import type { Metadata } from "next";
// Removed Geist font imports as the package is not listed in dependencies
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils"; // Import cn utility

export const metadata: Metadata = {
  title: "Elegant Folio",
  description: "Showcasing skills and experiences elegantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed Geist font variables from html class
    <html lang="en" className={cn("scroll-smooth")}>
      <body
        className="antialiased min-h-screen flex flex-col bg-background font-sans" // Added fallback font-sans
      >
        <Header />
        {/* Removed container from here, apply padding directly */}
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
