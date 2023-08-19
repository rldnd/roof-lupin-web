"use client";

import { BaseBottomSheet } from "@/components/Common";

import { NavigateMenuItem, SortMenu } from "../_shared";

interface Props {
  qnaId: string;
  isShow: boolean;
  onClose(): void;
}

const OtherQnaMenuBottomSheet: React.FC<Props> = ({ qnaId, isShow, onClose }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <NavigateMenuItem href={`/qnas/${qnaId}/reports`} isActive={false}>
          후기 신고
        </NavigateMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default OtherQnaMenuBottomSheet;
