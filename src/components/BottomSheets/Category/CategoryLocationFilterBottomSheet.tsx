"use client";

import { type MouseEventHandler } from "react";

import { BaseBottomSheet } from "@/components/Common";

import { CheckMenu, CheckMenuItem } from "../_shared";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const CategorySortBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} title="지역 선택" blockWindowScroll>
      <CheckMenu>
        <CheckMenuItem>지역</CheckMenuItem>
        <CheckMenuItem>지역2</CheckMenuItem>
        <CheckMenuItem>지역3</CheckMenuItem>
      </CheckMenu>
    </BaseBottomSheet>
  );
};

export default CategorySortBottomSheet;
