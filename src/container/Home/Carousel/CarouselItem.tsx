import Link from "next/link";

import type { Curation } from "@/common/types/curation";

import styles from "./carouselItem.module.scss";

interface Props {
  curation: Curation;
}

const CarouselItem: React.FC<Props> = ({ curation }) => {
  return (
    <Link href={`/curations/${curation.id}`} className={styles.link}>
      <article className={styles.wrapper}>
        <img className={styles.image} src={curation.thumbnail} alt="큐레이션 이미지" />
        <div className={styles.textWrapper}>
          <h2>{curation.title}</h2>
          <p>{curation.subTitle}</p>
        </div>
      </article>
    </Link>
  );
};

export default CarouselItem;
