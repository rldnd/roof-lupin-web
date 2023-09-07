"use client";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { Reservation } from "@/common/types/reservation";
import { Button, HorizonDraggable } from "@/components";
import { dayjs } from "@/utils/date";
import { isTimeRentalType } from "@/utils/rentalType";

import styles from "./item.module.scss";

interface Props {
  reservation: Reservation;
  className?: string;
}

const Item: React.FC<Props> = ({ reservation, className }) => {
  const { space, year, month, day, rentalTypes } = reservation;
  const date = dayjs(`${year}-${month}-${day}`).format("YYYY.MM.DD");

  return (
    <li className={cx(styles.wrapper, className)}>
      <Image width={64} height={64} src={space.thumbnail} alt="공간 이미지" className={styles.image} />
      <div className={styles.contentWrapper}>
        <span className={styles.title}>{space.title}</span>
        <div className={styles.usedDate}>
          이용일 : <time dateTime={date}>{date}</time>
        </div>
      </div>
      <Link href="/" className={styles.reviewLink}>
        <Button type="button" color="primary" size="small">
          리뷰쓰기
        </Button>
      </Link>
      <HorizonDraggable className={styles.rentalTypes}>
        {rentalTypes.map((item) => (
          <li className={styles.tag} key={item.rentalTypeId}>
            {isTimeRentalType(item.rentalType) ? "시간 단위 예약" : item.rentalType.name}
          </li>
        ))}
      </HorizonDraggable>
    </li>
  );
};

export default Item;

export const LoadingItem: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Skeleton width={64} height={64} containerClassName={styles.image} />
      <div className={styles.contentWrapper}>
        <Skeleton width={80} className={styles.title} />
        <Skeleton width={60} className={styles.usedDate} />
      </div>
      <Button type="button" color="primary" size="small" disabled className={styles.reviewLink}>
        리뷰쓰기
      </Button>
      <HorizonDraggable className={styles.rentalTypes}>
        {range(2).map((value) => (
          <Skeleton className={styles.tag} key={value} width={100} />
        ))}
      </HorizonDraggable>
    </li>
  );
};
