import "@/styles/global.scss";

import { Suspense } from "react";

import "@/utils/ga";
import "@/utils/naverMap";

import { suit } from "./fonts";
import NavigationStore from "./NavigationHandler";
import Providers from "./providers";
import PushTokenHandler from "./PushTokenHandler";

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
        <Providers>
          <div className={styles.background} />
          <div className={styles.wrapper}>{children}</div>
          <div id="modal" />
          <div id="bottom-sheet" />
          <Suspense fallback={null}>
            <PushTokenHandler />
          </Suspense>
        </Providers>
        <Suspense fallback={null}>
          <NavigationStore />
        </Suspense>
      </body>
    </html>
  );
}
