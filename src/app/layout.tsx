import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Common/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const monts = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riset KSPM PKN STAN",
  description: "Divisi Riset KSPM PKN STAN 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monts.variable} antialiased`}>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
