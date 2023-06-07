// NOTE: File
export interface ImageDTO {
  id: string;
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

export interface PaginationParams {
  page: number;
  limit: number;
}
