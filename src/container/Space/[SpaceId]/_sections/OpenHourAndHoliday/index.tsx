import type { Day } from "@/common/types/common";
import type { OpenHour } from "@/common/types/openHour";
import type { SpaceHoliday } from "@/common/types/space";

import styles from "./openHourAndHoliday.module.scss";

interface Props {
  openHours: OpenHour[];
  holidays: SpaceHoliday[];
}

interface SameTimeOpenHour {
  [time: string]: Day[];
}

interface SameDayHoliday {
  [interval: string]: Day[];
}

const OpenHourAndHoliday: React.FC<Props> = ({ openHours, holidays }) => {
  console.log({ openHours, holidays });

  const sameTimeOpenHours = openHours.reduce<SameTimeOpenHour>((acc, cur) => {
    const endAt = Number(cur.endAt) < 9 ? `익일 ${cur.endAt}:00` : `${cur.endAt}:00`;
    const time = `${cur.startAt}:00 ~ ${endAt}`;
    if (time in acc) return { ...acc, [time]: [...acc[time], cur.day] };
    return { ...acc, [time]: [cur.day] };
  }, {});

  const sameDayHolidays = holidays.reduce<SameDayHoliday>((acc, cur) => {
    if (cur.interval in acc) return { ...acc, [cur.interval]: [...acc[cur.interval], cur.day] };
    return { ...acc, [cur.interval]: [cur.day] };
  }, {});

  return (
    <section className={styles.wrapper}>
      <h2>영업 시간 및 휴무일</h2>
      {/* <ul>
        {Object.entries(sameTimeOpenHours).map(([time, days]) => {
          if (days.length === 7) return <li key="매일 영업시간">매일 {time}</li>;
          return (
            <li key={`${days.join(",")} 영업시간`}>
              {days.join(",")} {time}
            </li>
          );
        })}
        {Object.entries(sameDayHolidays).map(([interval, days]) => (
          <li key={`${days.join(",")} 휴무`}></li>
        ))}
      </ul> */}
    </section>
  );
};

export default OpenHourAndHoliday;
