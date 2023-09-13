"use client";

import { ChangeEventHandler, FormEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { BaseBottomSheet, Button, UnderlinedInput } from "@/components/Common";
import { useMe } from "@/hooks/queries";
import { updateMeApi } from "@/services/user";

import styles from "./myBirthBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

// TODO: 로직 입력
const MyBirthBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMeApi);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  if (!me) return null;

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      title="생년월일 입력"
      isHeightMax
      className={styles.wrapper}
      blockWindowScroll
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={onSubmit}>
        <UnderlinedInput label="생년월일" placeholder="YYYYMMDD" wrapperClassName={styles.inputWrapper} />
        <Button type="submit" color="primary" full>
          저장
        </Button>
      </form>
    </BaseBottomSheet>
  );
};

export default MyBirthBottomSheet;
