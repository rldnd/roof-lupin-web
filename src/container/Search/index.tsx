import { Header, RecentSearch, RecentSpace, RecommendSearch } from "./_sections";

import styles from "./searchContainer.module.scss";

const SearchContainer: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header />
      <RecentSearch />
      <RecommendSearch />
      <RecentSpace />
    </main>
  );
};

export default SearchContainer;
