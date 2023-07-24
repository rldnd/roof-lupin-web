import { Suspense } from "react";

import "@/utils/ga";
import "@/utils/naverMap";

import NextTopLoader from "nextjs-toploader";

import { Toast } from "@/components";

import AppSocialLoginHandler from "./AppSocialLoginHandler";
import { suit } from "./fonts";
import NavigationStore from "./NavigationHandler";
import Providers from "./Providers";
import PushTokenHandler from "./PushTokenHandler";

import "@/styles/global.scss";

import styles from "./layout.module.scss";

export const metadata = {
  title: "루프루팡",
  description: "Cumuco Roof-lupin service",
  viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={suit.className} suppressHydrationWarning>
        <NextTopLoader showSpinner={false} height={4} color="#eb4824" crawl />
        <Providers>
          <div className={styles.background} />
          <div className={styles.wrapper}>{children}</div>
          <div id="modal" />
          <div id="toast" />
          <div id="bottom-sheet" />
          <Suspense fallback={null}>
            <PushTokenHandler />
          </Suspense>
          <Toast />
        </Providers>
        <Suspense fallback={null}>
          <NavigationStore />
        </Suspense>
        <Suspense fallback={null}>
          <AppSocialLoginHandler />
        </Suspense>
      </body>
    </html>
  );
}
