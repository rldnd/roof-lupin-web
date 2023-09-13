"use client";

import { SOCIAL_ICON_MAPPER, SOCIAL_TYPE_MAPPER } from "@/common/constants";
import { useMe } from "@/hooks/queries";

import Item from "./Item";

import styles from "./email.module.scss";

const Email: React.FC = () => {
  const { me } = useMe();

  if (!me) return null;

  return (
    <Item
      label="이메일"
      placeholder="이메일"
      disabled
      right={
        <div className={styles.socialType}>
          {SOCIAL_ICON_MAPPER[me.socialType]}
          <span>{SOCIAL_TYPE_MAPPER[me.socialType]} 연동</span>
        </div>
      }
    >
      {me?.email}
    </Item>
  );
};

export default Email;
