"use client";

import type { MouseEventHandler } from "react";

import type { SpaceDetail } from "@/common/types/space";
import { BaseBottomSheet, Tag } from "@/components/Common";

import styles from "./spaceInfoBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  space: SpaceDetail;
}

const SpaceInfoBottomSheet: React.FC<Props> = ({ isShow, onClose, space }) => {
  return (
    <BaseBottomSheet isShow={isShow} className={styles.wrapper} onClose={onClose} blockWindowScroll title={space.title}>
      <ul>
        {space.hashtags.map((tag) => (
          <li key={tag.id}>
            <Tag size="big" type="bw">
              {tag.name}
            </Tag>
          </li>
        ))}
      </ul>
      <p>{space.description}</p>
    </BaseBottomSheet>
  );
};

export default SpaceInfoBottomSheet;
