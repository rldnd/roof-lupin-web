"use client";

import { BaseBottomSheet } from "@/components/Common";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  reviewId: string;
  isShow: boolean;
  onClose(): void;
  onClickDelete(): void;
}

const MyReviewMenuBottomSheet: React.FC<Props> = ({ isShow, onClose, onClickDelete, reviewId }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={false}>수정하기</SortMenuItem>
        <SortMenuItem isActive={false} onClick={onClickDelete}>
          삭제하기
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default MyReviewMenuBottomSheet;
