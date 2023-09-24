"use client";

import Link from "next/link";

import { MY_RESERVATION_TAB_MAPPER } from "@/common/constants/reservation";
import { Button } from "@/components";

import styles from "./empty.module.scss";

interface Props {
  activeTab: keyof typeof MY_RESERVATION_TAB_MAPPER;
}

const Empty: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className={styles.wrapper}>
      {activeTab === MY_RESERVATION_TAB_MAPPER.isApproaching && (
        <>
          <p className={styles.text}>아직 다가오는 예약이 없어요.</p>
          <Link href="/" className={styles.link}>
            <Button type="button" color="secondary">
              예약하러 가기
            </Button>
          </Link>
        </>
      )}
      {activeTab === MY_RESERVATION_TAB_MAPPER.isUsed && <p className={styles.text}>이용 완료한 예약이 없어요.</p>}
      {activeTab === MY_RESERVATION_TAB_MAPPER.isCanceled && <p className={styles.text}>취소한 예약이 없어요.</p>}
    </div>
  );
};

export default Empty;
