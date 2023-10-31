"use client";

import { useParams } from "next/navigation";

import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const { spaceId } = useParams();
  return (
    <BaseHeader
      title={title}
      className={styles.wrapper}
      href={`/spaces/${spaceId}/reservations${location.search.replace("tab=payment", "tab=reservation")}`}
    />
  );
};

export default Header;
