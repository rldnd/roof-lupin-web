import type { Space } from "@/common/types/space";
import { SpaceRankCard } from "@/components";

import styles from "./spaceList.module.scss";

interface Props {
  title: string;
  spaces: Space[];
}

const SpaceList: React.FC<Props> = ({ spaces, title }) => {
  if (spaces.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <h2>{title}</h2>
      <ul>
        {spaces.map((space) => (
          <SpaceRankCard key={space.id} space={space} href={`/spaces/${space.id}`} />
        ))}
      </ul>
    </section>
  );
};

export default SpaceList;
