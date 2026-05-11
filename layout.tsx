import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSGU Central Library — Om Sterling Global University",
  description: "Welcome to OSGU Central Library. Access 50,000+ books, 500+ journals, digital resources, research databases, and more.",
  keywords: ["OSGU Library", "Central Library", "Om Sterling Global University", "digital resources", "research databases", "e-books"],
  authors: [{ name: "OSGU Central Library" }],
  icons: { icon: "https://www.osgu.ac.in/wp-content/uploads/2020/11/OSGU_LOGO-2.png" },
  openGraph: { title: "OSGU Central Library", description: "Access 50,000+ books, 500+ journals, digital resources, and more.", siteName: "OSGU Central Library", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
