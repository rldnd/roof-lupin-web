"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import { BackButton } from "@/components";
import { reviewImageIndexState, reviewImageTotalCountState } from "@/states";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { spaceId } = useParams();
  const index = useAtomValue(reviewImageIndexState);
  const totalCount = useAtomValue(reviewImageTotalCountState);

  return (
    <header className={styles.wrapper}>
      <BackButton replaceUrl={`/spaces/${spaceId}/reviews`} className={styles.backButton}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      {totalCount && (
        <h2>
          {index + 1}/{totalCount}
        </h2>
      )}
    </header>
  );
};

export default Header;
