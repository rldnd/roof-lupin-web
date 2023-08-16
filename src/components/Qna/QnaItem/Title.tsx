"use client";

import type { MouseEventHandler } from "react";

import { dayjs } from "@/utils/date";

import { IconThreeDotsLarge } from "public/icons";

import styles from "./title.module.scss";

interface Props {
  nickname: string;
  createdAt: Date;
  onClickSetting: MouseEventHandler<HTMLButtonElement>;
}

const Title: React.FC<Props> = ({ nickname, createdAt, onClickSetting }) => {
  const date = dayjs(createdAt).format("YYYY.MM.DD").slice(2);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        {nickname}
        <time dateTime={date}>{date}</time>
      </div>
      <button type="button" className={styles.settings} onClick={onClickSetting}>
        <IconThreeDotsLarge />
      </button>
    </div>
  );
};

export default Title;
