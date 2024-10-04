import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header"


export const metadata: Metadata = {
  title: "Game Hub - Jogos incríveis",
  description: "Mais de 100 jogos",
  keywords: ['jogos', 'games', 'steam', 'epic games', 'origin', ' EA Games', ],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/preview.png`]
  },
  robots:{
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
