import { Suspense } from "react";

import type { Metadata } from "next";

import "@/utils/ga";
import "@/utils/naverMap";

import EventEmitter from "events";
import NextTopLoader from "nextjs-toploader";

import { LoginBottomSheet } from "@/components/BottomSheets/Auth";
import { PopConfirm } from "@/components/Common/PopConfirm";
import { Toast } from "@/components/Common/Toast";

import { suit } from "./fonts";
import NavigationStore from "./NavigationHandler";
import PlatformChecker from "./PlatformChecker";
import Providers from "./Providers";
import PushTokenHandler from "./PushTokenHandler";
import WindowSizeHandler from "./WindowSizeHandler";

import styles from "./layout.module.scss";
import "@/styles/global.scss";

EventEmitter.defaultMaxListeners = 30;

export const metadata: Metadata = {
  title: {
    default: "루프루팡 | 루프탑 전문 공간 대여 플랫폼",
    template: "%s | 루프루팡",
  },
  description:
    "도심 속 루프라이프의 시작, 루프루팡 | 루프탑 파티룸, 스튜디오, 글램핑 바베큐 등 다양한 활동을 옥상에서 즐겨보세요!",
  viewport: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: {
    icon: [
      { sizes: "32x32", url: "/favicon-32x32.png" },
      { sizes: "16x16", url: "/favicon-16x16.png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  keywords: ["루프루팡", "루프탑", "파티룸", "스튜디오", "글램핑", "바베큐", "공간 대여", "옥상"],
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  openGraph: {
    title: "루프루팡 | 루프탑 전문 공간 대여 플랫폼",
    description: "도심 속 루프라이프의 시작, 루프루팡",
    type: "website",
    images: "/images/og.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_LOCAL_URL as string),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={suit.className}>
        <NextTopLoader showSpinner={false} height={4} color="#eb4824" crawl />
        <Providers>
          <div className={styles.background} id="layout-background" />
          <div className={styles.wrapper} id="layout-content">
            {children}
          </div>
          <div id="modal" />
          <div id="pop-confirm" />
          <div id="toast" />
          <div id="bottom-sheet" />
          <PopConfirm />
          <Toast />
          <LoginBottomSheet />
          <Suspense fallback={null}>
            <PushTokenHandler />
          </Suspense>
          <Suspense fallback={null}>
            <PlatformChecker />
          </Suspense>
        </Providers>
        <Suspense fallback={null}>
          <WindowSizeHandler />
        </Suspense>
        <Suspense fallback={null}>
          <NavigationStore />
        </Suspense>
      </body>
    </html>
  );
}
