import { DateDTO, ImageDTO } from "./common";
import { CommonUser } from "./user";

export interface Review extends DateDTO {
  content: string;
  score: number;
  images: ImageDTO[];
  user: CommonUser;
}
