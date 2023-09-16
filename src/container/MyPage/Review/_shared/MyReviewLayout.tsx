import { type ReactNode } from "react";

import dynamic from "next/dynamic";

import { BaseCenterHeader } from "@/components/Layout";

import { LoadingTabBar } from "./TabBar";

import styles from "./myReviewLayout.module.scss";

const TabBar = dynamic(() => import("./TabBar"), { ssr: false, loading: () => <LoadingTabBar /> });

interface Props {
  children: ReactNode;
}

const MyReviewContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="내 후기" href="/my-page" />
      <TabBar />
      {children}
    </div>
  );
};

export default MyReviewContainer;
