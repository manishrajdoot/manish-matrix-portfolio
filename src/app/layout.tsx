import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manish Rajdoot | Data Scientist & Programmer",
  description: "Portfolio of Manish Rajdoot, specializing in Data Science and high-fidelity modular system architectures.",
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