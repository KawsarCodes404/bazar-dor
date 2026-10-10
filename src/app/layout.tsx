import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Marquee from "@/component/Marquee";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="light" className="min-h-full antialiased">
      <body className="flex min-h-screen flex-col">
        <Header />
        <Marquee />
        <main className="mx-auto w-full max-w-7xl flex-1 px-2">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
