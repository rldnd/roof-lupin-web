"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import type { PossibleRentalTypes } from "@/common/types/rentalType";
import { TimePicker } from "@/components";
import MenuItem from "@/components/MenuItem";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import { reservationState } from "@/states/reservation";

import styles from "./timeAndPackage.module.scss";

const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();
  const { isLogined } = useMe();
  const { year, month, day } = useAtomValue(reservationState);

  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year: year!, month: month!, day: day! }),
    {
      enabled: Boolean(year) && Boolean(month) && Boolean(day) && isLogined,
    },
  );

  return (
    <section className={styles.wrapper}>
      {rentalTypes?.time && (
        <>
          <div className={styles.titleWrapper}>
            <h2>
              시간 단위<small>최소 {rentalTypes?.time?.baseHour}시간 부터</small>
            </h2>
            <button type="button" className={styles.reset}>
              초기화
            </button>
          </div>
          <TimePicker infos={rentalTypes.time?.timeCostInfos} className={styles.timePicker} />
        </>
      )}
      {rentalTypes?.package?.length > 0 && (
        <>
          <h2>
            패키지<small>청소 보증금 100,000원 포함</small>
          </h2>
          <menu className={styles.packageMenu}>
            {rentalTypes.package.map((item) => (
              <li key={item.id}>
                <MenuItem checked={false} disabled={false} />
              </li>
            ))}
          </menu>
        </>
      )}
    </section>
  );
};

export default TimeAndPackage;

// TODO: loading component
