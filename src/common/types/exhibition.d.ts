import type { ImageDTO } from "./common";
import type { Coupon } from "./coupon";
import type { Space } from "./space";

export interface Exhibition {
  /** 기획전 id */
  id: string;
  /** 기획전 제목 */
  title: string;
  /** 기획전 썸네일 */
  thumbnail: string;
  /** 기획전 부가설명 */
  description: string;
  /** 기획전 내용 */
  content: string;
  /** 기획전 시작 */
  startAt: Date;
  /** 기획전 끝 */
  endAt: Date;
  /** 기획전 생성일 */
  createdAt: Date;
  /** 노출 여부 */
  isShow: boolean;
  /** 기획전 삭제일 */
  deletedAt: Date | null;
  /** 기획전 공간 제목 */
  spaceTitle: string;
}

export interface ExhibitionDetail extends Exhibition {
  spaces: Space[];
  coupons: Coupon[];
  images: ImageDTO[];
}
