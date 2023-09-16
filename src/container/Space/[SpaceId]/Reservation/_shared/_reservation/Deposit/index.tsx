"use client";

import { type ChangeEventHandler } from "react";

import { useParams } from "next/navigation";

import { useAtom } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Checkbox } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import { reservationDepositConfirmState } from "@/states";

import styles from "./deposit.module.scss";

const Deposit: React.FC = () => {
  const { spaceId } = useParams();

  const [checked, setChecked] = useAtom(reservationDepositConfirmState);
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.currentTarget.checked);
  };

  if (!data.deposit) return null;

  return (
    <section className={styles.wrapper}>
      <h2>
        보증금 <strong>{data.deposit.toLocaleString("ko-KR")}원</strong>
      </h2>
      <p>
        디난트 루프탑은 계좌이체로 보증금 100,000원을 받고 있어요. 보증금 지급은 예약 하루 전 문자로 알려드려요. 대관
        종료 후 문제없을 시 24시간 이내 예약자 계좌로 반환됩니다.
      </p>
      <Checkbox className={styles.checkbox} checked={checked} onChange={onChange}>
        위 내용을 확인했어요
      </Checkbox>
    </section>
  );
};

export default Deposit;
