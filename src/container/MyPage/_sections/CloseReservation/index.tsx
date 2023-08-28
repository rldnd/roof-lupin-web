"use client";

import type { Reservation } from "@/common/types/reservation";
import { LoadingSpaceReservationCard, SpaceReservationCard } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getMyCloseReservationApi } from "@/services/reservation";

import styles from "./closeReservation.module.scss";

const CloseReservation: React.FC = () => {
  const { data } = useSuspenseQuery<Reservation>(["getMyCloseReservation"], getMyCloseReservationApi);

  return (
    <section className={styles.wrapper}>
      <SpaceReservationCard reservation={data} href={`/reservations/${data.id}`} />
    </section>
  );
};

export default CloseReservation;

export const LoadingCloseReservation: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <LoadingSpaceReservationCard />
    </section>
  );
};
