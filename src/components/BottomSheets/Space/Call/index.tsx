"use client";

import { BaseBottomSheet, Button } from "@/components/Common";
import { DataItem, DataList } from "@/components/Data";
import { useToast } from "@/hooks";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import styles from "./spaceCallBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
  phoneNumber: string;
}

const SpaceCallBottomSheet: React.FC<Props> = ({ isShow, onClose, phoneNumber }) => {
  const { addToast } = useToast();

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      addToast({ message: "연락처를 복사하였습니다." });
      onClose();
    } catch (err) {
      addToast({ message: "연락처 복사에 실패했습니다." });
    }
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} blockWindowScroll hideHeader className={styles.wrapper}>
      <DataList>
        <DataItem label="연락처" ddClassName={styles.phoneNumber}>
          {getPhoneNumberWithHyphen(phoneNumber)}
        </DataItem>
      </DataList>
      <Button type="button" color="primary" full className={styles.button} onClick={onClick}>
        연락처 복사하기
      </Button>
    </BaseBottomSheet>
  );
};

export default SpaceCallBottomSheet;
