import Link from "next/link";

import type { Exhibition as ExhibitionType } from "@/common/types/exhibition";

import styles from "./exhibition.module.scss";

interface Props {
  exhibition: ExhibitionType;
}

const Exhibition: React.FC<Props> = ({ exhibition }) => {
  return (
    <section className={styles.wrapper}>
      <Link href={`/exhibitions/${exhibition.id}`}>
        <small className={styles.exhibitionTag}>기획전</small>
        <h2>{exhibition.title}</h2>
        <span className={styles.desc}>{exhibition.description}</span>
        <img src={exhibition.thumbnail} alt="기획전" />
      </Link>
    </section>
  );
};

export default Exhibition;
