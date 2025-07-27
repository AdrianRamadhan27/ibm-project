import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import AOSInitializer from '@/components/AOSInitializer';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fira-sans',
});

export const metadata: Metadata = {
  title: "SuaraHati",
  description: "Therapy Journal App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-color-mode="light">
        <head>

        <link rel="icon" href="/Logo.png" />
        </head>
      
      <body
        className={`${firaSans.variable}`}
      >
        <AOSInitializer />
        <Header/>

        {children}
        <Footer/>
      </body>
    </html>
  );
}


