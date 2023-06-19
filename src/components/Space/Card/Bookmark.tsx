"use client";

import type { Space } from "@/common/types/space";
import { AuthChecker, DataToggleButton } from "@/components";
import { getHomeSpacesInContentsApi } from "@/services/home";
import { createSpaceInterestApi, deleteSpaceInterestApi } from "@/services/space";

import { IconBookmarkActive, IconBookmarkInactive } from "public/icons";

import styles from "./bookmark.module.scss";

interface Props {
  space: Space;
}

const Bookmark: React.FC<Props> = ({ space }) => {
  return (
    <AuthChecker className={styles.wrapper}>
      <DataToggleButton
        id={space.id}
        className={styles.bookmark}
        queryKey={["getHomeSpacesInContents"]}
        activeFn={createSpaceInterestApi}
        inactiveFn={deleteSpaceInterestApi}
        queryFn={getHomeSpacesInContentsApi}
        dataKey={{ idKey: "id", valueKey: "isInterested" }}
      >
        <IconBookmarkActive />
        <IconBookmarkInactive />
      </DataToggleButton>
    </AuthChecker>
  );
};

export default Bookmark;
