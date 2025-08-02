import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zoomdishes.com"),
  title: "ZoomDishes: Fast, Local Food Dispatch & Delivery in Australia",
  description:
    "ZoomDishes is a location-aware food dispatch and delivery platform for Australian restaurants. Get real-time tracking, fast delivery, and seamless order management.",
  keywords: [
    "fast food delivery",
    "local dishes near me",
    "Australian food delivery startup",
    "food delivery",
    "food dispatch and tracking",
    "delivery tracking",
    "fast delivery",
    "real-time food delivery tracking",
    "restaurant owned dispatch and delivery tracking service",
    "restaurant delivery SaaS",
  ],
  openGraph: {
    title: "ZoomDishes: Fast, Local Food Dispatch & Delivery in Australia",
    description:
      "The future of food delivery is here. ZoomDishes offers a modern, fast, and reliable dispatch platform for Australian restaurants.",
    url: "https://www.zoomdishes.com",
    siteName: "ZoomDishes",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZoomDishes: Fast, Local Food Dispatch & Delivery in Australia",
    description:
      "The future of food delivery is here. ZoomDishes offers a modern, fast, and reliable dispatch platform for Australian restaurants.",
    // creator: "@yourtwitterhandle",
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
  alternates: {
    canonical: "https://www.zoomdishes.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
