"use client";

import { Button } from "@/components/Common";

import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      <Button type="reset" color="bw" full>
        초기화
      </Button>
      <Button type="submit" color="primary" full>
        적용하기
      </Button>
    </footer>
  );
};

export default Footer;
