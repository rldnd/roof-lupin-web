import Link from "next/link";

import { Button } from "@/components";
import { HeightFitLayout } from "@/components/Layout";

import styles from "./notFound.module.scss";

export default function NotFound() {
  return (
    <HeightFitLayout className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>페이지를 찾을 수 없어요.</h2>
      <p className={styles.desc}>
        페이지 주소의 삭제 또는 변경으로 인해
        <br />
        사용하실 수 없습니다.
      </p>
      <footer className={styles.footer}>
        <Link href="/">
          <Button type="button" color="primary" full>
            홈으로 돌아가기
          </Button>
        </Link>
      </footer>
    </HeightFitLayout>
  );
}
