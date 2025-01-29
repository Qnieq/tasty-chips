import type { Metadata } from "next";
import { Toaster } from 'sonner'
import "./globals.css";
import { chonburi, poppins } from "@/utils/fonts";
import { MouseFollower } from "@/components/UI/mouse-follower/MouseFollower";
import dynamic from "next/dynamic";
import { LoadingProvider } from "@/lib/LoadingProvider";

export const metadata: Metadata = {
  title: "Testy Chips",
  description: "World class awesome Chips",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chonburi} ${poppins}`}
      >
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <Toaster
          theme="light"
          position="bottom-right"
          duration={6000}
          closeButton={true}
          pauseWhenPageIsHidden={true}
        />
        <MouseFollower />
      </body>
    </html>
  );
}
