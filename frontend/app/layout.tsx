import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chai Stall Tracker",
  description: "Station-by-station chai stall directory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-roast-950 text-milk-100 font-display">
        {children}
      </body>
    </html>
  );
}
