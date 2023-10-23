import type { Space } from "@/common/types/space";
import { SpaceRankCard } from "@/components";

import styles from "./spaceList.module.scss";

interface Props {
  spaces: Space[];
}

const SpaceList: React.FC<Props> = ({ spaces }) => {
  if (spaces.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <h2>제목이 필요해요</h2>
      <ul>
        {spaces.map((space) => (
          <SpaceRankCard key={space.id} space={space} href={`/spaces/${space.id}`} />
        ))}
      </ul>
    </section>
  );
};

export default SpaceList;
