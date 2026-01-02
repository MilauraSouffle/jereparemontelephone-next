import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "JeRépareMonTelephone.fr - Répare ton téléphone toi-même",
    template: "%s | JeRépareMonTelephone.fr",
  },
  description:
    "Trouve la bonne pièce, suis le tuto, répare toi-même. Économise jusqu'à 70% sur tes réparations de smartphone. Atelier à Metz depuis 2011, Label QualiRepar.",
  keywords: [
    "réparation téléphone",
    "pièces détachées smartphone",
    "écran iPhone",
    "batterie Samsung",
    "réparation Metz",
    "tuto réparation",
  ],
  authors: [{ name: "JeRépareMonTelephone.fr" }],
  creator: "iA-Groupe",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jereparemontelephone.fr",
    siteName: "JeRépareMonTelephone.fr",
    title: "JeRépareMonTelephone.fr - Répare ton téléphone toi-même",
    description:
      "Trouve la bonne pièce, suis le tuto, répare toi-même. Économise jusqu'à 70% sur tes réparations.",
    images: [
      {
        url: "https://ik.imagekit.io/bupjuxqi6/BackGround%20Hero%20Jereparemontel.webp",
        width: 1200,
        height: 630,
        alt: "JeRépareMonTelephone.fr",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JeRépareMonTelephone.fr - Répare ton téléphone toi-même",
    description:
      "Trouve la bonne pièce, suis le tuto, répare toi-même. Économise jusqu'à 70% sur tes réparations.",
    images: ["https://ik.imagekit.io/bupjuxqi6/BackGround%20Hero%20Jereparemontel.webp"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            },
          }}
        />
      </body>
    </html>
  );
}
