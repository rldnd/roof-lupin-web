"use client";

import { type ChangeEventHandler, type FormEventHandler, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { BackButton, SearchInput } from "@/components";

import { IconBlackLeftChevronExtraLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { get } = useSearchParams();
  const { push } = useRouter();
  const [value, setValue] = useState(() => decodeURIComponent(get("keyword") ?? ""));

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    push(`/search/results?keyword=${encodeURIComponent(value)}`);
  };

  const onReset = () => {
    setValue("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton} replaceUrl="/search">
        <IconBlackLeftChevronExtraLarge />
      </BackButton>
      <SearchInput
        className={styles.searchInput}
        placeholder="지역, 공간 이름, 지하철역으로 찾아보세요"
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </header>
  );
};

export default Header;
