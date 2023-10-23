"use client";

import { useState } from "react";

import { SpaceCallBottomSheet } from "@/components/BottomSheets/Space";

import { Item } from "../Menu";

import styles from "./serviceCenterItem.module.scss";

const ServiceCenterItem: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Item
        right={<span className={styles.desc}>주말 및 공휴일 휴무, 오전 10시~오후 6시 운영</span>}
        onClick={() => setIsShow(true)}
      >
        고객센터
      </Item>
      <SpaceCallBottomSheet isShow={isShow} onClose={() => setIsShow(false)} phoneNumber="07080283628" />
    </>
  );
};

export default ServiceCenterItem;
