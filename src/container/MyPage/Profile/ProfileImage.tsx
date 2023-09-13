"use client";

import type { ChangeEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getErrorMessage } from "@/services/apiClient";
import { uploadImageApi } from "@/services/file";
import { updateMeApi } from "@/services/user";

import { IconEdit } from "public/icons/myPage";

import styles from "./profileImage.module.scss";

const ProfileImage: React.FC = () => {
  const { addToast } = useToast();
  const { me, refetchMe } = useMe();

  const { mutate: updateMe } = useMutation(updateMeApi, {
    onSuccess: () => {
      addToast({ message: "프로필 이미지가 변경되었습니다" });
      refetchMe();
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "프로필 이미지 변경을 실패하였습니다") });
    },
  });

  const { mutate } = useMutation(uploadImageApi, {
    onSuccess: ({ data }) => {
      const { url } = data;
      updateMe({ profileImage: url });
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "이미지 업로드에 실패하였습니다") });
    },
  });

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    if (!files || Array.from(files).length === 0) return;
    const file = Array.from(files)[0];
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  return (
    <label className={styles.wrapper}>
      {me?.profileImage && <img src={me.profileImage} alt="프로필 이미지" className={styles.image} />}
      {!me?.profileImage && <div className={styles.image} />}
      <div className={styles.editWrapper}>
        <IconEdit />
      </div>
      <input type="file" accept="image/*" onChange={onChangeFile} hidden />
    </label>
  );
};

export default ProfileImage;

export const LoadingProfileImage: React.FC = () => {
  return null;
};
