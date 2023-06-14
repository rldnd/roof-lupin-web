"use client";

import { AuthChecker, BackButton, DataToggleButton } from "@/components";
import { createSpaceInterestApi, deleteSpaceInterestApi, getSpaceInterestedApi } from "@/services/space";

import { IconBack, IconBookmarkActive, IconBookmarkInactive, IconShare } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  spaceId: string;
}

const Header: React.FC<Props> = ({ spaceId }) => {
  return (
    <header className={styles.wrapper}>
      <BackButton>
        <IconBack />
      </BackButton>
      <menu>
        <li>
          <button type="button">
            <IconShare />
          </button>
        </li>
        <li>
          <AuthChecker>
            <DataToggleButton
              id={spaceId}
              queryKey={["getSpaceInterested", spaceId]}
              hasQueryFnIdArg
              dataKey={{ valueKey: "isInterested" }}
              queryFn={getSpaceInterestedApi}
              className={styles.bookmark}
              activeFn={createSpaceInterestApi}
              inactiveFn={deleteSpaceInterestApi}
            >
              <IconBookmarkActive />
              <IconBookmarkInactive />
            </DataToggleButton>
          </AuthChecker>
        </li>
      </menu>
    </header>
  );
};

export default Header;
