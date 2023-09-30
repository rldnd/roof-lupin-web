import { APP_VERSION, PERMISSION } from "@/common/constants";
import { AppCommonGetPermissionData } from "@/common/types/webview/common";
import { sessionPersistenceAtom } from "@/utils/jotai";

export const initialPermission: AppCommonGetPermissionData = {
  alarm: false,
  location: false,
} as const;

export const appVersionState = sessionPersistenceAtom<string>(APP_VERSION, "");
export const permissionState = sessionPersistenceAtom<AppCommonGetPermissionData>(PERMISSION, initialPermission);
