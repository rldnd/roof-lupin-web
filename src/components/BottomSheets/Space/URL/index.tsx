"use client";

import { usePathname } from "next/navigation";

import { BaseBottomSheet, Button } from "@/components/Common";
import { DataItem, DataList } from "@/components/Data";
import { useToast } from "@/hooks";

import styles from "./spaceURLBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

const SpaceURLBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { addToast } = useToast();
  const pathname = usePathname();
  const url = process.env.NEXT_PUBLIC_API_LOCAL_URL + pathname;

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({ message: "URL을 복사하였습니다." });
      onClose();
    } catch (err) {
      addToast({ message: "URL 복사에 실패했습니다." });
    }
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} blockWindowScroll hideHeader className={styles.wrapper}>
      <DataList>
        <DataItem label="URL" ddClassName={styles.url}>
          {url}
        </DataItem>
      </DataList>
      <Button type="button" color="primary" full className={styles.button} onClick={onClick}>
        URL 복사하기
      </Button>
    </BaseBottomSheet>
  );
};

export default SpaceURLBottomSheet;
