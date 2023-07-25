"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states/reservation";
import { dayjs } from "@/utils/date";
import { getDiffHour } from "@/utils/time";

import { DataItem, DataList } from "../Data";

import styles from "./selectedReservationInfo.module.scss";

const SelectedReservationInfo: React.FC = () => {
  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);

  const { year, month, day, userCount } = useAtomValue(reservationState);
  const date = dayjs(`${year}-${month}-${day}`).format("YYYY년 MM월 DD일 (ddd)");
  const hasCountServices = Object.values(additionalServices).flatMap((services) =>
    services.filter((service) => service.count !== 0),
  );

  return (
    <>
      <h1 className={styles.title}>{data.title}</h1>
      <section className={styles.wrapper}>
        <DataList>
          <DataItem label="날짜">
            <time dateTime={date}>{date}</time>
          </DataItem>
          <DataItem label="인원">{userCount}명</DataItem>
          <DataItem label="상품 및 부가서비스">
            {time.startAt && time.endAt && (
              <>
                시간 단위 예약 ({time.startAt}-{time.endAt}시, {getDiffHour(time.startAt, time.endAt)}시간)
              </>
            )}
            {packages.map((item) => (
              <>
                {item.name} ({item.startAt}-{item.endAt}시)
              </>
            ))}
            {hasCountServices.length > 0 && (
              <>
                <br />
                부가서비스: {hasCountServices.map((item) => item.name).join(",")}
              </>
            )}
          </DataItem>
        </DataList>
      </section>
    </>
  );
};

export default SelectedReservationInfo;

export const LoadingSelectedReservationInfo: React.FC = () => {
  return <></>;
};