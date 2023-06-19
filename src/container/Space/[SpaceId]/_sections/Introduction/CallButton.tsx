"use client";

import { IconPhone } from "public/icons";

import styles from "./callButton.module.scss";

const CallButton: React.FC = () => {
  return (
    <button type="button" className={styles.call}>
      <IconPhone />
      문의하기
    </button>
  );
};

export default CallButton;
