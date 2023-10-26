"use client";

import { useAtomValue } from "jotai";

import { INITIAL_LOCATION, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { useNaverMap } from "@/hooks";
import { currentPositionState } from "@/states";

import { IconCurrentPosition } from "public/icons";

import styles from "./currentPositionButton.module.scss";

const CurrentPositionButton: React.FC = () => {
  const currentPosition = useAtomValue(currentPositionState);
  const { moveCenter } = useNaverMap(LOCATION_PAGE_MAP_ID);

  const onClick = () => {
    moveCenter(currentPosition ?? INITIAL_LOCATION);
  };

  return (
    <button type="button" className={styles.wrapper} onClick={onClick}>
      <IconCurrentPosition />
    </button>
  );
};

export default CurrentPositionButton;
