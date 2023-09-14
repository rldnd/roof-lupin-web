"use client";

import type { ComponentProps, FormEventHandler } from "react";

import cx from "clsx";

import { IconCloseFilled, IconGraySearch } from "public/icons";

import styles from "./searchInput.module.scss";

interface Props extends Omit<ComponentProps<"input">, "onSubmit" | "onReset"> {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onReset?: FormEventHandler<HTMLFormElement>;
}

const SearchInput: React.FC<Props> = ({ className, onSubmit, onReset, value, ...props }) => {
  return (
    <form className={cx(styles.wrapper, className)} onSubmit={onSubmit} onReset={onReset}>
      <input type="search" inputMode="search" value={value} {...props} />
      {!value && (
        <button type="submit" className={styles.searchButton}>
          <IconGraySearch />
        </button>
      )}
      {Boolean(value) && (
        <button type="reset" className={styles.clearButton}>
          <IconCloseFilled />
        </button>
      )}
    </form>
  );
};

export default SearchInput;
