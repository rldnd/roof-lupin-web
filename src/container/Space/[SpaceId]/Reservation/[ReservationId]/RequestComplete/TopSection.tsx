"use client";

import Image from "next/image";

import type { SpaceDetail } from "@/common/types/space";

import styles from "./topSection.module.scss";

interface Props {
  space: SpaceDetail;
}

const TopSection: React.FC<Props> = ({ space }) => {
  return (
    <section className={styles.wrapper}>
      <img alt="공간 이미지" src={space.thumbnail} />
      <h1 className={styles.title}>
        {space.title}
        <br />
        예약 요청이 완료되었어요
      </h1>
      <p className={styles.desc}>
        호스트가 승인을 완료하면 <span>결제 알림</span>을 보내드릴게요!
      </p>
    </section>
  );
};

export default TopSection;