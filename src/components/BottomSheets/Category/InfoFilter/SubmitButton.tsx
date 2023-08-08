"use client";

import { Button } from "@/components/Common";
import type { CategorySortMenuInfoFilter } from "@/states";
import { isEndAtNextDay } from "@/utils/time";

import styles from "./submitButton.module.scss";

interface Props {
  localInfo: CategorySortMenuInfoFilter;
}

const SubmitButton: React.FC<Props> = ({ localInfo }) => {
  const { month, day, userCount, startAt, endAt } = localInfo;

  return (
    <Button
      type="submit"
      color="primary"
      className={styles.wrapper}
      disabled={typeof startAt === "number" && typeof endAt !== "number"}
    >
      {month}월 {day}일{" "}
      {typeof startAt === "number" && typeof endAt === "number" && (
        <>
          {isEndAtNextDay(endAt) && "익일 "}
          {`${startAt}:00`} ~ {isEndAtNextDay(endAt) && "익일 "}
          {`${endAt}:00`}
        </>
      )}{" "}
      {userCount}명
    </Button>
  );
};

export default SubmitButton;
