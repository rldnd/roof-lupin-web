"use client";

import { useRouter } from "next/navigation";

import { BaseBottomSheet } from "@/components/Common";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  reviewId: string;
  isShow: boolean;
  onClose(): void;
}

const OtherReviewMenuBottomSheet: React.FC<Props> = ({ reviewId, isShow, onClose }) => {
  const { push } = useRouter();

  const onClick = () => {
    push(`/reviews/${reviewId}/reports`);
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={false} onClick={onClick}>
          후기 신고
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default OtherReviewMenuBottomSheet;
