"use client";

import type { ReservationDetail } from "@/common/types/reservation";

import WriteReviewButton from "./WriteReviewButton";
import { Info, PriceInfo, SpaceInfo, Status } from "../../_shared";

import styles from "./usedView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const UsedView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <SpaceInfo reservation={reservation} className={styles.spaceInfo} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <hr />
      <WriteReviewButton reservation={reservation} />
    </>
  );
};

export default UsedView;
