import { memo } from "react";

import type { ImageDTO } from "@/common/types/common";

import styles from "./carouselItem.module.scss";

interface Props {
  image: ImageDTO;
}

const CarouselItem: React.FC<Props> = ({ image }) => {
  return <img className={styles.wrapper} src={image.url} alt="공간 이미지" />;
};

export default memo(CarouselItem);
