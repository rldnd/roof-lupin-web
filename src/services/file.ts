import { apiClient } from "./apiClient";

export const uploadImageApi = (formData: FormData) =>
  apiClient.post<{ url: string }>("/file/image", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const uploadImagesApi = (formData: FormData) =>
  apiClient.post<Array<{ url: string }>>("/file/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
