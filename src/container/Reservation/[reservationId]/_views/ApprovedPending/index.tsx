"use client";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";

import { ExpectedPriceInfo, Info, Responsive, SpaceInfo, Status } from "../../_shared";

import styles from "./approvedPendingView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const ApprovedPendingView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <SpaceInfo reservation={reservation} className={styles.spaceInfo} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <ExpectedPriceInfo reservation={reservation} />
      <hr />
      <section className={styles.cancelWrapper}>
        <Button full color="bw" type="button" className={styles.cancel}>
          요청 취소
        </Button>
      </section>
      <Responsive />
    </>
  );
};

export default ApprovedPendingView;
