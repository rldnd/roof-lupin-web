"use client";

import type { Reservation } from "@/common/types/reservation";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyReservationsApi } from "@/services/reservation";

import styles from "./list.module.scss";

const List: React.FC = () => {
  // const {} = useSuspenseInfiniteQuery<Reservation>([], () => paginateMyReservationsApi());

  return <></>;
};

export default List;
