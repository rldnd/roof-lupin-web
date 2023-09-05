"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ErrorDTO } from "@/common/types/common";
import { Button, UnderlinedInput } from "@/components";
import { useToast } from "@/hooks";
import { isAxiosError } from "@/services/apiClient";
import { createCouponApi } from "@/services/coupon";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const [code, setCode] = useState("");

  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createCouponApi, {
    onSuccess: () => {
      addToast({ message: "쿠폰이 등록되었어요." });
      queryClient.refetchQueries(["paginateCoupons"]);
      setCode("");
    },
    onError: (data) => {
      if (isAxiosError<ErrorDTO>(data)) {
        const status = data.response?.data.statusCode;
        if (status === 404) addToast({ message: "유효하지 않은 코드입니다.\n쿠폰코드를 다시 확인해주세요." });
        if (status === 409) addToast({ message: "이미 등록된 쿠폰코드입니다." });
      }
    },
  });

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
