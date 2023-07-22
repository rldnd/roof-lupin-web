"use client";

import { Checkbox, UnderlinedInput } from "@/components";

import styles from "./userInfo.module.scss";

const UserInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>대표 이용자 정보</h2>
      <Checkbox>예약자와 같아요</Checkbox>
      <UnderlinedInput label="성명" wrapperClassName={styles.inputWrapper} className={styles.input} />
      <UnderlinedInput label="전화번호" wrapperClassName={styles.inputWrapper} className={styles.input} />
    </section>
  );
};

export default UserInfo;
