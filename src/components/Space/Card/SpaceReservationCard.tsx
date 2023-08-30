"use client";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { RESERVATION_STATUS_MAPPER, TAG_RESERVATION_COLOR_MAPPER } from "@/common/constants/reservation";
import type { Reservation } from "@/common/types/reservation";
import { Button, Tag } from "@/components/Common";
import { dayjs } from "@/utils/date";
import { getTimeWithDay } from "@/utils/time";

import { IconGrayRightChevronLargeThick } from "public/icons";

import styles from "./spaceReservationCard.module.scss";

interface Props {
  reservation: Reservation;
  href: string;
}

const SpaceReservationCard: React.FC<Props> = ({ reservation, href }) => {
  const { year, month, day, rentalTypes, status, isReviewed } = reservation;
  const date = dayjs(`${year}-${month}-${day}`).format("YYYY.MM.DD (ddd),");
  const today = dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`);

  const isNotTakenTwoWeeks = today.isBefore(dayjs(`${year}-${month}-${day}`).add(2, "week"));

  return (
    <>
      <Link href={href} className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={reservation.space.thumbnail} alt="공간 이미지" width={88} height={88} />
          {status !== "USED" && (
            <Tag size="big" color={TAG_RESERVATION_COLOR_MAPPER[status]} className={styles.tag}>
              {RESERVATION_STATUS_MAPPER[status]}
            </Tag>
          )}
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
      {status === "USED" && !isReviewed && isNotTakenTwoWeeks && (
        // TODO: 리뷰 쓰기
        <div className={styles.reviewWrapper}>
          <Link href={"/"} className={styles.review}>
            <Button type="button" color="primary" size="small">
              리뷰쓰기
            </Button>
          </Link>
        </div>
      )}
    </>
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
      <div className={styles.chevron}>
        <Skeleton width={40} height={40} />
      </div>
    </div>
  );
};
