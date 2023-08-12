"use client";

import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { AuthChecker } from "@/components";
import { useDataToggle } from "@/hooks";
import { createSpaceInterestApi, deleteSpaceInterestApi } from "@/services/space";

import { IconBookmarkActive, IconBookmarkInactive } from "public/icons";

import styles from "./spaceBookmark.module.scss";

interface Props {
  id: string;
  initialIsInterested: boolean;
  refetch: () => Promise<unknown>;
}

const SpaceBookmark: React.FC<Props> = ({ id, initialIsInterested, refetch }) => {
  const [isActive, setIsActive] = useState(initialIsInterested);

  const { mutate: onCreate } = useMutation(createSpaceInterestApi, { onSuccess: () => refetch() });
  const { mutate: onDelete } = useMutation(deleteSpaceInterestApi, { onSuccess: () => refetch() });

  const handleClick = useDataToggle({
    id,
    isActive,
    isActiveData: initialIsInterested,
    setIsActive,
    onCreate,
    onDelete,
  });

  useEffect(() => {
    if (typeof initialIsInterested === "boolean") setIsActive(initialIsInterested);
  }, [initialIsInterested]);

  return (
    <AuthChecker className={styles.wrapper}>
      <button type="button" onClick={handleClick} className={styles.bookmark}>
        {Boolean(isActive) && <IconBookmarkActive />}
        {!isActive && <IconBookmarkInactive />}
      </button>
    </AuthChecker>
  );
};

export default SpaceBookmark;
