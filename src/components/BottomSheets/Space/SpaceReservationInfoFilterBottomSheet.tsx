"use client";

import { FormEventHandler, type MouseEventHandler, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { BottomSheetPortal } from "@/components/Common";
import { useToast } from "@/hooks";
import { SpaceReservationInfo, spaceReservationInfoState } from "@/states/space";
import { NotNullable } from "@/utils/types";

import { IconClose } from "public/icons";

import { UserStepper } from "../_shared";
import { DayBar } from "../_shared/CalendarList";

import styles from "./spaceReservationInfoFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  maxUser: number;
  overflowUserCount: number;
  overflowUserCost: number;
}

const SpaceReservationInfoFilterBottomSheet: React.FC<Props> = ({
  isShow,
  onClose,
  maxUser,
  overflowUserCost,
  overflowUserCount,
}) => {
  const { addToast } = useToast();

  const [info, setInfo] = useAtom(spaceReservationInfoState);
  const [localInfo, setLocalInfo] = useState<NotNullable<SpaceReservationInfo>>();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!localInfo) return;
    setInfo(localInfo);
  };

  const onClickPlus = () => {
    if (!localInfo) return;

    if (localInfo.userCount >= maxUser) {
      addToast({ message: "인원을 더 추가할 수 없습니다." });
    } else {
      setLocalInfo((prev) => ({ ...prev!, userCount: prev!.userCount + 1 }));
    }
  };

  const onClickMinus = () => {
    if (!localInfo) return;
    setLocalInfo((prev) => ({ ...prev!, userCount: prev!.userCount! - 1 }));
  };

  useEffect(() => {
    const { day, month, userCount, year } = info;
    if (!day || !month || !userCount || !year) return;

    setLocalInfo({ day, month, userCount, year });
  }, [info]);

  return (
    <BottomSheetPortal
      isShow={isShow}
      shouldCloseOnOverlayClick={false}
      onClose={onClose}
      blockWindowScroll
      className={styles.wrapper}
    >
      <form onSubmit={onSubmit}>
        <header>
          <button type="reset" className={styles.reset}>
            초기화
          </button>
          <button type="button" aria-label="종료" className={styles.close} onClick={onClose}>
            <IconClose />
          </button>
        </header>
        <div className={styles.content}>
          <UserStepper
            title="인원"
            onClickMinus={onClickMinus}
            onClickPlus={onClickPlus}
            description={`${overflowUserCount}명 초과시 인당 ${overflowUserCost.toLocaleString("ko-KR")}원 추가돼요.`}
            value={localInfo?.userCount}
          />
          <hr />
          <h2 className={styles.dateTitle}>날짜 및 시간</h2>
        </div>
        <DayBar />
      </form>
    </BottomSheetPortal>
  );
};

export default SpaceReservationInfoFilterBottomSheet;
