import cx from "clsx";

import type { Props as BottomSheetPortalProps } from "./BottomSheetPortal";

import { IconClose } from "public/icons";

import { BottomSheetPortal } from ".";

import styles from "./baseBottomSheet.module.scss";

interface Props extends BottomSheetPortalProps {
  title?: string;
}

const BaseBottomSheet: React.FC<Props> = ({ className, children, title, onClose, ...props }) => {
  return (
    <BottomSheetPortal className={cx(styles.wrapper, className)} onClose={onClose} {...props}>
      <header className={styles.header}>
        {title && <h1>{title}</h1>}
        {onClose && (
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <IconClose />
          </button>
        )}
      </header>
      <div className={cx(styles.content, className)}>{children}</div>
    </BottomSheetPortal>
  );
};

export default BaseBottomSheet;
