import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Image from "next/image";

import Nav from "./components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movie RAG",
  description: "Example Movie RAG application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col">
          <Nav/>
          <main className="flex flex-col">
            {children}
          </main>
          <footer className="row-start-3 flex gap-2 flex-wrap items-center justify-center">
          Made by Carly Richmond with 💜 and excessive amounts of 🍵 and inspiration from 
            <a className="elastifix-ref" href="https://github.com/elastic/Elastiflix">Elastifix</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
