import Link from "next/link";

import { IconHome } from "public/icons";

import styles from "./bottomNavigation.module.scss";

const BottomNavigation: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      <nav>
        <Link className={styles.item} href="/">
          <IconHome />
          <span>홈</span>
        </Link>
        <Link className={styles.item} href="/search">
          <IconHome />
          <span>검색</span>
        </Link>
        <Link className={styles.item} href="/locations">
          <IconHome />
          <span>주변</span>
        </Link>
        <Link className={styles.item} href="/heart">
          <IconHome />
          <span>찜</span>
        </Link>
        <Link className={styles.item} href="/my">
          <IconHome />
          <span>마이</span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
