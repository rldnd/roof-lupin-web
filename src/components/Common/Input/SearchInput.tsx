"use client";

import type { ComponentProps, FormEventHandler } from "react";

import cx from "clsx";

import { IconGraySearch } from "public/icons";

import styles from "./searchInput.module.scss";

interface Props extends Omit<ComponentProps<"input">, "onSubmit"> {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const SearchInput: React.FC<Props> = ({ className, onSubmit, ...props }) => {
  return (
    <form className={cx(styles.wrapper, className)} onSubmit={onSubmit}>
      <input type="text" {...props} />
      <button type="submit" className={styles.searchButton}>
        <IconGraySearch />
      </button>
    </form>
  );
};

export default SearchInput;
