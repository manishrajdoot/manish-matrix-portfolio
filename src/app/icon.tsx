import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manish Rajdoot | Data Scientist & Programmer Portfolio",
  description: "Immersive futuristic portfolio showcase featuring advanced data analytics compilation frameworks, PL/SQL trigger systems, and Next.js architectures.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  // ⚡ STATIC FAVICON VECTOR ROUTE DECLARATION
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🥷</text></svg>",
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