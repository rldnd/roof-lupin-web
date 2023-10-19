"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { Checkbox } from "@/components/Common";
import type { Props as CheckboxProps } from "@/components/Common/Checkbox";

import styles from "./checkMenuItem.module.scss";

interface Props extends CheckboxProps {
  wrapperClassName?: string;
}

const CheckMenuItem: React.FC<Props> = ({ wrapperClassName, ...props }) => {
  return (
    <li className={cx(styles.wrapper, wrapperClassName)}>
      <button type="button" className={styles.button}>
        <Checkbox className={styles.checkbox} {...props} />
      </button>
    </li>
  );
};

export default CheckMenuItem;

export const LoadingCheckMenuItem: React.FC = () => {
  return (
    <li className={styles.wrapper}>
      <Skeleton width="100%" height={44} />
    </li>
  );
};
