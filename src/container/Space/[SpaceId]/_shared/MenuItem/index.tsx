import Link from "next/link";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./menuItem.module.scss";

interface Props {
  href: string;
  title: string;
}

const MenuItem: React.FC<Props> = ({ href, title }) => {
  return (
    <Link href={href} className={styles.wrapper}>
      <h2>{title}</h2>
      <IconGrayRightChevronLarge />
    </Link>
  );
};

export default MenuItem;
