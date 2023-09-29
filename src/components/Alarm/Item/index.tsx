/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { ALARM_ICON_MAPPER } from "@/common/constants/alarm";
import type { Alarm } from "@/common/types/alarm";
import { readAlarmApi } from "@/services/alarm";
import { dayjs } from "@/utils/date";

import styles from "./alarmItem.module.scss";

interface Props {
  alarm: Alarm;
  className?: string;
}

type ContentProps = Omit<Props, "className">;

const AlarmContent: React.FC<ContentProps> = ({ alarm }) => {
  const { backgroundColor, icon } = ALARM_ICON_MAPPER[alarm.alarmType];
  const date = dayjs(alarm.alarmAt).format("MM월 DD일");

  return (
    <>
      <div className={cx(styles.iconWrapper, styles[backgroundColor ?? ""])}>{icon}</div>
      <p className={styles.content}>{alarm.content}</p>
      {Boolean(alarm.alarmAt) && <time dateTime={date}>{date}</time>}
    </>
  );
};

const AlarmLinkItem: React.FC<Props> = ({ alarm, className }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(readAlarmApi, {
    onSuccess: () => {
      queryClient.refetchQueries(["paginateAlarmsApi"]);
    },
  });

  return (
    <li
      className={cx(styles.wrapper, className, { [styles.isRead]: alarm.isRead })}
      onClick={() => mutateAsync(alarm.id)}
    >
      <Link href={alarm.link!} className={styles.layout}>
        <AlarmContent alarm={alarm} />
      </Link>
    </li>
  );
};

const AlarmItemWithoutLink: React.FC<Props> = ({ alarm, className }) => {
  return (
    <li className={cx(styles.wrapper, styles.layout, className, { [styles.isRead]: alarm.isRead })}>
      <AlarmContent alarm={alarm} />
    </li>
  );
};

const AlarmItem: React.FC<Props> = ({ alarm, className }) => {
  if (alarm.link) return <AlarmLinkItem alarm={alarm} className={className} />;
  return <AlarmItemWithoutLink alarm={alarm} className={className} />;
};

export default AlarmItem;

export const LoadingAlarmItem: React.FC<{ className?: string }> = ({ className }) => {
  return <Skeleton width="100%" height={90} className={className} />;
};
