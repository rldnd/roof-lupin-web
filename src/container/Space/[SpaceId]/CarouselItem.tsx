import { memo } from "react";

import Image from "next/image";

import type { ImageDTO } from "@/common/types/common";

import styles from "./carouselItem.module.scss";

interface Props {
  image: ImageDTO;
}

const CarouselItem: React.FC<Props> = ({ image }) => {
  return (
    <div className={styles.wrapper}>
      <Image src={image.url} alt="공간 이미지" fill priority />
    </div>
  );
};

export default memo(CarouselItem);
