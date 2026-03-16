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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "ReGeno | Premium Secondhand Gaming Gear",
  description: "Buy and sell refurbished gaming consoles, PCs, and peripherals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-slate-50`}
      >
      
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          
        
          <main className="flex-grow w-full">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}