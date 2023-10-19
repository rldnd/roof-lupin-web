"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import cx from "clsx";

import type { UnReadAlarm } from "@/common/types/alarm";
import { AuthChecker } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getUnReadAlarm } from "@/services/alarm";

import { IconBell } from "public/icons";

import styles from "./alarm.module.scss";

interface Props {
  className?: string;
}

const Alarm: React.FC<Props> = ({ className }) => {
  const { push } = useRouter();
  const { isLogined } = useMe();
  const { data } = useSuspenseQuery<UnReadAlarm>(["getUnReadAlarm", isLogined], getUnReadAlarm, {
    refetchOnMount: true,
    useErrorBoundary: false,
  });

  return (
    <AuthChecker
      afterLoginPath="/alarms"
      className={cx(styles.wrapper, className, { [styles.isUnread]: data && data.isExists })}
    >
      <button onClick={() => push("/alarms")} title="알림 페이지">
        <IconBell />
      </button>
    </AuthChecker>
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
