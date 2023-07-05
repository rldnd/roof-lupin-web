"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { BaseHeader } from "@/components/Layout";
import { getLocationCoordinateApi } from "@/services/location";
import { mapCenterState } from "@/states/location";

import { IconPosition } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const [address, setAddress] = useState("");
  const mapCenter = useAtomValue(mapCenterState);
  const { data } = useQuery(
    ["getLocationCoordinate", mapCenter[LOCATION_PAGE_MAP_ID]],
    () =>
      getLocationCoordinateApi({
        latitude: mapCenter[LOCATION_PAGE_MAP_ID].lat,
        longitude: mapCenter[LOCATION_PAGE_MAP_ID].lng,
      }).then((res) => res.data),
    {
      enabled: LOCATION_PAGE_MAP_ID in mapCenter,
    },
  );

  useEffect(() => {
    if (!data?.address) return;
    setAddress(data.address);
  }, [data?.address]);

  return (
    <BaseHeader
      title={
        <>
          <IconPosition />
          <span className={styles.title}>{address}</span>
        </>
      }
      backHidden
    />
  );
};

export default Header;
