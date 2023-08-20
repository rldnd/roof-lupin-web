import { difference } from "lodash-es";

import { ALL_DAY_LIST_KO, DAY_MAPPER, WEEK_DAY_LIST_KO, WEEKEND_DAY_LIST_KO } from "@/common/constants/day";
import { HOLIDAY_INTERVAL_MAPPER } from "@/common/constants/holiday";
import type { OpenHour } from "@/common/types/openHour";
import type { SpaceHoliday } from "@/common/types/space";
import { getTimeWithDay } from "@/utils/time";

import styles from "./openHourAndHoliday.module.scss";

interface Props {
  openHours: OpenHour[];
  holidays: SpaceHoliday[];
}

interface SameTimeOpenHour {
  [time: string]: string[];
}

interface SameDayHoliday {
  [interval: number]: string[];
}

const getDaysToKorean = (days: string[]) => {
  const isAllDay = difference(ALL_DAY_LIST_KO, days).length === 0;
  const isWeekend = difference(WEEKEND_DAY_LIST_KO, days).length === 0;
  const isWeekday = difference(WEEK_DAY_LIST_KO, days).length === 0;

  if (isAllDay) return "매일";
  if (isWeekend && isWeekday) return "평일, 주말";
  if (isWeekend && !isWeekday) return `${difference(days, WEEKEND_DAY_LIST_KO).join(", ")}, 주말`;
  if (!isWeekend && isWeekday) return `평일, ${difference(days, WEEK_DAY_LIST_KO).join(", ")}`;
  return days.join(", ");
};

const OpenHourAndHoliday: React.FC<Props> = ({ openHours, holidays }) => {
  const sameTimeOpenHours = openHours.reduce<SameTimeOpenHour>((acc, cur) => {
    const time = `${getTimeWithDay(Number(cur.startAt))} ~ ${getTimeWithDay(Number(cur.endAt))}`;
    if (time in acc) return { ...acc, [time]: [...acc[time], DAY_MAPPER[cur.day]] };
    return { ...acc, [time]: [DAY_MAPPER[cur.day]] };
  }, {});

  const sameDayHolidays = holidays.reduce<SameDayHoliday>((acc, cur) => {
    if (cur.interval in acc) return { ...acc, [cur.interval]: [...acc[cur.interval], DAY_MAPPER[cur.day]] };
    return { ...acc, [cur.interval]: [DAY_MAPPER[cur.day]] };
  }, {});

  return (
    <section className={styles.wrapper}>
      <h2>영업 시간 및 휴무일</h2>
      <ul className={styles.openHours}>
        {Object.keys(sameTimeOpenHours).length > 0 && <h3>영업 시간</h3>}
        {Object.entries(sameTimeOpenHours).map(([time, days]) => (
          <li key={`${days.join(", ")} 영업시간`}>
            {getDaysToKorean(days)}
            <span className={styles.time}>{time}</span>
          </li>
        ))}
      </ul>
      {Object.keys(sameDayHolidays).length > 0 && <h3 className={styles.holidayTitle}>정기 휴무</h3>}
      <ul className={styles.holidays}>
        {Object.entries(sameDayHolidays).map(([interval, days]) => {
          return (
            <li key={`${interval}째 주 휴무`}>
              {HOLIDAY_INTERVAL_MAPPER[Number(interval) as keyof typeof HOLIDAY_INTERVAL_MAPPER]}
              <span className={styles.day}>{getDaysToKorean(days)}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OpenHourAndHoliday;
