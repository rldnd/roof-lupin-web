import { apiClientLocal } from "@/services/apiClient";

interface RevalidateParams {
  tag?: string;
  path?: string;
}

export const revalidateApi = ({ tag, path }: RevalidateParams) =>
  apiClientLocal.get("/revalidate", { params: { tag, path } });
