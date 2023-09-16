"use client";

import { Button, Checkbox } from "@/components";
import { usePopConfirm, useToast } from "@/hooks";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { openPopConfirm } = usePopConfirm();
  const onClick = () => {
    openPopConfirm({
      title: "탈퇴하시겠습니까?",
      description: "안내사항 숙지 완료했음?",
      onConfirm: () => {},
    });
  };

  return (
    <>
      <Checkbox isGray>위의 안내사항을 숙지했으며 이에 동의합니다.</Checkbox>
      <footer className={styles.footer}>
        <Button type="button" color="secondary" full>
          더 써볼래요
        </Button>
        <Button type="button" color="primary" full onClick={onClick} disabled>
          탈퇴
        </Button>
      </footer>
    </>
  );
};

export default Form;
