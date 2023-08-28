"use client";

import Image from "next/image";

import { useMe } from "@/hooks/queries";

import { IconGrayRightChevron } from "public/icons";

import styles from "./info.module.scss";

const Info: React.FC = () => {
  const { me } = useMe();

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <h1>
          {me?.nickname}님,
          <br />
          안녕하세요.
        </h1>
        {me?.profileImage && (
          <Image className={styles.thumbnail} src={me.profileImage} width={60} height={60} alt="프로필 이미지" />
        )}
        {!me?.profileImage && <div className={styles.emptyImage} />}
        {/* //TODO: 정보 수정 페이지 */}
        <span className={styles.email}>
          {me?.email} <IconGrayRightChevron />
        </span>
      </div>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
  return <section className={styles.wrapper}></section>;
};
