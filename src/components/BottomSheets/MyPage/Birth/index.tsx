"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import type { CommonUser } from "@/common/types/user";
import { BaseBottomSheet, Button, UnderlinedInput } from "@/components/Common";
import { useMe } from "@/hooks/queries";
import { updateMeApi } from "@/services/user";
import { checkValidDate, dayjs } from "@/utils/date";
import { isNumberOnly } from "@/utils/regex";

import styles from "./myBirthBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

interface InputStatus {
  isValid: boolean;
  errorMessage: string;
}

const getInitialInput = (me: CommonUser) => {
  if (!me.birthYear || !me.birthDay) return "";
  return `${me.birthYear}${me.birthDay}`;
};

const getInputStatus = (value: string): InputStatus => {
  if (!isNumberOnly(value)) {
    return { isValid: false, errorMessage: "생년월일에는 숫자만 입력 가능해요." };
  }
  if (value.length < 8) {
    return { isValid: false, errorMessage: "" };
  }
  if (value.length > 8) {
    return { isValid: false, errorMessage: "올바른 형식으로 입력해주세요." };
  }
  if (value.length === 8) {
    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    if (!checkValidDate(`${year}-${month}-${day}`)) {
      return { isValid: false, errorMessage: "올바른 형식으로 입력해주세요." };
    }
    if (dayjs().isBefore(dayjs(value).add(14, "year"))) {
      return { isValid: false, errorMessage: "만 14세 이상부터 회원가입이 가능합니다." };
    }
  }
  return { isValid: true, errorMessage: "" };
};

// TODO: 로직 입력
const MyBirthBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMeApi);
  const [input, setInput] = useState(() => getInitialInput(me!));
  const [errorMessage, setErrorMessage] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setErrorMessage(getInputStatus(value).errorMessage);
    if (!isNumberOnly(value)) return;
    if (value.length > 8) return;
    setInput(value);
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
        <UnderlinedInput
          label="생년월일"
          inputMode="numeric"
          onChange={onChange}
          placeholder="YYYYMMDD"
          value={input}
          wrapperClassName={styles.inputWrapper}
          errorMessage={errorMessage}
        />
        <Button type="submit" color="primary" full disabled={!getInputStatus(input).isValid}>
          저장
        </Button>
      </form>
    </BaseBottomSheet>
  );
};

export default MyBirthBottomSheet;
