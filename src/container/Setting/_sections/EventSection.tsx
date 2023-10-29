"use client";

import { ChangeEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { WebCommonOpenSettingsPayload, WebCommonRequestAlarmPermissionPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { updateMySettingApi } from "@/services/user";

import Section from "../Section";
import ToggleItem, { LoadingToggleItem } from "../ToggleItem";

import styles from "./eventSection.module.scss";

const EventSection: React.FC = () => {
  const { sendMessage } = useWebview();
  const { isWebview } = usePlatform();
  const { me, refetchMe } = useMe();
  const { mutate } = useMutation(updateMySettingApi, { onSuccess: () => refetchMe() });

  const onChangePush: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { checked } = e.currentTarget;
    if (!checked) sendMessage<WebCommonOpenSettingsPayload>({ type: "web-common/openSettings" });
    else sendMessage<WebCommonRequestAlarmPermissionPayload>({ type: "web-common/requestAlarmPermission" });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget;
    mutate({ [name]: checked });
  };

  if (!me) return <LoadingEventSection />;
  if (!me.setting.isAlarmAccepted) return null;

  const { isEmailAccepted, isKakaoTalkAccepted, isPushAccepted } = me.setting;

  return (
    <Section title="혜택 및 이벤트 알림">
      <ToggleItem name="isEmailAccepted" checked={isEmailAccepted} onChange={onChange} className={styles.item}>
        이메일 알림
      </ToggleItem>
      <ToggleItem name="isKakaoTalkAccepted" checked={isKakaoTalkAccepted} onChange={onChange} className={styles.item}>
        카카오톡 알림
      </ToggleItem>
      {isWebview && (
        <ToggleItem name="isPushAccepted" checked={isPushAccepted} onChange={onChangePush} className={styles.item}>
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
