import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const signika = Signika({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signika",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Which AI",
  description: "Find the best AI tools for your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${signika.className} antialiased dark`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
