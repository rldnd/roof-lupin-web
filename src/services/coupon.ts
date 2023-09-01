import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { UserCoupon, UserCouponCount } from "@/common/types/coupon";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 사용자 사용 가능 쿠폰 개수 조회 */
export const getCouponsCountApi = () => apiClient.get<UserCouponCount>("/coupons/count");

/** [CLIENT] 사용자 쿠폰 목록 조회 */
export const paginateCouponsApi = (params: BasePaginationQueryParams) =>
  apiClient.get<PagingDTO<UserCoupon>>("/coupons/users", { params });

export const createCouponApi = (code: string) => apiClient.post<{ id: string }>("/coupons/register", { code });
