"use client";

import { type MouseEventHandler, startTransition } from "react";

import { useAtom } from "jotai";

import { SPACE_SORT_MAPPER } from "@/common/constants/space";
import type { SpaceSort } from "@/common/types/space";
import { BaseBottomSheet } from "@/components/Common";
import { type CategorySortMenu, categorySortMenuState } from "@/states";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const CategorySortBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [categorySortMenu, setCategorySortMenu] = useAtom(categorySortMenuState);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sort = e.currentTarget.dataset.sort as SpaceSort;

    startTransition(() => {
      setCategorySortMenu((prev: CategorySortMenu) => ({ ...prev, sort }));
    });

    onClose(e);
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} title="정렬" blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={categorySortMenu.sort === "POPULARITY"} onClick={onClick} data-sort="POPULARITY">
          {SPACE_SORT_MAPPER["POPULARITY"]}
        </SortMenuItem>
        <SortMenuItem isActive={categorySortMenu.sort === "PRICE_HIGH"} onClick={onClick} data-sort="PRICE_HIGH">
          {SPACE_SORT_MAPPER["PRICE_HIGH"]}
        </SortMenuItem>
        <SortMenuItem isActive={categorySortMenu.sort === "PRICE_LOW"} onClick={onClick} data-sort="PRICE_LOW">
          {SPACE_SORT_MAPPER["PRICE_LOW"]}
        </SortMenuItem>
        <SortMenuItem isActive={categorySortMenu.sort === "RECENT"} onClick={onClick} data-sort="RECENT">
          {SPACE_SORT_MAPPER["RECENT"]}
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default CategorySortBottomSheet;
