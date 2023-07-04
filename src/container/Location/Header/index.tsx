import { BaseHeader } from "@/components/Layout";

import { IconPosition } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <BaseHeader
      title={
        <>
          <IconPosition />
          <span className={styles.title}>강동구 성내동</span>
        </>
      }
      backHidden
    />
  );
};

export default Header;
