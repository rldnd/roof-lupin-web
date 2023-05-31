export type SocialType = "kakao" | "naver" | "google";

export interface Token {
  accessToken: string;
  refreshToken: string;
}
