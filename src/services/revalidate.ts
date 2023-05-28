import { apiClientLocal } from "@/services/apiClient";

export const revalidateApi = (tag: string) => apiClientLocal.get("/revalidate", { params: { tag } });
