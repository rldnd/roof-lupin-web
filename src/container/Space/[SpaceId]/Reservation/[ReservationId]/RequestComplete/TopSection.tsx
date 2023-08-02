"use client";

import Image from "next/image";

import styles from "./topSection.module.scss";

const TopSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          fill
          sizes="(min-width: 60em) 24vw,(min-width: 28em) 45vw,100vw"
          alt="공간 이미지"
          src="https://dev-image.rooflupin.com/IMG_5913.jpg"
        />
      </div>
      <h1 className={styles.title}>
        ~~~~~
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
