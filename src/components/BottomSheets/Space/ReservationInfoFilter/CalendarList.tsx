"use client";

import type { MouseEventHandler } from "react";

import { useParams } from "next/navigation";

import cx from "clsx";

import type { PossibleRentalTypesByMonth } from "@/common/types/rentalType";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpaceRentalTypePossibleMonthApi } from "@/services/rentalType";
import { dayjs } from "@/utils/date";

import { MonthCalendar } from "../../_shared";
import { type ActiveDate, LoadingMonthCalendar } from "../../_shared/Calendar/MonthCalendar";

import styles from "./calendarList.module.scss";

const CALENDAR_ID = "SPACE_RESERVATION_INFO_FILTER_BOTTOM_SHEET_CALENDAR_ID";
const $root = document.getElementById(CALENDAR_ID) as HTMLUListElement;

interface Props {
  activeDate: ActiveDate;
  onClickDay: (year: string, month: string, day: string) => MouseEventHandler<HTMLButtonElement>;
}

const CalendarList: React.FC<Props> = ({ activeDate, onClickDay }) => {
  const { spaceId } = useParams();

  const { fetchNextPage, isFetching, isSuccess, data, hasNextPage } =
    useSuspenseInfiniteQuery<PossibleRentalTypesByMonth>(
      ["paginateSpaceRentalTypePossibleMonth"],
      ({ pageParam = 1 }) =>
        paginateSpaceRentalTypePossibleMonthApi({
          limit: 1,
          maxSize: 6,
          page: pageParam,
          startYear: String(dayjs().year()),
          startMonth: String(dayjs().month() + 1),
          spaceId,
        }),
    );

  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      hasNextPage={hasNextPage}
      className={cx(styles.content, styles.calendarWrapper)}
      id={CALENDAR_ID}
      root={$root}
    >
      {data.pages.map((page) => (
        <MonthCalendar
          key={`${page.year}-${page.month}`}
          month={page.month}
          year={page.year}
          activeDate={activeDate}
          infos={page.days}
          onClickDay={onClickDay}
        />
      ))}
      {isFetching && <LoadingMonthCalendar />}
    </InfiniteScroll>
  );
};

export default CalendarList;