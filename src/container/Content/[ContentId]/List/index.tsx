"use client";

import type { Space } from "@/common/types/space";
import { SpaceRankCard } from "@/components";

import styles from "./contentList.module.scss";

interface Props {
  spaces: Space[];
}

const ContentList: React.FC<Props> = ({ spaces }) => {
  return (
    <main className={styles.wrapper}>
      <ol className={styles.list}>
        {spaces.map((space) => (
          <SpaceRankCard key={space.id} href={`/spaces/${space.id}`} space={space} />
        ))}
      </ol>
    </main>
  );
};

export default ContentList;
