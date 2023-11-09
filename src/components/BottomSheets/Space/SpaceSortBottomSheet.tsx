"use client";

import { type MouseEventHandler } from "react";

import { useAtom } from "jotai";

import { SPACE_SORT_MAPPER } from "@/common/constants/space";
import type { SpaceSort } from "@/common/types/space";
import { BaseBottomSheet } from "@/components/Common";
import { spaceSortMenuState } from "@/states";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const SpaceSortBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [spaceSortMenu, setSpaceSortMenu] = useAtom(spaceSortMenuState);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sort = e.currentTarget.dataset.sort as SpaceSort;
    setSpaceSortMenu((prev) => ({ ...prev, sort }));
    onClose(e);
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} title="정렬" blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={spaceSortMenu.sort === "RECENT"} onClick={onClick} data-sort="RECENT">
          {SPACE_SORT_MAPPER["RECENT"]}
        </SortMenuItem>
        <SortMenuItem isActive={spaceSortMenu.sort === "POPULARITY"} onClick={onClick} data-sort="POPULARITY">
          {SPACE_SORT_MAPPER["POPULARITY"]}
        </SortMenuItem>
        <SortMenuItem isActive={spaceSortMenu.sort === "PRICE_HIGH"} onClick={onClick} data-sort="PRICE_HIGH">
          {SPACE_SORT_MAPPER["PRICE_HIGH"]}
        </SortMenuItem>
        <SortMenuItem isActive={spaceSortMenu.sort === "PRICE_LOW"} onClick={onClick} data-sort="PRICE_LOW">
          {SPACE_SORT_MAPPER["PRICE_LOW"]}
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default SpaceSortBottomSheet;
