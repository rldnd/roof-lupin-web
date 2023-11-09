"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import cx from "clsx";
import { useAtomValue } from "jotai";
import { isBoolean } from "lodash-es";

import { SPACE_SORT_MAPPER } from "@/common/constants/space";
import { SpaceDetailFilterBottomSheet, SpaceSortBottomSheet } from "@/components/BottomSheets/Space";
import { useScrollDirection } from "@/hooks";
import { spaceSortMenuState } from "@/states";

import { IconBottomCaret, IconFilter } from "public/icons";

import styles from "./filter.module.scss";

const TagList = dynamic(() => import("./TagList"), { ssr: false });

const Filter: React.FC = () => {
  const scrollDirection = useScrollDirection();

  const spaceSortMenu = useAtomValue(spaceSortMenuState);
  const [isShowSpaceSortBottomSheet, setIsShowSpaceSortBottomSheet] = useState(false);
  const [isShowSpaceDetailBottomSheet, setIsShowSpaceDetailBottomSheet] = useState(false);

  const isFilterActive = isBoolean(spaceSortMenu.isImmediateReservation) || Boolean(spaceSortMenu.serviceIds);

  return (
    <>
      <section className={cx(styles.wrapper, styles[scrollDirection])}>
        <TagList />
        <menu className={styles.menu}>
          <li>
            <button
              type="button"
              className={cx(styles.filterButton, { [styles.active]: isFilterActive })}
              onClick={() => setIsShowSpaceDetailBottomSheet(true)}
            >
              <IconFilter />
              필터
            </button>
          </li>
          <li>
            <button type="button" className={styles.sortButton} onClick={() => setIsShowSpaceSortBottomSheet(true)}>
              {SPACE_SORT_MAPPER[spaceSortMenu.sort]}
              <IconBottomCaret />
            </button>
          </li>
        </menu>
      </section>
      <SpaceSortBottomSheet isShow={isShowSpaceSortBottomSheet} onClose={() => setIsShowSpaceSortBottomSheet(false)} />
      <SpaceDetailFilterBottomSheet
        isShow={isShowSpaceDetailBottomSheet}
        onClose={() => setIsShowSpaceDetailBottomSheet(false)}
      />
    </>
  );
};

export default Filter;
