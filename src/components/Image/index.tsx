/* eslint-disable jsx-a11y/alt-text */
"use client";

import { type ComponentProps, memo, useState } from "react";

import type { ImageDTO } from "@/common/types/common";

import ImageModal from "../Modals/Image";

interface Props extends Omit<ComponentProps<"img">, "onClick"> {
  images: ImageDTO[];
  initialIndex?: number;
}

const Image: React.FC<Props> = ({ images, initialIndex = 0, ...props }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsShowModal(true)} aria-label="사진 자세히 보기">
        <img {...props} />
      </button>
      <ImageModal
        isShow={isShowModal}
        onClose={() => setIsShowModal(false)}
        images={images}
        initialIndex={initialIndex}
      />
    </>
  );
};

export default memo(Image);
