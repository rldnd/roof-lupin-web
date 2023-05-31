import type { CommonUser } from "@/common/types/user";
import { apiClient } from "@/services/apiClient";

export const getMeApi = () => apiClient.get<CommonUser>("/users/me");
