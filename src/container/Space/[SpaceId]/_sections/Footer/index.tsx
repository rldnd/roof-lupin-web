"use client";

import { Button } from "@/components";

import { IconRepeat } from "public/icons";

import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      <button type="button">
        <IconRepeat />
      </button>
      <Button color="primary">요금 확인하기</Button>
    </footer>
  );
};

export default Footer;
