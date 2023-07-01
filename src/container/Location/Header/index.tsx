import { BaseHeader } from "@/components/Layout";

import PositionButton from "./PositionButton";

import styles from "./header.module.scss";

// TODO: click position
const Header: React.FC = () => {
  return <BaseHeader title="내 주변 옥상" className={styles.wrapper} backHidden right={<PositionButton />} />;
};

export default Header;
