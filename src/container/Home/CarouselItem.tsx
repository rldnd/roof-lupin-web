import Image from "next/image";

import type { Curation } from "@/common/types/curation";

import styles from "./carouselItem.module.scss";

interface Props {
  curation: Curation;
}

const CarouselItem: React.FC<Props> = ({ curation }) => {
  return (
    <article className={styles.wrapper}>
      <Image className={styles.image} src={curation.thumbnail} fill alt="큐레이션 이미지" priority />
      <div className={styles.textWrapper}>
        <h2>{curation.title}</h2>
        <p>{curation.subTitle}</p>
      </div>
    </article>
  );
};

export default CarouselItem;
