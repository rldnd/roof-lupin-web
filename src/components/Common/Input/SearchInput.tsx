"use client";

import type { ComponentProps, FormEventHandler, MouseEventHandler } from "react";

import cx from "clsx";

import { IconCloseFilled, IconGraySearch } from "public/icons";

import styles from "./searchInput.module.scss";

interface Props extends Omit<ComponentProps<"input">, "onSubmit"> {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onClickClear?: MouseEventHandler<HTMLButtonElement>;
}

const SearchInput: React.FC<Props> = ({ className, onSubmit, onClickClear, ...props }) => {
  return (
    <form className={cx(styles.wrapper, className)} onSubmit={onSubmit}>
      <input type="text" {...props} />
      <button type="submit" className={styles.searchButton}>
        <IconGraySearch />
      </button>
      <button type="reset" className={styles.clearButton} onClick={onClickClear}>
        <IconCloseFilled />
      </button>
    </form>
  );
};

export default SearchInput;
