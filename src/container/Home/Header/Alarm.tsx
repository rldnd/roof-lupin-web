"use client";

import Link from "next/link";

import cx from "clsx";

import type { UnReadAlarm } from "@/common/types/alarm";
import { useSuspenseQuery } from "@/hooks";
import { getUnReadAlarm } from "@/services/alarm";

import { IconBell } from "public/icons";

import styles from "./alarm.module.scss";

interface Props {
  className?: string;
}

const Alarm: React.FC<Props> = ({ className }) => {
  const { data } = useSuspenseQuery<UnReadAlarm>(["getUnReadAlarm"], getUnReadAlarm, {
    refetchOnMount: true,
    useErrorBoundary: false,
  });

  return (
    <Link
      href="/alarms"
      title="알림 페이지"
      className={cx(styles.wrapper, className, { [styles.isUnread]: data && data.isExists })}
    >
      <IconBell />
    </Link>
  );
};

export default Alarm;

export const LoadingAlarm: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link href="/alarms" title="알림 페이지" className={cx(styles.wrapper, className)}>
      <IconBell />
    </Link>
  );
};
