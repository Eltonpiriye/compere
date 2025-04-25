import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HoverProvider } from "@/context/hover-context";
import CustomCursor from "@/components/custom-cusor";
import { TransitionProvider } from "@/components/providers/page-transition-provider";
import Transition from "@/components/Transition";

const productSans = localFont({
  src: "../public/fonts/product-sans-full/ProductSans-Thin.ttf",
  variable: "--font-product-sans",
});

const productSansBold = localFont({
  src: "../public/fonts/product-sans-full/ProductSans-Light.ttf",
  variable: "--font-product-sans",
});

const tuskerGrotesk = localFont({
  src: "../public/fonts/tusker-grotesk/TuskerGrotesk-3500Medium.woff",
  variable: "--font-tusker-grotesk",
});

const tuskerGroteskBold = localFont({
  src: "../public/fonts/tusker-grotesk/TuskerGrotesk-6600Semibold.woff",
  variable: "--font-tusker-grotesk-bold",
});

export const metadata: Metadata = {
  title: "Elton Piriye",
  description: "The host with the most",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tuskerGrotesk.variable} ${tuskerGroteskBold.variable} ${productSans.className} antialiased min-h-svh`}
      >
        <Transition>
          <TransitionProvider>
            <HoverProvider>{children}</HoverProvider>
          </TransitionProvider>
        </Transition>
        <CustomCursor />
      </body>
    </html>
  );
}
