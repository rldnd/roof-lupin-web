"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components";

import styles from "./failed.module.scss";

const AuthFailedContainer: React.FC = () => {
  const { replace } = useRouter();

  const onClickButton = () => {
    replace("/");
  };

  return (
    <main className={styles.wrapper}>
      <h1>로그인에 실패하였습니다</h1>
      <Button type="button" full color="primary" onClick={onClickButton}>
        홈으로 돌아가기
      </Button>
    </main>
  );
};

export default AuthFailedContainer;
