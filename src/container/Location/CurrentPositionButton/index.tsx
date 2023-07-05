"use client";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { useNaverMap } from "@/hooks";

import { IconCurrentPosition } from "public/icons";

import styles from "./currentPositionButton.module.scss";

const CurrentPositionButton: React.FC = () => {
  const { moveCenter } = useNaverMap(LOCATION_PAGE_MAP_ID);

  const onClick = () => {
    moveCenter({ lat: "37.3595704", lng: "127.105399" });
  };

  return (
    <button type="button" className={styles.wrapper} onClick={onClick}>
      <IconCurrentPosition />
    </button>
  );
};

export default CurrentPositionButton;
