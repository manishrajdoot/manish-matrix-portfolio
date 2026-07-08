import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manish Rajdoot | Data Scientist & Programmer",
  description: "Official portfolio of Manish Rajdoot. Data Scientist and Full Stack Programmer specializing in algorithmic database sequences, machine learning pipelines, and high-fidelity system architectures.",
  keywords: ["Manish Rajdoot", "Manish Rajput", "Manish Rajdoot Portfolio", "Data Scientist Jaipur", "Programmer Manish", "PL/SQL Engineer"],
  authors: [{ name: "Manish Rajdoot" }],
  creator: "Manish Rajdoot",
  metadataBase: new URL("https://manish-matrix-portfolio.vercel.app"), // Apni exact active vercel URL yahan daal dena bhai
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#020208] text-[#b4b4b4] antialiased selection:bg-[#00ff66]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}