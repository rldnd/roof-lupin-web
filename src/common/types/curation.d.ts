import type { DateDTO } from "./common";
import type { Space } from "./space";
import type { CommonUser } from "./user";

interface CurationSpace extends Space {
  curationOrderNo: number | null;
}

export interface Curation extends Omit<DateDTO, "deletedAt"> {
  /** 큐레이션 ID */
  id: string;
  /** 큐레이션 제목 */
  title: string;
  /** 큐레이션 부제목 */
  subTitle: string;
  /** 큐레이션 썸네일 */
  thumbnail: string;
  /** 큐레이션 공간 */
  spaces: CurationSpace[];
  /** 순서 */
  orderNo: number | null;
}

export interface CurationDetail extends Curation {
  /** 큐레이션 내용 */
  content: string;
  /** 큐레이션 작성자 */
  user: CommonUser | null;
}
