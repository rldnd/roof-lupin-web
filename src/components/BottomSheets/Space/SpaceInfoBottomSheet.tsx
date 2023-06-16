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
    <BaseBottomSheet isShow={isShow} className={styles.wrapper} onClose={onClose} blockWindowScroll title="공간소개">
      <ul>
        {space.hashtags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <p>{space.description}</p>
    </BaseBottomSheet>
  );
};

export default SpaceInfoBottomSheet;
