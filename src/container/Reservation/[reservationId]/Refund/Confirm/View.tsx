"use client";

import { ChangeEventHandler, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";

import { ReservationDetail } from "@/common/types/reservation";
import { Button, Checkbox, Loading } from "@/components";
import { usePopConfirm, useSuspenseQuery, useToast } from "@/hooks";
import { getErrorMessage } from "@/services/apiClient";
import { refundPaymentApi } from "@/services/payment";
import { getMyReservationApi } from "@/services/reservation";
import { initialPaymentRefund, paymentRefundState } from "@/states";

import {
  Info,
  LoadingInfo,
  LoadingPriceInfo,
  LoadingSpaceInfo,
  LoadingStatus,
  PriceInfo,
  Responsive,
  SpaceInfo,
  Status,
} from "../../_shared";
import RefundPriceInfo, { LoadingRefundPriceInfo } from "../../_shared/RefundPriceInfo";

import styles from "./view.module.scss";

const RefundView: React.FC = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const { openPopConfirm } = usePopConfirm();
  const [checked, setChecked] = useState(false);
  const [paymentRefund, setPaymentRefund] = useAtom(paymentRefundState);
  const { reservationId } = useParams();
  const { data: reservation, refetch } = useSuspenseQuery<ReservationDetail>(["getMyReservation"], () =>
    getMyReservationApi(reservationId),
  );

  const { mutate } = useMutation(refundPaymentApi, {
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["getMyCloseReservation"]);
      queryClient.invalidateQueries(["getMyCountInfo"]);
      queryClient.invalidateQueries(["paginateMyReservations"]);
      queryClient.invalidateQueries(["getMyReservation"]);
      setPaymentRefund(initialPaymentRefund);
      replace(`/reservations/${reservationId}`);
    },
    onError: (err) => {
      addToast({ message: getErrorMessage(err, "예약 취소에 실패하였습니다.") });
      setIsLoading(false);
    },
  });

  const onChangeCheckbox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    setChecked(checked);
  };

  const onClickRequest = () => {
    openPopConfirm({
      title: "예약을 취소하시겠어요?",
      description: "예약 취소 시 호스트가 지정한 환불 규정에 따라 환불이 진행됩니다",
      onConfirm: () => {
        setIsLoading(true);
        mutate({ reservationId, cancelReason: paymentRefund.cancelReason });
      },
    });
  };

  return (
    <>
      <Status reservation={reservation} isRefunding />
      <section className={styles.refundMessageWrapper}>
        <p className={styles.refundMessage}>환불은 주말 / 공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.</p>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>취소 사유</h2>
        <p>{paymentRefund.cancelReason}</p>
      </section>
      <hr />
      <SpaceInfo reservation={reservation} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <RefundPriceInfo reservation={reservation} className={styles.refundPriceInfo} />
      <div className={styles.checkWrapper}>
        <Checkbox isGray onChange={onChangeCheckbox}>
          취소 규정 약관 동의
        </Checkbox>
        <Button
          type="button"
          color="primary"
          full
          className={styles.requestButton}
          disabled={!checked}
          onClick={onClickRequest}
        >
          예약 취소 요청하기
        </Button>
      </div>
      <Responsive />
      <Loading isShow={isLoading} />
    </>
  );
};
export default RefundView;

export const LoadingView: React.FC = () => {
  return (
    <>
      <LoadingStatus />
      <section className={styles.refundMessageWrapper}>
        <p className={styles.refundMessage}>환불은 주말 / 공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.</p>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>취소 사유</h2>
        <Skeleton width={100} />
      </section>
      <hr />
      <LoadingSpaceInfo />
      <hr />
      <LoadingInfo />
      <hr />
      <LoadingPriceInfo />
      <LoadingRefundPriceInfo className={styles.refundPriceInfo} />
      <div className={styles.checkWrapper}>
        <Checkbox isGray disabled>
          취소 규정 약관 동의
        </Checkbox>
        <Button type="button" color="primary" disabled full className={styles.requestButton}>
          예약 취소 요청하기
        </Button>
      </div>
      <Responsive />
    </>
  );
};
