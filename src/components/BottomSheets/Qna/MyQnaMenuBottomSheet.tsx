"use client";

import { BaseBottomSheet } from "@/components/Common";

import { NavigateMenuItem, SortMenu, SortMenuItem } from "../_shared";

interface Props {
  qnaId: string;
  isShow: boolean;
  onClose(): void;
  onClickDelete(): void;
}

const MyQnaMenuBottomSheet: React.FC<Props> = ({ qnaId, isShow, onClose, onClickDelete }) => {
  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} hideHeader blockWindowScroll>
      <SortMenu>
        <NavigateMenuItem href={`/qnas/${qnaId}/edit-question`} isActive={false}>
          수정하기
        </NavigateMenuItem>
        <SortMenuItem isActive={false} onClick={onClickDelete}>
          삭제하기
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default MyQnaMenuBottomSheet;
