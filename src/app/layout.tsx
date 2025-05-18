import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter font with all weights
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // Include more weights for better design flexibility
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wallet Interface",
  description: "A modern wallet interface for blockchain interactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
