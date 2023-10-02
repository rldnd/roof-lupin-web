"use client";

import { memo, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { LOCATION_PAGE_MAP_ID } from "@/common/constants";
import { BaseHeader } from "@/components/Layout";
import { useMapInfo } from "@/hooks";
import { getLocationCoordinateApi } from "@/services/location";

import { IconPosition } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const [address, setAddress] = useState("");

  const { lat, lng } = useMapInfo(LOCATION_PAGE_MAP_ID);

  const { data } = useQuery(["getLocationCoordinate", lat, lng], () =>
    getLocationCoordinateApi({
      latitude: lat,
      longitude: lng,
    }).then((res) => res.data),
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

export default memo(Header);
