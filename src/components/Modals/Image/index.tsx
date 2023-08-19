"use client";

import { Suspense, useState } from "react";

import type { ImageDTO } from "@/common/types/common";
import { ModalPortal } from "@/components/Common";

import Carousel, { LoadingCarousel } from "./Carousel";
import Header from "./Header";

import styles from "./imageModal.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
  images: ImageDTO[];
  initialIndex?: number;
}

const ImageModal: React.FC<Props> = ({ isShow, onClose, images, initialIndex = 0 }) => {
  const [index, setIndex] = useState(initialIndex);

  return (
    <ModalPortal
      isShow={isShow}
      onClose={onClose}
      blockWindowScroll
      className={styles.wrapper}
      overlayClassName={styles.overlay}
    >
      <Header index={index} totalCount={images.length} onClose={onClose} />
      <Suspense fallback={<LoadingCarousel />}>
        <Carousel images={images} initialIndex={initialIndex} setIndex={setIndex} />
      </Suspense>
    </ModalPortal>
  );
};

export default ImageModal;
