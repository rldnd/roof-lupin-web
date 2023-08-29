import type { CommonUser, CountInfo, PushToken } from "@/common/types/user";
import { apiClient } from "@/services/apiClient";
import type { Nullable } from "@/utils/types";

export interface UpdateUserBody {
  nickname: string;
  email: string;
  phoneNumber: string;
  birth: string;
  gender: string;
  profileImage: string;
  pushToken: string;
}

/** [CLIENT] 내 정보 불러오기 */
export const getMeApi = () => apiClient.get<CommonUser>("/users/me");

/** [CLIENT] 나의 푸시토큰 불러오기 */
export const getMyPushTokenApi = () => apiClient.get<PushToken>("/users/me/push-token");

/** [CLIENT] 내 정보 카운트 정보 불러오기 */
export const getMyCountInfoApi = () => apiClient.get<CountInfo>("/users/me/count-info");

export const updateMeApi = (body: Partial<Nullable<UpdateUserBody>>) => apiClient.patch("/users", body);
