import type { UnReadAlarm } from "@/common/types/alarm";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 안읽은 알람 유무 불러오기 */
export const getUnReadAlarm = () => apiClient.get<UnReadAlarm>("/alarms/un-read");
