import type { MouseEventHandler, ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import styles from "./item.module.scss";

interface LinkProps {
  children: ReactNode;
  right?: ReactNode;
  href: string;
}

interface ButtonProps {
  children: ReactNode;
  right?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface NotInteractionProps {
  children: ReactNode;
  right?: ReactNode;
}

type Props = LinkProps | NotInteractionProps | ButtonProps;

const Item: React.FC<Props> = (props) => {
  if ("href" in props)
    return (
      <Link href={props.href} className={cx(styles.wrapper, { [styles.hasRight]: Boolean(props.right) })}>
        {props.children}
        {Boolean(props?.right) && props.right}
      </Link>
    );

  if ("onClick" in props)
    return (
      <button
        type="button"
        className={cx(styles.wrapper, { [styles.hasRight]: Boolean(props.right) })}
        onClick={props.onClick}
      >
        {props.children}
        {Boolean(props?.right) && props.right}
      </button>
    );

  return (
    <div className={cx(styles.wrapper, { [styles.hasRight]: Boolean(props.right) })}>
      {props.children}
      {Boolean(props?.right) && props.right}
    </div>
  );
};

export default Item;
