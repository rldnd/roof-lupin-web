"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import type { SpaceDetail } from "@/common/types/space";
import { SpaceEditReservationInfoFilterBottomSheet } from "@/components/BottomSheets/Space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import { reservationState } from "@/states";

import styles from "./spaceInfo.module.scss";

const SpaceInfo: React.FC = () => {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const reservation = useAtomValue(reservationState);

  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  return (
    <>
      <section className={styles.wrapper}>
        <h1 className={styles.name}>{data.title}</h1>
        <span className={styles.reservationInfo}>
          <time>
            {reservation.year}년 {reservation.month}월 {reservation.day}일 (토)
          </time>
          <span>{reservation.userCount}명</span>
        </span>
        <button type="button" className={styles.edit} onClick={() => setIsShowEdit(true)}>
          수정
        </button>
      </section>
      <SpaceEditReservationInfoFilterBottomSheet
        isShow={isShowEdit}
        maxUser={data.maxUser}
        onClose={() => setIsShowEdit(false)}
        overflowUserCost={data.overflowUserCost}
        overflowUserCount={data.overflowUserCount}
      />
    </>
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
