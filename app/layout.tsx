import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const signika = Signika({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signika",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Which AI",
  description: "Find the best AI tool for specific tasks",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${signika.className} antialiased dark`}
      >
        <Header />
        <main>{children}</main>
        {modal}
        <Toaster />
      </body>
    </html>
  );
}
