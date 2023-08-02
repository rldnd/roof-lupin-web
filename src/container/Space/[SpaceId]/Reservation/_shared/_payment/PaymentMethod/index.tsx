"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";
import { useAtom } from "jotai";

import { PaymentMethod as PaymentMethodType } from "@/common/types/payment";
import { reservationPaymentMethodState } from "@/states/reservation";

import styles from "./paymentMethod.module.scss";

const PaymentMethod: React.FC = () => {
  const [method, setMethod] = useAtom(reservationPaymentMethodState);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = e.currentTarget.value as PaymentMethodType;
    setMethod(value);
  };

  return (
    <section className={styles.wrapper}>
      <h2>결제 수단</h2>
      <small className={styles.desc}>상세 안내할 내용</small>
      <menu className={styles.methods}>
        <li className={styles.method}>
          <button type="button" value="kakao" onClick={onClick} className={cx({ [styles.active]: method === "kakao" })}>
            <div className={styles.imageWrapper}>
              <img src={"/images/payment/kakao-pay.png"} alt="카카오 페이" />
            </div>
          </button>
        </li>
        <li className={styles.method}>
          <button type="button" value="toss" onClick={onClick} className={cx({ [styles.active]: method === "toss" })}>
            <div className={styles.imageWrapper}>
              <img src={"/images/payment/toss-pay.png"} alt="토스 페이" />
            </div>
          </button>
        </li>
        <li className={styles.method}>
          <button type="button" value="naver" onClick={onClick} className={cx({ [styles.active]: method === "naver" })}>
            <div className={styles.imageWrapper}>
              <img src={"/images/payment/naver-pay.png"} alt="네이버 페이" />
            </div>
          </button>
        </li>
        <li className={styles.method}>
          <button
            type="button"
            value="port-one"
            onClick={onClick}
            className={cx({ [styles.active]: method === "port-one" })}
          >
            신용/체크 카드
          </button>
        </li>
      </menu>
    </section>
  );
};

export default PaymentMethod;
