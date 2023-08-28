import type { DateDTO } from "./common";

export interface Admin extends DateDTO {
  /** id */
  id: string;
  /** 이름 */
  name: string;
  /** 아이디 */
  userId: string;
  /** 승인 여부 */
  isAccepted: boolean;
}
