"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { AuthChecker } from "@/components";
import { useDataToggle } from "@/hooks";
import { createSpaceInterestApi, deleteSpaceInterestApi } from "@/services/space";

import { IconBookmarkActive, IconBookmarkInactive } from "public/icons";

import styles from "./bookmark.module.scss";

interface Props {
  isInterested: boolean;
  spaceId: string;
}

const Bookmark: React.FC<Props> = ({ isInterested, spaceId }) => {
  const [isActive, setIsActive] = useState(isInterested);

  const { mutate: onCreate } = useMutation(createSpaceInterestApi);
  const { mutate: onDelete } = useMutation(deleteSpaceInterestApi);

  const handleClick = useDataToggle({
    id: spaceId,
    isActive,
    isActiveData: isInterested,
    setIsActive,
    onCreate,
    onDelete,
  });

  return (
    <AuthChecker className={styles.wrapper} afterLoginPath="/interests">
      <button type="button" onClick={handleClick} className={styles.bookmark}>
        {isActive && <IconBookmarkActive />}
        {!isActive && <IconBookmarkInactive />}
      </button>
    </AuthChecker>
  );
};

export default Bookmark;
