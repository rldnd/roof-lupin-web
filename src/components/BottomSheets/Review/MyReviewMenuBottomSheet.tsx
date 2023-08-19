"use client";

import { BaseBottomSheet } from "@/components/Common";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  isShow: boolean;
  onClose(): void;
}

const MyReviewMenuBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={false}>수정하기</SortMenuItem>
        <SortMenuItem isActive={false}>삭제하기</SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default MyReviewMenuBottomSheet;
