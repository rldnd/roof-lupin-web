"use client";

import { FormEventHandler, MouseEventHandler, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import type { Gender } from "@/common/types/user";
import { BaseBottomSheet, Button } from "@/components/Common";
import { useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getErrorMessage } from "@/services/apiClient";
import { updateMeApi } from "@/services/user";

import styles from "./myGenderBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

const MyGenderBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const { addToast } = useToast();
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMeApi, {
    onSuccess: () => {
      refetchMe();
      onClose();
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "성별 수정에 실패하였습니다.") });
    },
  });

  const [gender, setGender] = useState<Gender | null>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const gender = e.currentTarget.title as Gender;
    setGender(gender);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (gender) mutate({ gender });
  };

  useEffect(() => {
    if (isShow && me?.gender) setGender(me?.gender);
    if (!isShow) setGender(null);
  }, [isShow, me]);

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      title="성별 수정"
      isHeightMax
      className={styles.wrapper}
      blockWindowScroll
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={onSubmit}>
        <menu className={styles.menu}>
          <li>
            <Button
              type="button"
              title="FEMALE"
              color={gender === "FEMALE" ? "secondary" : "bw"}
              full
              onClick={onClick}
            >
              여성
            </Button>
          </li>
          <li>
            <Button type="button" title="MALE" color={gender === "MALE" ? "secondary" : "bw"} full onClick={onClick}>
              남성
            </Button>
          </li>
        </menu>
        <Button type="submit" color="primary" full disabled={!gender}>
          저장
        </Button>
      </form>
    </BaseBottomSheet>
  );
};

export default MyGenderBottomSheet;
