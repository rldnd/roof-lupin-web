"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components";

import styles from "./tossPayFailContainer.module.scss";

// TODO: fail api call
const TossPayFailContainer: React.FC = () => {
  const { replace } = useRouter();
  const { get } = useSearchParams();

  const onClickButton = () => {
    replace("/");
  };

  return (
    <main className={styles.wrapper}>
      <h1>{get("code")}</h1>
      <p>{get("message")}</p>
      <Button type="button" full color="primary" onClick={onClickButton}>
        홈으로 돌아가기
      </Button>
    </main>
  );
};

export default TossPayFailContainer;
