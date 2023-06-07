import type { DateDTO } from "./common";
import type { CommonUser } from "./user";

export interface Curation extends Omit<DateDTO, "deletedAt"> {
  /** 큐레이션 ID */
  id: string;
  /** 큐레이션 제목 */
  title: string;
  /** 큐레이션 부제목 */
  subTitle: string;
  /** 큐레이션 썸네일 */
  thumbnail: string;
}

export interface CurationDetail extends Curation {
  /** 큐레이션 내용 */
  content: string;
  /** 큐레이션 작성자 */
  user: CommonUser;
}
