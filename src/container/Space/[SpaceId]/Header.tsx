"use client";

import { AuthChecker, BackButton } from "@/components";

import { IconBack, IconBookmarkActive, IconBookmarkInactive, IconShare } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
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
            {/* <DataToggleButton> */}
            <IconBookmarkActive />
            <IconBookmarkInactive />
            {/* </DataToggleButton> */}
          </AuthChecker>
        </li>
      </menu>
    </header>
  );
};

export default Header;
