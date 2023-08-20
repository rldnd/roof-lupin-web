"use client";

import { Button } from "@/components/Common";
import type { SpaceSortMenuInfoFilter } from "@/states";
import { getTimeWithDay } from "@/utils/time";

import styles from "./submitButton.module.scss";

interface Props {
  localInfo: SpaceSortMenuInfoFilter;
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
          {getTimeWithDay(startAt)} ~ {getTimeWithDay(endAt + 1)}
        </>
      )}{" "}
      {userCount}명
    </Button>
  );
};

export default SubmitButton;
