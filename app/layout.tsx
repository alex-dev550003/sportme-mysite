import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sportme.ro"),
  title: {
    default: "SportMe",
    template: "%s | SportMe",
  },
  description: "Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe.",
  manifest: "/manifest.webmanifest",
  applicationName: "SportMe",
  authors: [{ name: "SportMe" }],
  creator: "SportMe",
  publisher: "SportMe",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo-512.png",
  },
  openGraph: {
    title: "SportMe",
    description: "Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe.",
    images: [
      {
        url: "https://www.sportme.ro/og-image.png",
        width: 1200,
        height: 630,
        alt: "SportMe",
      },
    ],
    url: "https://www.sportme.ro/",
    siteName: "SportMe",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SportMe",
    description: "Rezerva rapid terenuri sportive si administreaza bazele sportive cu SportMe.",
    images: ["https://www.sportme.ro/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020915",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = `${geistSans.variable} ${poppins.variable} antialiased`;

  return (
    <html lang="ro">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/logo-512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/logo-512.png" />
      </head>
      <body className={bodyClassName}>
        <GoogleAnalytics />
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
