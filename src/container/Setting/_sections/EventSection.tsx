"use client";

import { ChangeEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { usePlatform } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { updateMySettingApi } from "@/services/user";

import Section from "../Section";
import ToggleItem, { LoadingToggleItem } from "../ToggleItem";

import styles from "./eventSection.module.scss";

const EventSection: React.FC = () => {
  const { isWebview } = usePlatform();
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMySettingApi, { onSuccess: () => refetchMe() });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget;
    mutate({ [name]: checked });
  };

  if (!me) return <LoadingEventSection />;

  const { isEmailAccepted, isKakaoTalkAccepted, isPushAccepted, isAlarmAccepted } = me.setting;

  return (
    <Section title="혜택 및 이벤트 알림">
      <ToggleItem name="isEmailAccepted" checked={isEmailAccepted} onChange={onChange} className={styles.item}>
        이메일 알림
      </ToggleItem>
      <ToggleItem name="isKakaoTalkAccepted" checked={isKakaoTalkAccepted} onChange={onChange} className={styles.item}>
        카카오톡 알림
      </ToggleItem>
      {isWebview && (
        <ToggleItem
          name="isPushAccepted"
          checked={isPushAccepted}
          disabled={!isAlarmAccepted}
          onChange={onChange}
          className={styles.item}
        >
          앱 Push 알림
        </ToggleItem>
      )}
    </Section>
  );
};

export default EventSection;

export const LoadingEventSection: React.FC = () => {
  return (
    <Section title="혜택 및 이벤트 알림">
      <LoadingToggleItem className={styles.item}>이메일 알림</LoadingToggleItem>
      <LoadingToggleItem className={styles.item}>카카오톡 알림</LoadingToggleItem>
    </Section>
  );
};
