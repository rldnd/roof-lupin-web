import cx from "clsx";

import type { Props as BottomSheetPortalProps } from "./BottomSheetPortal";

import { IconClose } from "public/icons";

import { BottomSheetPortal } from ".";

import styles from "./baseBottomSheet.module.scss";

interface Props extends BottomSheetPortalProps {
  title?: string;
  isHeightMax?: boolean;
  isHeightMin?: boolean;
  hideHeader?: boolean;
}

const BaseBottomSheet: React.FC<Props> = ({
  wrapperClassName,
  className,
  children,
  title,
  onClose,
  isHeightMax = false,
  isHeightMin = false,
  hideHeader = false,
  ...props
}) => {
  return (
    <BottomSheetPortal
      className={cx(styles.wrapper, wrapperClassName, {
        [styles.isHeightMax]: isHeightMax,
        [styles.isHeightMin]: isHeightMin,
      })}
      onClose={onClose}
      {...props}
    >
      <header className={styles.header}>
        {title && <h1>{title}</h1>}
        {onClose && !hideHeader && (
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
