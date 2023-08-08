import { DAY_MAPPER } from "@/common/constants/day";
import { HOLIDAY_INTERVAL_MAPPER } from "@/common/constants/holiday";
import type { OpenHour } from "@/common/types/openHour";
import type { SpaceHoliday } from "@/common/types/space";
import { getNextDayText } from "@/utils/time";

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

const OpenHourAndHoliday: React.FC<Props> = ({ openHours, holidays }) => {
  const sameTimeOpenHours = openHours.reduce<SameTimeOpenHour>((acc, cur) => {
    const endAt = `${getNextDayText(Number(cur.endAt))}${cur.endAt}:00`;
    const time = `${cur.startAt}:00 ~ ${endAt}:00`;
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
        {Object.entries(sameTimeOpenHours).map(([time, days]) => {
          if (days.length === 7)
            return (
              <li key="매일 영업시간">
                매일 <span className={styles.time}>{time}</span>
              </li>
            );
          return (
            <li key={`${days.join(", ")} 영업시간`}>
              {days.join(", ")}
              <span className={styles.time}>{time}</span>
            </li>
          );
        })}
      </ul>
      {Object.keys(sameDayHolidays).length > 0 && <h3 className={styles.holidayTitle}>정기 휴무</h3>}
      <ul className={styles.holidays}>
        {Object.entries(sameDayHolidays).map(([interval, days]) => (
          <li key={`${days.join(",")} 휴무`}>
            {HOLIDAY_INTERVAL_MAPPER[Number(interval) as keyof typeof HOLIDAY_INTERVAL_MAPPER]}
            <span className={styles.day}>{days.join(", ")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OpenHourAndHoliday;
