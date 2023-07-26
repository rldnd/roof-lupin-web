"use client";

import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import type { Space } from "@/common/types/space";
import { AuthChecker } from "@/components";
import { useDataToggle } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getHomeSpacesInContentsApi } from "@/services/home";
import { createSpaceInterestApi, deleteSpaceInterestApi } from "@/services/space";

import { IconBookmarkActive, IconBookmarkInactive } from "public/icons";

import styles from "./contentBookmark.module.scss";

interface Props {
  space: Space;
}

const Bookmark: React.FC<Props> = ({ space }) => {
  const { me } = useMe();
  const [isActive, setIsActive] = useState(false);
  const { data: isInterested, refetch } = useQuery(
    ["getHomeSpacesInContents", me],
    () =>
      getHomeSpacesInContentsApi().then((res) =>
        res.data.reduce<Space[]>((acc, cur) => {
          if (cur.type === "CONTENTS") return [...acc, ...cur.contentCategory.spaces];
          else return acc;
        }, []),
      ),
    {
      select: (res) => res.find((item) => item.id === space.id)?.isInterested ?? false,
      enabled: Boolean(me),
    },
  );

  const { mutate: onCreate } = useMutation(createSpaceInterestApi, { onSuccess: () => refetch() });
  const { mutate: onDelete } = useMutation(deleteSpaceInterestApi, { onSuccess: () => refetch() });

  const handleClick = useDataToggle({
    id: space.id,
    isActive,
    isActiveData: isInterested,
    setIsActive,
    onCreate,
    onDelete,
  });

  useEffect(() => {
    if (typeof isInterested === "boolean") setIsActive(isInterested);
  }, [isInterested]);

  return (
    <AuthChecker className={styles.wrapper}>
      <button type="button" onClick={handleClick} className={styles.bookmark}>
        {isActive && <IconBookmarkActive />}
        {!isActive && <IconBookmarkInactive />}
      </button>
    </AuthChecker>
  );
};

export default Bookmark;
