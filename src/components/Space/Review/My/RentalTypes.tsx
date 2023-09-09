"use client";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";
import HorizonDraggable from "@/components/HorizonDraggable";
import { isTimeRentalType } from "@/utils/rentalType";

import styles from "./rentalTypes.module.scss";

interface Props {
  review: Review;
}

const RentalTypes: React.FC<Props> = ({ review }) => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {review.reservation.rentalTypes.map((item) => (
        <li className={styles.tag} key={item.rentalTypeId}>
          {isTimeRentalType(item.rentalType) ? "시간 단위 예약" : item.rentalType.name}
        </li>
      ))}
    </HorizonDraggable>
  );
};

export default RentalTypes;

export const LoadingRentalTypes: React.FC = () => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      {range(2).map((value) => (
        <Skeleton className={styles.tag} key={value} width={100} />
      ))}
    </HorizonDraggable>
  );
};
