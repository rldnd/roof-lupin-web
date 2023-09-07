"use client";

import Image from "next/image";
import Link from "next/link";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { ImageDTO } from "@/common/types/common";
import HorizonDraggable from "@/components/HorizonDraggable";

import styles from "./images.module.scss";

interface Props {
  reviewId: string;
  images: ImageDTO[];
}

const Images: React.FC<Props> = ({ images, reviewId }) => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {images.map((image, index) => (
        <li key={image.url}>
          <Link href={`/my-page/reviews/${reviewId}/images?index=${index}`}>
            <Image width={128} height={128} src={image.url} alt="이미지" />
          </Link>
        </li>
      ))}
    </HorizonDraggable>
  );
};

export default Images;

export const LoadingImages: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {range(3).map((value) => (
        <Skeleton width={128} height={128} key={value} />
      ))}
    </ul>
  );
};
