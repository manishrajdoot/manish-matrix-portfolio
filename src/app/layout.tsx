import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manish Rajdoot | Data Scientist & Programmer Portfolio",
  description: "Immersive futuristic portfolio showcase featuring advanced data analytics compilation frameworks, PL/SQL trigger systems, and Next.js architectures.",
  // ⚡ CACHE BUSTER ADDED TO FORCE BROWSER RE-RENDER
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23020208' stroke='%2300ff66' stroke-width='4'/><text y='75' x='12' font-size='70'>🥷</text></svg>?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#020208" />
      </head>
      <body className="antialiased select-none selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}