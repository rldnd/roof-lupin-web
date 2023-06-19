import type { ReactNode } from "react";

import type { HomeContent } from "@/common/types/home";
import { ArrowLink, HorizonDraggable } from "@/components";

import styles from "./contentList.module.scss";

interface Props {
  content: Omit<HomeContent, "spaces">;
  children: ReactNode;
}

const ContentList: React.FC<Props> = ({ content, children }) => {
  return (
    <section className={styles.wrapper} aria-label={`#${content.highlight} ${content.name}`}>
      <header className={styles.header}>
        <h2>
          <span>#{content.highlight}</span> {content.name}
        </h2>
        <ArrowLink href="/">더보기</ArrowLink>
      </header>
      <HorizonDraggable className={styles.list}>{children}</HorizonDraggable>
    </section>
  );
};

export default ContentList;
