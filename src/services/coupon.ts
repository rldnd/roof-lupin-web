import type { UserCouponCount } from "@/common/types/coupon";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 사용자 간 쿠폰 개수 조회 */
export const getSpaceCouponsCountApi = (spaceId: string) =>
  apiClient.get<UserCouponCount>(`/coupons/count/spaces/${spaceId}`);
