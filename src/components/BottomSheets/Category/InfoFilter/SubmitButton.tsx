"use client";

import { Button } from "@/components/Common";
import type { CategorySortMenuInfoFilter } from "@/states";
import { addHour, getNextDayText } from "@/utils/time";

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
          {getNextDayText(startAt)}
          {`${startAt}:00`} ~ {getNextDayText(addHour(endAt, 1))}
          {`${addHour(endAt, 1)}:00`}
        </>
      )}{" "}
      {userCount}명
    </Button>
  );
};

export default SubmitButton;
