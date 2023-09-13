"use client";

import type { ChangeEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { useMe } from "@/hooks/queries";
import { uploadImageApi } from "@/services/file";

import { IconEdit } from "public/icons/myPage";

import styles from "./profileImage.module.scss";

const ProfileImage: React.FC = () => {
  const { me } = useMe();
  const { mutate } = useMutation(uploadImageApi);

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    if (!files || Array.from(files).length === 0) return;
    const file = Array.from(files)[0];
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
