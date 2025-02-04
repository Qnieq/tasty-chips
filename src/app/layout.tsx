import type { Metadata } from "next";
import { Toaster } from 'sonner'
import "./globals.css";
import { chonburi, poppins } from "@/utils/fonts";
import { MouseFollower } from "@/components/UI/mouse-follower/MouseFollower";
import { LoadingProvider } from "@/lib/LoadingProvider";

export const metadata: Metadata = {
  title: "Tasty Chips",
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
        className={`${chonburi} ${poppins} overflow-hidden`}
      >
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <MouseFollower />
        <Toaster
          theme="light"
          position="bottom-right"
          duration={6000}
          closeButton={true}
          pauseWhenPageIsHidden={true}
        />
      </body>
    </html>
  );
}
