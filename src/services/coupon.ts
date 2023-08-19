import type { UserCouponCount } from "@/common/types/coupon";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 사용자 사용 가능 쿠폰 개수 조회 */
export const getCouponsCountApi = () => apiClient.get<UserCouponCount>("/coupons/count");
