"use client";

import { type ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { BaseBottomSheet, Button, UnderlinedInput } from "@/components/Common";
import { useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getErrorMessage } from "@/services/apiClient";
import { updateMeApi } from "@/services/user";

import styles from "./myNicknameBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

const MyNicknameBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { addToast } = useToast();
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMeApi, {
    onSuccess: () => {
      refetchMe();
      onClose();
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "닉네임 수정에 실패하였습니다.") });
    },
  });
  const [input, setInput] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ nickname: input });
  };

  useEffect(() => {
    if (isShow && me?.nickname) setInput(me.nickname);
    if (!isShow) setInput("");
  }, [isShow, me?.nickname]);

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      title="닉네임 수정"
      isHeightMax
      className={styles.wrapper}
      blockWindowScroll
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={onSubmit}>
        <UnderlinedInput
          label="닉네임"
          onChange={onChange}
          placeholder="닉네임"
          value={input}
          wrapperClassName={styles.inputWrapper}
        />
        <Button type="submit" color="primary" full>
          저장
        </Button>
      </form>
    </BaseBottomSheet>
  );
};

export default MyNicknameBottomSheet;
