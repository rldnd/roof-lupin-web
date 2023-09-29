"use client";

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
        호스트가 확인하고 있어요!
      </h1>
      <p className={styles.desc}>
        호스트가 승인을 완료하면 <span>결제 알림</span>을 보내드릴게요!
      </p>
    </section>
  );
};

export default TopSection;
