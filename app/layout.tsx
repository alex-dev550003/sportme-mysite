import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SportMe",
    description: "Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe.",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/logo-512.png",
    },
    openGraph: {
      title: "SportMe",
      description: "Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe.",
      images: ["https://www.sportme.ro/logo-512.png"],
      url: "https://www.sportme.ro",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeColor = "#020915";
  const bodyClassName = `${geistSans.variable} ${poppins.variable} antialiased`;

  return (
    <html lang="ro">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/logo-512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/logo-512.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={themeColor} />
        <meta property="og:title" content="SportMe" />
        <meta property="og:description" content="Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe." />
        <meta property="og:image" content="https://www.sportme.ro/logo-512.png" />
        <meta property="og:image:secure_url" content="https://www.sportme.ro/logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.sportme.ro/logo-512.png" />
        <meta property="og:url" content="https://www.sportme.ro" />
        <meta property="og:type" content="website" />
      </head>
      <body className={bodyClassName}>
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
