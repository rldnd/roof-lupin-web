"use client";

import type { FloorSize } from "./Sizes";
import { getSquareMeterFromSquareFeet } from "@/utils/size";

import { IconFloor } from "public/icons";

import styles from "./sizeRow.module.scss";

const getSize = (squareFeet: number, isSquareFeet: boolean) => {
  if (isSquareFeet) return `${squareFeet}평`;
  else return `${getSquareMeterFromSquareFeet(squareFeet).toFixed(2)}m²`;
};

interface Props {
  isSquareFeet: boolean;
  floorSize: FloorSize;
}

const SizeRow: React.FC<Props> = ({ floorSize, isSquareFeet }) => {
  const hasOneSize = floorSize.sizes.length === 1;
  const labelAndSize = floorSize.sizes.reduce<Array<[string, number]>>((acc, cur) => {
    const isRoof = cur.isRoof;
    const isRoofTopRoom = !hasOneSize && !cur.isRoof;
    const isInside = hasOneSize && !cur.isRoof;
    const label = isRoof ? "옥상" : isRoofTopRoom ? "옥탑방" : isInside ? "실내" : "";

    return [...acc, [label, cur.size]];
  }, []);

  return (
    <li className={styles.wrapper}>
      {hasOneSize && (
        <>
          <div className={styles.iconWrapper}>
            <IconFloor className={styles.icon} />
            <span className={styles.floor}>{floorSize.floor}</span>
          </div>
          <span className={styles.space}>
            <span className={styles.label}>{labelAndSize[0][0]}</span>
            <span className={styles.size}>{getSize(labelAndSize[0][1], isSquareFeet)}</span>
          </span>
        </>
      )}
      {!hasOneSize && (
        <>
          <div className={styles.iconWrapper}>
            <IconFloor className={styles.icon} />
            <span className={styles.floor}>{floorSize.floor}</span>
          </div>
          {labelAndSize.map(([label, size]) => (
            <span key={label} className={styles.multiSpace}>
              <span className={styles.label}>{label}</span>
              <span className={styles.size}>{getSize(size, isSquareFeet)}</span>
            </span>
          ))}
        </>
      )}
    </li>
  );
};

export default SizeRow;
