"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import type { PossibleRentalTypes } from "@/common/types/rentalType";
import { Button } from "@/components/Common";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import { dayjs } from "@/utils/date";

import styles from "./submitButton.module.scss";

interface Props {
  year: number;
  month: number;
  day: number;
  userCount: number;
}

const SubmitButton: React.FC<Props> = ({ year, month, day, userCount }) => {
  const { spaceId } = useParams();
  const { isLogined } = useMe();
  const [todayYear, todayMonth, todayDate] = [dayjs().year(), dayjs().month() + 1, dayjs().date()];

  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", spaceId, todayYear, todayMonth, todayDate],
    () =>
      getSpaceRentalTypePossibleApi({
        spaceId,
        year: todayYear,
        month: todayMonth,
        day: todayDate,
      }),
    {
      enabled: isLogined,
    },
  );

  const disabled = useMemo<boolean>(
    () =>
      year === todayYear &&
      month === todayMonth &&
      day === todayDate &&
      !rentalTypes?.time &&
      (!Array.isArray(rentalTypes?.package) || rentalTypes.package.length === 0),
    [day, month, rentalTypes.package, rentalTypes?.time, todayDate, todayMonth, todayYear, year],
  );

  return (
    <Button type="submit" color="primary" className={styles.wrapper} disabled={disabled}>
      {year}년 {month}월 {day}일, {userCount}명
    </Button>
  );
};

export default SubmitButton;
