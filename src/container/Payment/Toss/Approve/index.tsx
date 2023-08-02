"use client";

import React, { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components";
import { useTossPay } from "@/hooks/queries";

import styles from "./tossPayApproveContainer.module.scss";

// TODO: server component & client component 분리
const TossPayApproveContainer: React.FC = () => {
  const router = useRouter();
  const { completeTossPay, isPaySuccess, isPayError } = useTossPay();
  const { get } = useSearchParams();

  useEffect(() => {
    const orderId = get("orderId");
    const paymentKey = get("paymentKey");
    const amount = Number(get("amount"));

    if (!orderId || !paymentKey || !amount) router.replace("/");
    else completeTossPay({ amount, orderId, paymentKey });
  }, [router, get, completeTossPay]);

  return (
    <main className={styles.wrapper}>
      {isPaySuccess && <h1>당신의 돈 {get("amount")}원이 날라갔습니다.. 바바이티비..</h1>}
      {isPayError && <h1>결제에 실패했습니다..</h1>}
      <Button type="button" onClick={() => router.replace("/")} color="primary" full>
        홈으로
      </Button>
    </main>
  );
};

export default TossPayApproveContainer;
