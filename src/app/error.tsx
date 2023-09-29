"use client";

import { useRouter } from "next/navigation";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import type { ErrorDTO } from "@/common/types/common";
import { Button } from "@/components";
import { HeightFitLayout } from "@/components/Layout";
import { isAxiosError as isAxiosErrorApp } from "@/services/apiClient";

import styles from "./error.module.scss";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { replace } = useRouter();
  const { reset: resetReactQueryError } = useQueryErrorResetBoundary();

  const [code, title, desc] = (() => {
    const isAxiosError = isAxiosErrorApp<ErrorDTO>(error);
    if (error.message.includes("canceled") || error.message.includes("TOKEN_EMPTY"))
      return [401, "권한이 없습니다.", ""];
    if (error.message.includes("Unexpected token < in")) return [503, "Service Unavailable", "서버 점검 중입니다."];
    if (isAxiosError && error.response?.data) {
      return [error.response.data.statusCode, error.response.data.message, ""];
    }
    return [500, error.name, error.message];
  })();

  const onClickButton = () => {
    resetReactQueryError();
    reset();
    replace("/");
  };

  return (
    <HeightFitLayout className={styles.wrapper}>
      <h1 className={styles.code}>{code}</h1>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
      <footer className={styles.footer}>
        <Button type="button" color="primary" full onClick={onClickButton}>
          홈으로 돌아가기
        </Button>
      </footer>
    </HeightFitLayout>
  );
}
