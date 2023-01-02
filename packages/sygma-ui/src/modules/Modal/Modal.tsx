import React, { ReactNode, useRef } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

import { ReactComponent as CloseSvg } from "../../media/Icons/close.svg";

import { useStyles } from "./styles";

interface IModalClasses {
  inner?: string;
  closeIcon?: string;
}

export interface IModalProps {
  className?: string;
  active: boolean;
  injectedClass?: IModalClasses;
  closePosition?: "left" | "right" | "none";
  children?: ReactNode | ReactNode[];
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  onModalBodyClick?: (e: React.MouseEvent) => void;
  onClickOutside?: (e?: React.MouseEvent) => void;
  testId?: string;
  onClose?: () => void;
}

const Modal = ({
  children,
  className = "",
  closePosition = "right",
  injectedClass,
  active = false,
  maxWidth = "sm",
  onModalBodyClick,
  testId,
  onClose,
  onClickOutside,
}: IModalProps) => {
  const { classes, cx } = useStyles();

  const ref = useRef(null);

  const handleClose = () => {
    onClose && onClose();
  };

  useOnClickOutside(ref, () => onClickOutside && onClickOutside());

  if (!active) return null;

  return (
    <article
      className={cx(classes.root, className, "active")}
      onClick={onModalBodyClick}
    >
      <section
        data-testid={`modal-container-${testId}`}
        ref={ref}
        style={
          maxWidth && typeof maxWidth == "number"
            ? {
                width: "100%",
                maxWidth: maxWidth,
              }
            : {}
        }
        className={cx(
          classes.inner,
          injectedClass?.inner,
          typeof maxWidth != "number" ? maxWidth : ""
        )}
      >
        {closePosition !== "none" && (
          <div
            onClick={handleClose}
            className={cx(
              classes.closeIcon,
              injectedClass?.closeIcon,
              closePosition
            )}
          >
            <CloseSvg />
          </div>
        )}
        {children}
      </section>
    </article>
  );
};

export default Modal;
