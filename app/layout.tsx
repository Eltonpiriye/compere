import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Transition from "@/components/Transition";
import { HoverProvider } from "@/context/hover-context";
import CustomCursor from "@/components/custom-cusor";

const productSans = localFont({
  src: "../public/fonts/product-sans-full/ProductSans-Thin.ttf",
  variable: "--font-product-sans",
});

const tuskerGrotesk = localFont({
  src: "../public/fonts/tusker-grotesk/TuskerGrotesk-3500Medium.woff",
  variable: "--font-tusker-grotesk",
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
        className={`${tuskerGrotesk.variable} ${productSans.variable} antialiased w-screen overflow-hidden`}
      >
        <Transition>
          <HoverProvider>{children}</HoverProvider>
          <CustomCursor />
        </Transition>
      </body>
    </html>
  );
}
