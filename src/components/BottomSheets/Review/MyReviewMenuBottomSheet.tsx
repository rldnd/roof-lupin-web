"use client";

import { BaseBottomSheet } from "@/components/Common";

import { NavigateMenuItem, SortMenu, SortMenuItem } from "../_shared";

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
        <NavigateMenuItem isActive={false} href={`/reviews/${reviewId}/edit-review`}>
          수정하기
        </NavigateMenuItem>
        <SortMenuItem isActive={false} onClick={onClickDelete}>
          삭제하기
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default MyReviewMenuBottomSheet;
