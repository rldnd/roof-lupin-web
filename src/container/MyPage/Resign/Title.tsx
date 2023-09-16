"use client";

import Skeleton from "react-loading-skeleton";

import { useMe } from "@/hooks/queries";

import styles from "./title.module.scss";

const Title: React.FC = () => {
  const { me } = useMe();

  return <h1 className={styles.wrapper}>{me?.nickname}님, 탈퇴하면 아래 정보가 삭제됩니다.</h1>;
};

export default Title;

export const LoadingTitle: React.FC = () => {
  return <Skeleton containerClassName={styles.wrapper} width={200} />;
};
