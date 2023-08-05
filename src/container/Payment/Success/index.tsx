"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components";
import { completePaymentApi, deletePaymentWhenFailApi } from "@/services/payment";

type Status = "loading" | "success" | "fail";

import styles from "./paymentSuccessContainer.module.scss";

const PaymentSuccessContainer: React.FC = () => {
  const router = useRouter();
  const { get } = useSearchParams();

  const [status, setStatus] = useState<Status>("loading");

  const paymentType = get("paymentType");
  const orderId = get("orderId");
  const paymentKey = get("paymentKey");
  const amount = Number(get("amount"));

  const { mutate: completePayment } = useMutation(completePaymentApi, {
    onSuccess: () => setStatus("success"),
    onError: () => {
      if (orderId) deletePayment(orderId as string);
      setStatus("fail");
    },
  });

  const { mutate: deletePayment } = useMutation(deletePaymentWhenFailApi);

  useEffect(() => {
    if (!orderId || !paymentKey || !amount || !paymentType) router.replace("/");
    else completePayment({ amount, orderId, paymentKey });
  }, [router, get, completePayment, orderId, paymentKey, amount, paymentType]);

  return (
    <main className={styles.wrapper}>
      {status === "success" && <h1>당신의 돈 {get("amount")}원이 날라갔습니다.. 바바이티비..</h1>}
      {status === "fail" && <h1>결제에 실패했습니다..</h1>}
      <Button type="button" onClick={() => router.replace("/")} color="primary" full>
        홈으로
      </Button>
    </main>
  );
};

export default PaymentSuccessContainer;
