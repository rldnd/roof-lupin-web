"use client";

import { useParams, useSearchParams } from "next/navigation";

import Skeleton from "react-loading-skeleton";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";

import styles from "./spaceInfo.module.scss";

const SpaceInfo: React.FC = () => {
  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const searchParams = useSearchParams();

  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const userCount = searchParams.get("userCount");

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.name}>{data.title}</h1>
      <span className={styles.reservationInfo}>
        <time>
          {year}년 {month}월 {day}일 (토)
        </time>
        <span>{userCount}명</span>
      </span>
      <button type="button" className={styles.edit}>
        수정
      </button>
    </section>
  );
};

export default SpaceInfo;

export const LoadingSpaceInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton width={150} />
      <span className={styles.reservationInfo}>
        <Skeleton width={130} />
      </span>
      <button type="button" className={styles.edit}>
        수정
      </button>
    </section>
  );
};
