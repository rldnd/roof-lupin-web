"use client";

import { useState } from "react";

import type { Size } from "@/common/types/size";

import { IconRepeat } from "public/icons";

import SizeRow from "./SizeRow";

import styles from "./sizes.module.scss";

export interface FloorSize {
  floor: number;
  sizes: Array<Pick<Size, "isRoof" | "size">>;
}

interface Props {
  sizes: Size[];
}

const Sizes: React.FC<Props> = ({ sizes }) => {
  const [isSquareFeet, setIsSquareFeet] = useState(false);

  const floorSizes = sizes.reduce<FloorSize[]>((acc, cur) => {
    const floorSize = acc.find((floorSize) => floorSize.floor === cur.floor);

    if (floorSize) floorSize.sizes.push({ isRoof: cur.isRoof, size: cur.size });
    else acc.push({ floor: cur.floor, sizes: [{ isRoof: cur.isRoof, size: cur.size }] });

    return acc;
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.sizeList}>
        {[...floorSizes]
          .sort((a, b) => b.floor - a.floor)
          .map((floorSize) => (
            <SizeRow key={floorSize.floor} floorSize={floorSize} isSquareFeet={isSquareFeet} />
          ))}
      </ul>
      <button type="button" onClick={() => setIsSquareFeet((prev) => !prev)} className={styles.toggleButton}>
        <IconRepeat />
        {isSquareFeet ? "m²" : "평"}
      </button>
    </div>
  );
};

export default Sizes;
