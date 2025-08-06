import TopLoader from "@/components/_layout/TopLoader";
import { FlashToaster } from "@/components/flashToaster/FlashToaster";
import { WebVitals } from "@/components/metrics/WebVitals";
import { APP_DESCRIPTION, APP_LABEL } from "@/config/env.config";
import { cn } from "@/lib/components.lib";
import "@/styles/main.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_LABEL,
  description: APP_DESCRIPTION,
  icons: {
    icon: "/kemon-logo-blanco-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col items-center bg-background w-screen h-screen",
          inter.className
        )}
        suppressHydrationWarning
      >
        <TopLoader />
        <Providers>
          {children}
          <WebVitals />
          <FlashToaster />
        </Providers>
      </body>
    </html>
  );
}
