import type { CommonUser, CountInfo, Gender, PushToken } from "@/common/types/user";
import { apiClient } from "@/services/apiClient";

export interface UpdateUserBody {
  nickname: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
  birthYear: string;
  gender: Gender;
  profileImage: string;
  pushToken: string;
  isAdult: boolean;
  isAlarmAccepted: boolean;
}

export interface UpdateMySettingBody {
  isAdult: boolean;
  isAlarmAccepted: boolean;
  isLocationInfoAccepted: boolean;
  isEmailAccepted: boolean;
  isKakaoTalkAccepted: boolean;
  isPushAccepted: boolean;
}

/** [CLIENT] 내 정보 불러오기 */
export const getMeApi = () => apiClient.get<CommonUser>("/users/me");

/** [CLIENT] 나의 푸시토큰 불러오기 */
export const getMyPushTokenApi = () => apiClient.get<PushToken>("/users/me/push-token");

/** [CLIENT] 내 정보 카운트 정보 불러오기 */
export const getMyCountInfoApi = () => apiClient.get<CountInfo>("/users/me/count-info");

export const updateMeApi = (body: Partial<UpdateUserBody>) => apiClient.patch("/users", body);

export const updateMySettingApi = (body: Partial<UpdateMySettingBody>) => apiClient.patch("/users/settings", body);

export const resignApi = () => apiClient.delete("/users");
