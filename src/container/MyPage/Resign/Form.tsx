"use client";

import { ChangeEventHandler, useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { Button, Checkbox, Loading } from "@/components";
import { usePopConfirm, useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getErrorMessage } from "@/services/apiClient";
import { resignApi } from "@/services/user";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();
  const { onLogout } = useMe();
  const { replace } = useRouter();
  const { openPopConfirm } = usePopConfirm();
  const { mutate: resign } = useMutation(resignApi, {
    onSuccess: () => {
      onLogout();
      replace("/my-page/resign/complete");
      setIsLoading(false);
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "탈퇴에 실패하였습니다.") });
      setIsLoading(false);
    },
  });

  const [checked, setChecked] = useState(false);

  const onClick = () => {
    openPopConfirm({
      title: "탈퇴하시겠어요?",
      description: "탈퇴 시 프로필 정보, 예약 내역 등의 모든 정보가 삭제되며 이후 복구가 불가능합니다.",
      onConfirm: () => {
        setIsLoading(true);
        resign();
      },
    });
  };

  const onChangeCheckbox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    setChecked(checked);
  };

  return (
    <>
      <Checkbox isGray onChange={onChangeCheckbox}>
        위의 안내사항을 숙지했으며 이에 동의합니다.
      </Checkbox>
      <footer className={styles.footer}>
        <Button type="button" color="secondary" full>
          더 써볼래요
        </Button>
        <Button type="button" color="primary" full onClick={onClick} disabled={!checked}>
          탈퇴
        </Button>
      </footer>
      <Loading isShow={isLoading} />
    </>
  );
};

export default Form;
