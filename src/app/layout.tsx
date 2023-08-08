import { Suspense } from "react";

import type { Metadata } from "next";

import "@/utils/ga";
import "@/utils/naverMap";

import NextTopLoader from "nextjs-toploader";

import { Toast } from "@/components/Common/Toast";

import { suit } from "./fonts";
import NavigationStore from "./NavigationHandler";
import PlatformChecker from "./PlatformChecker";
import Providers from "./Providers";
import PushTokenHandler from "./PushTokenHandler";

import "@/styles/global.scss";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "루프루팡",
  description: "Cumuco Roof-lupin service",
  viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: [
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={suit.className}>
        <NextTopLoader showSpinner={false} height={4} color="#eb4824" crawl />
        <Providers>
          <div className={styles.background} />
          <div className={styles.wrapper}>{children}</div>
          <div id="modal" />
          <div id="toast" />
          <div id="bottom-sheet" />
          <Toast />
          <Suspense fallback={null}>
            <PushTokenHandler />
          </Suspense>
          <Suspense fallback={null}>
            <PlatformChecker />
          </Suspense>
        </Providers>
        <Suspense fallback={null}>
          <NavigationStore />
        </Suspense>
      </body>
    </html>
  );
}
