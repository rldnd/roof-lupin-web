import { memo } from "react";

import Link from "next/link";

import type { ImageDTO } from "@/common/types/common";

import styles from "./carouselItem.module.scss";

interface Props {
  image: ImageDTO;
  spaceId: string;
}

const CarouselItem: React.FC<Props> = ({ image, spaceId }) => {
  return (
    <Link href={`/spaces/${spaceId}/images`}>
      <img className={styles.wrapper} src={image.url} alt="공간 이미지" />
    </Link>
  );
};

export default memo(CarouselItem);
