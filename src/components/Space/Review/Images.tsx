"use client";

import Image from "next/image";

import { ImageDTO } from "@/common/types/common";
import HorizonDraggable from "@/components/HorizonDraggable";

import styles from "./images.module.scss";

interface Props {
  images: ImageDTO[];
}

const Images: React.FC<Props> = ({ images }) => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {images.map((image) => (
        <li key={image.url}>
          <Image width={128} height={128} src={image.url} alt="이미지" />
        </li>
      ))}
    </HorizonDraggable>
  );
};

export default Images;
