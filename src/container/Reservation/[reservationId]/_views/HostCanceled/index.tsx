"use client";

import Link from "next/link";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";

import { Info, SpaceInfo, Status } from "../../_shared";

import styles from "./hostCanceledView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const HostCanceledView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>호스트 승인 거절 사유</h2>
        <p>{reservation.cancel?.reason}</p>
      </section>
      <hr />
      <SpaceInfo reservation={reservation} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <Link href={`/spaces/${reservation.space.id}`} className={styles.spaceButton}>
        <Button type="button" full color="bw">
          다시 예약하러 가기
        </Button>
      </Link>
    </>
  );
};

export default HostCanceledView;
