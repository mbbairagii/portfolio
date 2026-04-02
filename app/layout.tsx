import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Mohini | Portfolio",
  description: "Full-stack developer. cs @ gl bajaj · i build complete products end-to-end.",
  metadataBase: new URL("https://mohini.is-a.dev"), // ← replace with your actual URL
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mohini | Portfolio",
    description: "Full-stack developer. · i obsess over details most people skip.",
    url: "https://mohini.is-a.dev", // ← same URL here
    images: [{ url: "/og-image-v2.png", width: 1200, height: 630, alt: "Mohini — Full-stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohini | Portfolio",
    description: "Full-stack developer. · i obsess over details most people skip.",
    images: ["/og-image-v2.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090F" },
    { media: "(prefers-color-scheme: light)", color: "#CCCAD8" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}