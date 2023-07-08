"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import { BackButton } from "@/components";
import { reviewImageIndexState, reviewImageTotalCountState } from "@/states";

import { IconBlackLeftChevronLarge, IconThreeDotsLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { spaceId } = useParams();
  const index = useAtomValue(reviewImageIndexState);
  const totalCount = useAtomValue(reviewImageTotalCountState);

  return (
    <header className={styles.wrapper}>
      <BackButton replaceUrl={`/spaces/${spaceId}/reviews`}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      {totalCount && (
        <h2>
          {index}/{totalCount}
        </h2>
      )}
      <button type="button" className={styles.menuButton}>
        <IconThreeDotsLarge />
      </button>
    </header>
  );
};

export default Header;
