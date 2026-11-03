
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ThemeProvider from "./components/theme/ThemeProvider";
import Footer from "./components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Discover and book creative studios with StudioSpace.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <Suspense fallback={<div className="h-24" />}>
            <Navbar />
          </Suspense>

          <main className="mx-auto w-full">
            {children}
          </main>

          <ToastContainer />

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
