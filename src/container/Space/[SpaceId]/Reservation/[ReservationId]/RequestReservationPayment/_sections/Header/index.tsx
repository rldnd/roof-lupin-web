import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return <BaseHeader title="결제" className={styles.wrapper} />;
};

export default Header;
