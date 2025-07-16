import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";

const geistRoboto = Roboto({
  variable: "--font-geist-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Game Frieren",
  description: "Jogo da memória do anime fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistRoboto.variable}  antialiased`}>{children}</body>
    </html>
  );
}
