"use client";

import { type ChangeEventHandler, type FormEventHandler, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useSetAtom } from "jotai";

import { Button, Radio, Textarea } from "@/components";
import { paymentRefundState } from "@/states";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { reservationId } = useParams();
  const { push } = useRouter();
  const [checked, setChecked] = useState(0);
  const [input, setInput] = useState("");
  const reasonRef = useRef("");
  const setPaymentRefund = useSetAtom(paymentRefundState);

  const onChangeRadio: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(Number(e.currentTarget.value));
    reasonRef.current = e.currentTarget.title;
    setInput("");
  };

  const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    if (value.length > 1000) return;
    setInput(value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const cancelReason = checked === 6 ? input : reasonRef.current;
    setPaymentRefund({ reservationId, cancelReason });
    push(`/reservations/${reservationId}/refund/confirm`);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Radio value={1} checked={checked === 1} title="단순 변심" onChange={onChangeRadio}>
        단순 변심
      </Radio>
      <Radio value={2} checked={checked === 2} title="예약정보 변경(일정, 인원, 결제수단 등)" onChange={onChangeRadio}>
        예약정보 변경(일정, 인원, 결제수단 등)
      </Radio>
      <Radio value={3} checked={checked === 3} title="중복예약" onChange={onChangeRadio}>
        중복예약
      </Radio>
      <Radio value={4} checked={checked === 4} title="타사 최저가 상품 이용" onChange={onChangeRadio}>
        타사 최저가 상품 이용
      </Radio>
      <Radio value={5} checked={checked === 5} title="이용조건 불만" onChange={onChangeRadio}>
        이용조건 불만
      </Radio>
      <Radio value={6} checked={checked === 6} onChange={onChangeRadio}>
        기타
      </Radio>
      {checked === 6 && (
        <div className={styles.textareaWrapper}>
          <Textarea
            outlined
            className={styles.textarea}
            placeholder="취소 사유를 5자 이상 작성해주세요."
            value={input}
            onChange={onChangeTextarea}
          />
          <span className={styles.count}>{input.length}/1000</span>
        </div>
      )}
      <footer className={styles.footer}>
        <Button type="submit" color="primary" full disabled={!checked || (checked === 6 && input.length < 5)}>
          예약 취소하기
        </Button>
      </footer>
    </form>
  );
};

export default Form;
