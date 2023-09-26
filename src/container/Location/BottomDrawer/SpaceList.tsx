"use client";

import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type { Space } from "@/common/types/space";
import { SpaceLocationCard, UnorderedInfiniteScroll } from "@/components";
import type { ActionOmitter, AddMarkerParameter } from "@/components/NaverMap/types";
import { useMapInfo, useNaverMap, useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { locationCategoryIdsState, mapSizeState } from "@/states";
import { getMapCategoryIconPath } from "@/utils/category";
import { getDistance, getMapMarkerIconWithOrderNoSorting } from "@/utils/naverMap";

import styles from "./spaceList.module.scss";

type AddMarkerParameterWithoutAction = ActionOmitter<AddMarkerParameter>;

const LIMIT = 9999;

const SpaceList: React.FC = () => {
  const { addMarkers, clearMarkers } = useNaverMap(LOCATION_PAGE_MAP_ID);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const locationCategoryIds = useAtomValue(locationCategoryIdsState);
  const mapSize = useAtomValue(mapSizeState);

  const { lat, lng, zoom } = useMapInfo();

  const distance = getDistance({
    zoom,
    width: mapSize[LOCATION_PAGE_MAP_ID]?.width,
    height: mapSize[LOCATION_PAGE_MAP_ID]?.height,
  });

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", lat, lng, locationCategoryIds, distance],
    ({ pageParam = 1 }) =>
      paginateSpacesApi({
        page: pageParam,
        limit: LIMIT,
        categoryIds: locationCategoryIds.join(","),
        distance,
        lat,
        lng,
      }),
    {
      enabled: Boolean(distance),
      suspense: false,
    },
  );

  useEffect(() => {
    if (!isSuccess) return;
    setSpaces(data?.pages);
  }, [data?.pages, isSuccess]);

  useEffect(() => {
    if (spaces.length === 0) clearMarkers();
    if (spaces.length !== 0) {
      const markers = spaces.reduce<AddMarkerParameterWithoutAction[]>((acc, cur) => {
        if (!cur.location) return acc;

        const { lat, lng } = cur.location;
        if (acc.some((item) => lat === item.lat && lng === item.lng)) {
          return acc.reduce<AddMarkerParameterWithoutAction[]>((tempAcc, tempCur) => {
            if (tempCur.lat === lat && tempCur.lng === lng) {
              // TODO: 카테고리 여러개일 때 icon
              return [
                ...tempAcc,
                { ...tempCur, spaceId: [...tempCur.spaceId, cur.id], title: undefined, orderNo: cur.orderNo },
              ];
            }
            return tempAcc;
          }, []);
        }

        const category = getMapMarkerIconWithOrderNoSorting(cur.categories);
        if (!category) return acc;

        return [
          ...acc,
          {
            spaceId: [cur.id],
            title: cur.title,
            icon: getMapCategoryIconPath(category),
            replaceDuplicateLocation: true,
            lat,
            lng,
            orderNo: cur.orderNo,
          },
        ];
      }, []);

      addMarkers({ markers, clearBeforeMarkers: true });
    }
  }, [addMarkers, clearMarkers, spaces]);

  return (
    <UnorderedInfiniteScroll
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      isRootContainer
    >
      {spaces.map((space) => (
        <SpaceLocationCard key={space.id} space={space} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default SpaceList;
