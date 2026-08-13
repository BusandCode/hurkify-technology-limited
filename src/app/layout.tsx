import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hurkify Technology Limited | IT Consulting & Healthcare Technology",
  description:
    "Hurkify Technology Limited delivers IT consulting, software development, and healthcare compliance support — including HEFAMAA registration and EMR systems — for businesses across Nigeria.",
  keywords: [
    "Hurkify",
    "HEFAMAA registration",
    "healthcare technology Nigeria",
    "IT consulting Lagos",
    "EMR systems Nigeria",
  ],
  openGraph: {
    title: "Hurkify Technology Limited",
    description:
      "IT consulting, software development, and healthcare compliance support for the Nigerian market.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
