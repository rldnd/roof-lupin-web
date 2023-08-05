import type { ContentCategory } from "./content";
import type { Exhibition } from "./exhibition";
import type { Ranking } from "./ranking";

export type HomeContentType = "CONTENTS" | "EXHIBITION" | "RANKING";

interface BaseHomeContent {
  /** 홈 컨텐츠 id */
  id: string;
}

export interface HomeContentCategory extends BaseHomeContent {
  /** 홈 컨텐츠 종류 */
  type: Extract<HomeContentType, "CONTENTS">;
  /** 컨텐츠 */
  contentCategory: ContentCategory;
}

export interface HomeContentExhibition extends BaseHomeContent {
  /** 홈 컨텐츠 종류 */
  type: Extract<HomeContentType, "EXHIBITION">;
  /** 기획전 */
  exhibition: Exhibition;
}

export interface HomeContentRanking extends BaseHomeContent {
  /** 홈 컨텐츠 종류 */
  type: Extract<HomeContentType, "RANKING">;
  /** 랭킹 */
  ranking: Ranking;
}

export type HomeContent = HomeContentCategory | HomeContentExhibition | HomeContentRanking;
