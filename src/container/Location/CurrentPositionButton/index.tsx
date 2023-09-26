"use client";

import { INITIAL_LOCATION, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { useNaverMap } from "@/hooks";

import { IconCurrentPosition } from "public/icons";

import styles from "./currentPositionButton.module.scss";

const CurrentPositionButton: React.FC = () => {
  const { moveCenter } = useNaverMap(LOCATION_PAGE_MAP_ID);

  const onClick = () => {
    moveCenter(INITIAL_LOCATION);
  };

  return (
    <button type="button" className={styles.wrapper} onClick={onClick}>
      <IconCurrentPosition />
    </button>
  );
};

export default CurrentPositionButton;
