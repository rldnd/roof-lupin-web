import Link from "next/link";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { Button, ToastPositioner } from "@/components";
import { HeightFitLayout } from "@/components/Layout";

import styles from "./resignCompleteContainer.module.scss";

export default async function ResignCompleteContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <HeightFitLayout>
        <header className={styles.header}>
          <span className={styles.title}>탈퇴 완료</span>
        </header>
        <main className={styles.wrapper}>
          <img width="79" height="75.567" src="/images/resign/resign-complete.png" alt="탈퇴 완료 이미지" />
          <p>
            탈퇴가 완료되었어요.
            <br />
            루프루팡을 이용해주셔서 감사합니다!
          </p>
          <footer className={styles.footer}>
            <Link href="/">
              <Button type="button" color="primary" full>
                홈으로 돌아가기
              </Button>
            </Link>
          </footer>
        </main>
      </HeightFitLayout>
    </ToastPositioner>
  );
}
