"use client";

import { useState } from "react";

import type { SpaceDetail } from "@/common/types/space";
import { ArrowButton } from "@/components";
import { SpaceInfoBottomSheet } from "@/components/BottomSheets/Space";

interface Props {
  space: SpaceDetail;
}

const IntroductionMoreButton: React.FC<Props> = ({ space }) => {
  const [isShowIntroSheet, setIsShowIntroSheet] = useState(false);

  return (
    <>
      <ArrowButton direction="right" color="primary" onClick={() => setIsShowIntroSheet(true)}>
        더보기
      </ArrowButton>
      <SpaceInfoBottomSheet isShow={isShowIntroSheet} onClose={() => setIsShowIntroSheet(false)} space={space} />
    </>
  );
};

export default IntroductionMoreButton;
