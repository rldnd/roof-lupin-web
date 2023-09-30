"use client";

import { ChangeEventHandler, useCallback, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import type {
  AppCommonGetPermissionData,
  AppCommonGetPermissionsPayload,
  WebCommonGetPermissionsPayload,
  WebCommonOpenSettingsPayload,
  WebCommonRequestAlarmPermissionPayload,
  WebCommonRequestLocationPermissionPayload,
} from "@/common/types/webview/common";
import { useWebview } from "@/hooks";
import { updateMySettingApi } from "@/services/user";
import { permissionState } from "@/states/global";

import Section from "../Section";
import ToggleItem, { LoadingToggleItem } from "../ToggleItem";

const AppPermissionSection: React.FC = () => {
  const { mutate } = useMutation(updateMySettingApi);
  const [permission, setPermission] = useAtom(permissionState);
  const { addListener, sendMessage, removeListener } = useWebview();

  const onChangeAlarm: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    if (!checked) sendMessage<WebCommonOpenSettingsPayload>({ type: "web-common/openSettings" });
    else sendMessage<WebCommonRequestAlarmPermissionPayload>({ type: "web-common/requestAlarmPermission" });
  };

  const onChangeLocation: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    if (!checked) sendMessage<WebCommonOpenSettingsPayload>({ type: "web-common/openSettings" });
    else sendMessage<WebCommonRequestLocationPermissionPayload>({ type: "web-common/requestLocationPermission" });
  };

  const updateMySetting = useCallback(
    ({ alarm, location }: AppCommonGetPermissionData) => {
      setPermission({ alarm, location });
      mutate({ isAlarmAccepted: alarm, isLocationInfoAccepted: location });
    },
    [mutate, setPermission],
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
        <ToggleItem checked={permission.alarm} onChange={onChangeAlarm}>
          알림 설정
        </ToggleItem>
      </Section>
      <Section>
        <ToggleItem checked={permission.location} onChange={onChangeLocation}>
          위치 정보 접근 권한
        </ToggleItem>
      </Section>
    </>
  );
};

export default AppPermissionSection;

export const LoadingAppPermissionSection: React.FC = () => {
  return (
    <>
      <Section>
        <LoadingToggleItem>알림 설정</LoadingToggleItem>
      </Section>
      <Section>
        <LoadingToggleItem>위치 정보 접근 권한</LoadingToggleItem>
      </Section>
    </>
  );
};
