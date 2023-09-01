"use client";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";

import { ExpectedPriceInfo, Info, Responsive, SpaceInfo, Status } from "../../_shared";

import styles from "./approvedView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const ApprovedView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <SpaceInfo reservation={reservation} className={styles.spaceInfo} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <ExpectedPriceInfo reservation={reservation} />
      <hr />
      <menu className={styles.buttonWrapper}>
        <Button type="button" color="bw" full>
          예약 취소
        </Button>
        <Button type="button" color="primary" full>
          결제하기
        </Button>
      </menu>
      <Responsive />
    </>
  );
};

export default ApprovedView;
