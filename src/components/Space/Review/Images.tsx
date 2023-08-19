"use client";

import Link from "next/link";

import { ImageDTO } from "@/common/types/common";
import HorizonDraggable from "@/components/HorizonDraggable";

import styles from "./images.module.scss";

interface Props {
  spaceId: string;
  reviewId: string;
  images: ImageDTO[];
}

const Images: React.FC<Props> = ({ spaceId, images, reviewId }) => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {images.map((image, index) => (
        <li key={image.url}>
          <Link href={`/spaces/${spaceId}/reviews/${reviewId}/images?index=${index}`}>
            <img width={128} height={128} src={image.url} alt="이미지" />
          </Link>
        </li>
      ))}
    </HorizonDraggable>
  );
};

export default Images;
