"use client";

import { useAtomValue } from "jotai";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type { Space } from "@/common/types/space";
import { InfiniteScroll, SpaceDetailCard } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { locationCategoryIdsState, mapCenterState } from "@/states/location";

import styles from "./spaceList.module.scss";

const SpaceList: React.FC = () => {
  const mapCenter = useAtomValue(mapCenterState);
  const locationCategoryIds = useAtomValue(locationCategoryIdsState);
  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", mapCenter[LOCATION_PAGE_MAP_ID], locationCategoryIds],
    ({ pageParam = 1 }) =>
      paginateSpacesApi({
        page: pageParam,
        limit: 10,
        categoryIds: locationCategoryIds.join(","),
        ...mapCenter[LOCATION_PAGE_MAP_ID],
      }),
    {
      enabled: LOCATION_PAGE_MAP_ID in mapCenter,
    },
  );

  return (
    <InfiniteScroll
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
    >
      {data.pages.map((space) => (
        <SpaceDetailCard key={space.id} href={`/spaces/${space.id}`} space={space}>
          <></>
        </SpaceDetailCard>
      ))}
    </InfiniteScroll>
  );
};

export default SpaceList;
