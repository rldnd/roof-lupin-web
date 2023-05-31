import "@/styles/global.scss";

import { pretendard } from "./fonts";
import Providers from "./providers";

import styles from "./layout.module.scss";

export const metadata = {
  title: "루프루팡",
  description: "Cumuco Roof-lupin service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.className} suppressHydrationWarning>
        <Providers>
          <div className={styles.background} />
          <div className={styles.wrapper}>{children}</div>
          <div id="modal" />
        </Providers>
      </body>
    </html>
  );
}
