"use client";

import { BaseBottomSheet } from "@/components/Common";

import { NavigateMenuItem, SortMenu } from "../_shared";

interface Props {
  reviewId: string;
  isShow: boolean;
  onClose(): void;
}

const OtherReviewMenuBottomSheet: React.FC<Props> = ({ reviewId, isShow, onClose }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <NavigateMenuItem href={`/reviews/${reviewId}/reports`} isActive={false}>
          후기 신고
        </NavigateMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default OtherReviewMenuBottomSheet;
