"use client";

import { type FormEventHandler, Suspense, useState } from "react";

import { useAtom } from "jotai";

import { BaseBottomSheet, Button } from "@/components/Common";
import { spaceSortMenuState } from "@/states";

import Content, { LoadingContent } from "./Content";

import styles from "./spaceLocationFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const SpaceLocationFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [spaceSortMenu, setSpaceSortMenu] = useAtom(spaceSortMenuState);
  const [locationFilterTopicIds, setLocationFilterTopicIds] = useState(spaceSortMenu.locationFilterTopicIds);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSpaceSortMenu((prev) => ({ ...prev, locationFilterTopicIds }));
    onClose();
  };

  return (
    <BaseBottomSheet
      isHeightMax
      isShow={isShow}
      onClose={onClose}
      title="지역 선택"
      blockWindowScroll
      className={styles.wrapper}
    >
      <form onSubmit={onSubmit}>
        <Suspense fallback={<LoadingContent />}>
          <Content
            locationFilterTopicIds={locationFilterTopicIds}
            setLocationFilterTopicIds={setLocationFilterTopicIds}
          />
        </Suspense>
        <footer className={styles.footer}>
          <Button type="submit" color="primary" full>
            적용하기
          </Button>
        </footer>
      </form>
    </BaseBottomSheet>
  );
};

export default SpaceLocationFilterBottomSheet;
