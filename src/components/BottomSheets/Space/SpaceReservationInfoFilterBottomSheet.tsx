"use client";

import { FormEventHandler, type MouseEventHandler, useCallback, useEffect, useState } from "react";

import cx from "clsx";
import { useAtom } from "jotai";

import { BottomSheetPortal, Button } from "@/components/Common";
import { useToast } from "@/hooks";
import { SpaceReservationInfo, spaceReservationInfoState } from "@/states/space";
import { NotNullable } from "@/utils/types";

import { IconClose } from "public/icons";

import { DayBar, MonthCalendar, UserStepper } from "../_shared";

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

  const onReset = useCallback(() => {
    const { day, month, userCount, year } = info;
    if (!day || !month || !userCount || !year) return;

    setLocalInfo({ day, month, userCount, year });
  }, [info]);

  const onClickPlus = () => {
    if (!localInfo) return;

    if (localInfo.userCount === maxUser) {
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
    onReset();
  }, [onReset]);

  return (
    <BottomSheetPortal
      isShow={isShow}
      shouldCloseOnOverlayClick={false}
      onClose={onClose}
      blockWindowScroll
      className={styles.wrapper}
    >
      <form onSubmit={onSubmit} onReset={onReset}>
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
        {/* // TODO: infinity scroll */}
        <div className={cx(styles.content, styles.calendarWrapper)}>
          <MonthCalendar year="2023" month="7" onClickDay={() => {}} />
          <MonthCalendar year="2023" month="8" onClickDay={() => {}} />
          <MonthCalendar year="2023" month="9" onClickDay={() => {}} />
        </div>
        <Button type="submit" color="primary" full className={styles.submitButton}>
          저장저장 바꿔야한다
        </Button>
      </form>
    </BottomSheetPortal>
  );
};

export default SpaceReservationInfoFilterBottomSheet;
