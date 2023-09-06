import { type ReactNode } from "react";

import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingTabBar } from "./TabBar";

import styles from "./myReviewLayout.module.scss";

const TabBar = dynamic(() => import("./TabBar"), { ssr: false, loading: () => <LoadingTabBar /> });

interface Props {
  children: ReactNode;
}

const MyReviewContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TabBar />
      {children}
    </div>
  );
};

export default MyReviewContainer;
