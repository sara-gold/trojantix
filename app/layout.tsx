import type { Metadata, Viewport } from "next";
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
  title: "TrojanTix",
  description: "USC students buy, sell, and swap football tickets with each other.",
};

export const viewport: Viewport = {
  themeColor: "#990000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="bg-cardinal text-white">
          <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
            <span aria-hidden className="h-6 w-1.5 rounded-full bg-gold" />
            <span className="text-lg font-bold tracking-tight">TrojanTix</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
