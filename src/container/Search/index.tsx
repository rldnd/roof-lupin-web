import { Header } from "./_sections";

import styles from "./searchContainer.module.scss";

const SearchContainer: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header />
    </main>
  );
};

export default SearchContainer;
