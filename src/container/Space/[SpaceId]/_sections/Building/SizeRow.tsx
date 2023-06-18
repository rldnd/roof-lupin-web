"use client";

import { useState } from "react";

import type { Size } from "@/common/types/size";
import { getSquareMeterFromSquareFeet } from "@/utils/size";

import { IconRepeat } from "public/icons";

import styles from "./sizeRow.module.scss";

const getSize = (squareFeet: number, isSquareFeet: boolean) => {
  if (isSquareFeet) return `${squareFeet}평`;
  else return `${getSquareMeterFromSquareFeet(squareFeet).toFixed(2)}m²`;
};

interface Props {
  sizes: Size[];
}

const SizeRow: React.FC<Props> = ({ sizes }) => {
  const [isSquareFeet, setIsSquareFeet] = useState(true);

  const hasOneSize = sizes.length === 1;
  const floorAndSize = sizes.reduce<Array<[string, number]>>((acc, cur) => {
    return [...acc, [cur.floor, cur.size]];
  }, []);

  return (
    <li className={styles.wrapper}>
      {hasOneSize && <span>{getSize(sizes[0].size, isSquareFeet)}</span>}
      {!hasOneSize &&
        floorAndSize.map(([floor, size]) => (
          <span key={floor} className={styles.multiFloor}>
            <span className={styles.floor}>{floor}</span>
            <span className={styles.size}>{getSize(size, isSquareFeet)}</span>
          </span>
        ))}
      <button type="button" onClick={() => setIsSquareFeet((prev) => !prev)}>
        <IconRepeat />
        {isSquareFeet ? "m²" : "평"}
      </button>
    </li>
  );
};

export default SizeRow;
