"use client";

import type { CommonUser } from "@/common/types/user";
import { useSuspenseQuery } from "@/hooks";
import { getMeApi } from "@/services/user";

import styles from "./info.module.scss";

const Info: React.FC = () => {
  const { data: me } = useSuspenseQuery<CommonUser>(["getMe"], getMeApi, { refetchOnMount: true });

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <h1>
          {me?.nickname}님,
          <br />
          안녕하세요.
        </h1>
      </div>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
  return null;
};
