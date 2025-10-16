import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sBTC Streamr - Continuous Token Payments",
  description: "Stream STX, sBTC, and tokens continuously on Stacks blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="glass-card mx-4 mb-4 p-6 text-center text-sm text-gray-400">
            <p>Built with ❤️ for Stacks Ascent Trailblazer Program</p>
            <p className="mt-2">Stream tokens continuously • Powered by Clarity</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
