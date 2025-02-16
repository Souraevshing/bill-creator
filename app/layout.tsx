import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import { BillProvider } from "@/app/providers/bill-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bill Creator",
  description: "Create and manage bills easily",
  authors: [
    { name: "John Doe", url: "https://sauraevshing-portfolio.netlify.app/" },
  ],
  icons: { icon: ["/vercel.svg"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <BillProvider>
            <main>{children}</main>
            <Toaster />
          </BillProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
