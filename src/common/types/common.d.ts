// NOTE: File
export interface ImageDTO {
  url: string;
}

// NOTE: Service Base DTO
interface Paging {
  total: number;
  page: number;
  limit: number;
  skip: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface PagingDTO<T> {
  paging: Paging;
  data: T[];
}

export interface DateDTO {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface BasePaginationQueryParams {
  page: number;
  limit: number;
}

export interface ErrorDTO {
  message: string;
  path: string;
  statusCode: number;
  timestamp: Date;
}

export type Day = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
