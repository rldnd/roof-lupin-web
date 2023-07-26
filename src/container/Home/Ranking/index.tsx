import type { Ranking as RankingType } from "@/common/types/ranking";
import { ArrowLink, SpaceRankCard } from "@/components";

import styles from "./ranking.module.scss";

interface Props {
  ranking: RankingType;
}

const Ranking: React.FC<Props> = ({ ranking }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2>{ranking.name}</h2>
        <ArrowLink href={"/"}>전체보기</ArrowLink>
      </div>
      <span className={styles.desc}>{ranking.description}</span>
      <ol className={styles.list}>
        {ranking.spaces.map((space, index) => (
          <SpaceRankCard key={space.id} space={space} href={`/spaces/${space.id}`} rank={index + 1} />
        ))}
      </ol>
    </section>
  );
};

export default Ranking;
