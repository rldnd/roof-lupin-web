import type { ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import styles from "./item.module.scss";

interface LinkProps {
  children: ReactNode;
  right?: ReactNode;
  href: string;
}

interface NotInteractionProps {
  children: ReactNode;
  right?: ReactNode;
}

type Props = LinkProps | NotInteractionProps;

const Item: React.FC<Props> = (props) => {
  if ("href" in props)
    return (
      <Link href={props.href} className={cx(styles.wrapper, { [styles.hasRight]: Boolean(props.right) })}>
        {props.children}
        {Boolean(props?.right) && props.right}
      </Link>
    );

  return (
    <div className={cx(styles.wrapper, { [styles.hasRight]: Boolean(props.right) })}>
      {props.children}
      {Boolean(props?.right) && props.right}
    </div>
  );
};

export default Item;
