import type { Exhibition as ExhibitionType } from "@/common/types/exhibition";

import styles from "./exhibition.module.scss";

interface Props {
  exhibition: ExhibitionType;
}

const Exhibition: React.FC<Props> = ({ exhibition }) => {
  return (
    <section className={styles.wrapper}>
      <small className={styles.exhibitionTag}>기획전</small>
      <h2>{exhibition.title}</h2>
      <span className={styles.desc}>{exhibition.description}</span>
      <img src={exhibition.thumbnail} alt="기획전" />
    </section>
  );
};

export default Exhibition;
