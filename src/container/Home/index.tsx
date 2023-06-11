"use client";

import Carousel from "./Carousel";
import Header from "./Header";

import styles from "./homePage.module.scss";

const HomeContainer: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header />
      <Carousel />
      <div style={{ height: "2000px" }}>sdf</div>
    </main>
  );
};

export default HomeContainer;
