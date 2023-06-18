"use client";

import { useLayoutEffect } from "react";

import styles from "./naverMap.module.scss";

interface Props {
  id: string;
}

const NaverMap: React.FC<Props> = ({ id }) => {
  const map = new naver.maps.Map(id);

  return <></>;
};

export default NaverMap;
