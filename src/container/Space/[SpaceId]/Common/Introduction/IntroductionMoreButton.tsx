"use client";

import { useState } from "react";

import cx from "clsx";

import type { SpaceDetail } from "@/common/types/space";
import { ArrowButton } from "@/components";
import { SpaceInfoBottomSheet } from "@/components/BottomSheets/Space";
import { useClientEffect } from "@/hooks";

import styles from "./introductionMoreButton.module.scss";

interface Props {
  space: SpaceDetail;
}

const IntroductionMoreButton: React.FC<Props> = ({ space }) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowIntroSheet, setIsShowIntroSheet] = useState(false);

  useClientEffect(() => {
    const $paragraph = document.getElementById("space-detail-description") as HTMLParagraphElement;
    if ($paragraph.scrollHeight !== $paragraph.offsetHeight) setIsShow(true);
  }, []);

  return (
    <>
      <span className={cx(styles.wrapper, { [styles.isShow]: isShow })}>
        <ArrowButton direction="right" color="primary" onClick={() => setIsShowIntroSheet(true)}>
          더보기
        </ArrowButton>
      </span>
      <SpaceInfoBottomSheet isShow={isShowIntroSheet} onClose={() => setIsShowIntroSheet(false)} space={space} />
    </>
  );
};

export default IntroductionMoreButton;
