"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { ErrorDTO } from "@/common/types/common";
import { Button, UnderlinedInput } from "@/components";
import { useToast } from "@/hooks";
import { isAxiosError } from "@/services/apiClient";
import { createCouponApi } from "@/services/coupon";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { addToast } = useToast();
  const { mutate } = useMutation(createCouponApi, {
    onSuccess: () => {
      addToast({ message: "쿠폰이 등록되었습니다." });
    },
    onError: (data) => {
      if (isAxiosError<ErrorDTO>(data)) {
        addToast({ message: data.response?.data.message ?? "" });
      }
    },
  });

  const [code, setCode] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(code);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <UnderlinedInput
        label="쿠폰 등록"
        placeholder="코드를 입력해주세요"
        onChange={onChange}
        value={code}
        wrapperClassName={styles.inputWrapper}
      />
      <Button color="primary" size="small" type="submit">
        등록
      </Button>
    </form>
  );
};

export default Form;
