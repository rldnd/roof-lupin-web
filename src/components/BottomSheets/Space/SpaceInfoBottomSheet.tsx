"use client";

import type { MouseEventHandler } from "react";

import type { SpaceDetail } from "@/common/types/space";
import { BaseBottomSheet } from "@/components/Common";

import styles from "./spaceInfoBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  space: SpaceDetail;
}

const SpaceInfoBottomSheet: React.FC<Props> = ({ isShow, onClose, space }) => {
  return (
    <BaseBottomSheet
      isShow={isShow}
      wrapperClassName={styles.wrapper}
      className={styles.content}
      onClose={onClose}
      blockWindowScroll
      title={space.title}
    >
      <p>{space.description}</p>
    </BaseBottomSheet>
  );
};

export default SpaceInfoBottomSheet;
