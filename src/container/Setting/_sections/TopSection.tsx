"use client";

import { ChangeEventHandler, useCallback, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import type {
  AppCommonGetPermissionData,
  AppCommonGetPermissionsPayload,
  WebCommonGetPermissionsPayload,
  WebCommonOpenSettingsPayload,
  WebCommonRequestLocationPermissionPayload,
} from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { updateMySettingApi } from "@/services/user";
import { permissionState } from "@/states/global";

import Section from "../Section";
import ToggleItem, { LoadingToggleItem } from "../ToggleItem";

const TopSection: React.FC = () => {
  const { isWebview } = usePlatform();

  const { me, refetchMe } = useMe();
  const { mutateAsync } = useMutation(updateMySettingApi, { onSuccess: refetchMe });
  const [permission, setPermission] = useAtom(permissionState);
  const { addListener, sendMessage, removeListener } = useWebview();

  const onChangeAlarm: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { checked } = e.currentTarget;
    if (checked) await mutateAsync({ isAlarmAccepted: checked, isPushAccepted: permission.alarm });
    else
      await mutateAsync({
        isAlarmAccepted: checked,
        isEmailAccepted: false,
        isKakaoTalkAccepted: false,
        isPushAccepted: false,
      });
  };

  const onChangeLocation: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    if (!checked) sendMessage<WebCommonOpenSettingsPayload>({ type: "web-common/openSettings" });
    else sendMessage<WebCommonRequestLocationPermissionPayload>({ type: "web-common/requestLocationPermission" });
  };

  const updateMySetting = useCallback(
    async ({ alarm, location }: AppCommonGetPermissionData) => {
      setPermission({ alarm, location });
      await mutateAsync({ isPushAccepted: alarm && me?.setting.isAlarmAccepted, isLocationInfoAccepted: location });
    },
    [me?.setting.isAlarmAccepted, mutateAsync, setPermission],
  );

  useEffect(() => {
    addListener<AppCommonGetPermissionsPayload>("app-common/getPermissions", updateMySetting);
    sendMessage<WebCommonGetPermissionsPayload>({ type: "web-common/getPermissions" });

    return () => {
      removeListener<AppCommonGetPermissionsPayload>("app-common/getPermissions");
    };
  }, [addListener, removeListener, sendMessage, setPermission, updateMySetting]);

  return (
    <>
      <Section>
        <ToggleItem checked={me?.setting.isAlarmAccepted || false} onChange={onChangeAlarm}>
          알림 설정
        </ToggleItem>
      </Section>
      {isWebview && (
        <Section>
          <ToggleItem checked={permission.location} onChange={onChangeLocation}>
            위치 정보 접근 권한
          </ToggleItem>
        </Section>
      )}
    </>
  );
};

export default TopSection;

export const LoadingTopSection: React.FC = () => {
  return (
    <>
      <Section>
        <LoadingToggleItem>알림 설정</LoadingToggleItem>
      </Section>
    </>
  );
};
