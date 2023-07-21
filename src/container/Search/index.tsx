import { Header, RecentSearch } from "./_sections";

import styles from "./searchContainer.module.scss";

const SearchContainer: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header />
      <RecentSearch />
      <section className={styles.recommendSearch}></section>
      <section className={styles.recentSpace}></section>
    </main>
  );
};

export default SearchContainer;
