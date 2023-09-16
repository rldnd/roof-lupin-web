import type { Alarm, UnReadAlarm } from "@/common/types/alarm";
import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 안읽은 알람 유무 불러오기 */
export const getUnReadAlarm = () => apiClient.get<UnReadAlarm>("/alarms/un-read");

/** [CLIENT] 유저만 사용 가능합니다. */
export const paginateAlarmsApi = (params: BasePaginationQueryParams) =>
  apiClient.get<PagingDTO<Alarm>>("/alarms", { params });

/** [CLIENT] 알람 읽음 처리 */
export const readAlarmApi = (alarmId: string) => apiClient.post(`/alarms/${alarmId}/read`);
