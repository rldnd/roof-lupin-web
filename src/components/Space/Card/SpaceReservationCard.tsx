"use client";

import Image from "next/image";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";

import type { Reservation } from "@/common/types/reservation";
import { dayjs } from "@/utils/date";
import { getTimeWithDay } from "@/utils/time";

import { IconGrayRightChevronLargeThick } from "public/icons";

import styles from "./spaceReservationCard.module.scss";

interface Props {
  reservation: Reservation;
  href: string;
}

// TODO: 예약 상태에 따라 태그 표시
const SpaceReservationCard: React.FC<Props> = ({ reservation, href }) => {
  const { year, month, day, rentalTypes } = reservation;
  const date = dayjs(`${year}-${month}-${day}`).format("YYYY.MM.DD (ddd),");

  return (
    <Link href={href} className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={reservation.space.thumbnail} alt="공간 이미지" width={88} height={88} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.spaceName}>{reservation.space.title}</h3>
        {rentalTypes.map((rentalType) => (
          <time className={styles.time} key={rentalType.rentalTypeId}>{`${date} ${getTimeWithDay(
            rentalType.startAt,
          )}-${getTimeWithDay(rentalType.endAt)}시`}</time>
        ))}
        <span className={styles.numberWrapper}>
          예약번호
          <span className={styles.number}>{reservation.code}</span>
        </span>
      </div>
      <button type="button" className={styles.chevron}>
        <IconGrayRightChevronLargeThick />
      </button>
    </Link>
  );
};

export default SpaceReservationCard;

export const LoadingSpaceReservationCard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton width={88} height={88} />
      <div className={styles.content}>
        <Skeleton width={200} className={styles.spaceName} />
        <Skeleton width={120} className={styles.time} />
        <Skeleton width={100} className={styles.numberWrapper} />
      </div>
      <Skeleton width={40} height={40} className={styles.chevron} />
    </div>
  );
};
