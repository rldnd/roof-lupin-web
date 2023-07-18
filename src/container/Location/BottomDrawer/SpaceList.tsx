"use client";

import { useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type { Space } from "@/common/types/space";
import { InfiniteScroll, SpaceBookmark, SpaceDetailCard } from "@/components";
import { useNaverMap, useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { locationCategoryIdsState, mapCenterState, mapSizeState, mapZoomState } from "@/states/location";
import { getDistance } from "@/utils/naverMap";

import styles from "./spaceList.module.scss";

const LIMIT = 10;

const SpaceList: React.FC = () => {
  // const {} = useNaverMap(LOCATION_PAGE_MAP_ID);

  const spaceListRef = useRef<HTMLUListElement>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const locationCategoryIds = useAtomValue(locationCategoryIdsState);
  const mapCenter = useAtomValue(mapCenterState);
  const mapZoom = useAtomValue(mapZoomState);
  const mapSize = useAtomValue(mapSizeState);

  const distance = getDistance({
    zoom: mapZoom[LOCATION_PAGE_MAP_ID],
    width: mapSize[LOCATION_PAGE_MAP_ID]?.width,
    height: mapSize[LOCATION_PAGE_MAP_ID]?.height,
  });

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", mapCenter[LOCATION_PAGE_MAP_ID], locationCategoryIds, distance],
    ({ pageParam = 1 }) =>
      paginateSpacesApi({
        page: pageParam,
        limit: LIMIT,
        categoryIds: locationCategoryIds.join(","),
        distance,
        ...mapCenter[LOCATION_PAGE_MAP_ID],
      }),
    {
      enabled: LOCATION_PAGE_MAP_ID in mapCenter && Boolean(distance),
      suspense: false,
    },
  );

  useEffect(() => {
    if (!isSuccess) return;
    setSpaces(data?.pages);
  }, [data?.pages, isSuccess]);

  return (
    <InfiniteScroll
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      ref={spaceListRef}
    >
      {spaces.map((space) => (
        <SpaceDetailCard key={space.id} href={`/spaces/${space.id}`} space={space}>
          <SpaceBookmark id={space.id} initialIsInterested={space.isInterested} refetch={refetch} />
        </SpaceDetailCard>
      ))}
    </InfiniteScroll>
  );
};

export default SpaceList;
