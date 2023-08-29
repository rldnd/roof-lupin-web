"use client";

import { usePlatform } from "@/hooks";

import { Item } from "../Menu";

const AppVersionItem: React.FC = () => {
  const { isWebview } = usePlatform();
  if (!isWebview) return null;

  return <Item right={<span>이거 해야함</span>}>앱 버전 정보</Item>;
};

export default AppVersionItem;
