"use client";

import { range } from "lodash-es";

import type { Space } from "@/common/types/space";
import { HorizonDraggable, LoadingSpaceNameCard, SpaceNameCard } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getSearchRecentSpacesApi } from "@/services/search";

import styles from "./recentSpace.module.scss";

const RecentSpace: React.FC = () => {
  const { isLogined } = useMe();
  const { data: spaces } = useSuspenseQuery<Space[]>(["getSearchRecentSpaces"], () => getSearchRecentSpacesApi(), {
    enabled: isLogined,
  });

  if (!isLogined || spaces.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <h2>최근 본 공간</h2>
      <HorizonDraggable className={styles.list}>
        {spaces.map((space) => (
          <SpaceNameCard key={space.id} href={`/spaces/${space.id}`} space={space} />
        ))}
      </HorizonDraggable>
    </section>
  );
};

export default RecentSpace;

export const LoadingRecentSpace: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>최근 본 공간</h2>
      <ul className={styles.list}>
        {range(3).map((value) => (
          <LoadingSpaceNameCard key={value} />
        ))}
      </ul>
    </section>
  );
};
