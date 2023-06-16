"use client";

import type { MouseEventHandler } from "react";

import type { SpaceDetail } from "@/common/types/space";
import { BottomSheetPortal } from "@/components/Common";

import { IconClose } from "public/icons";

import styles from "./spaceInfoBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  space: SpaceDetail;
}

const SpaceInfoBottomSheet: React.FC<Props> = ({ isShow, onClose, space }) => {
  return (
    <BottomSheetPortal isShow={isShow} className={styles.wrapper} onClose={onClose} blockWindowScroll>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <IconClose />
      </button>
      <main>
        <h1>{space.title}</h1>
        <ul>
          {space.hashtags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
        <p>{space.description}</p>
      </main>
    </BottomSheetPortal>
  );
};

export default SpaceInfoBottomSheet;
