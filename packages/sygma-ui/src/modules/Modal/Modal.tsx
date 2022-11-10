import React, { ReactNode, useRef } from "react";
import {
  ITheme,
  useOnClickOutside,
  // makeStyles,
  createStyles,
} from "@chainsafe/common-theme";
import { makeStyles } from "tss-react/mui";

import clsx from "clsx";
// import { CloseSvg } from "./Close.icon"
import { ReactComponent as CloseSvg } from "../../media/Icons/close.svg";

const useStyles = makeStyles()(
  ({ constants, palette, breakpoints, zIndex, transitions }) => {
    return {
      root: {
        // position: "fixed",
        zIndex: zIndex.appBar,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        opacity: 0,
        visibility: "hidden",
        display: "flex",
        flexDirection: "column",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transitionDuration: `${transitions.duration.standard}ms`,
        transitionProperty: "opacity",
        "&:before": {
          content: "''",
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: constants.modal?.backgroundFade,
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: palette.common.black,
          transitionDuration: `${transitions.duration.standard}ms`,
        },
        "& > *": {
          opacity: 0,
          visibility: "hidden",
          transitionDuration: `${transitions.duration.standard}ms`,
        },
        "&.active": {
          visibility: "visible",
          opacity: 1,
          "& > *": {
            opacity: 1,
            visibility: "visible",
          },
          // ...overrides?.Modal?.active,
        },
        // ...overrides?.Modal?.root,
      },
      inner: {
        ...constants.modal.inner,
        flexGrow: 1,
        display: "flex",
        backgroundColor: "#f0f0f0",
        top: "50%",
        left: "50%",
        position: "absolute",
        borderRadius: `${constants.generalUnit / 2}`,
        transform: "translate(-50%, -50%)",
        "&.xs": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["xs"],
          // ...overrides?.Modal?.inner?.size?.xs,
        },
        "&.sm": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["sm"],
          // ...overrides?.Modal?.inner?.size?.sm,
        },
        "&.md": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["md"],
          // ...overrides?.Modal?.inner?.size?.md,
        },
        "&.lg": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["lg"],
          // ...overrides?.Modal?.inner?.size?.lg,
        },
        "&.xl": {
          width: `calc(100% - ${constants.generalUnit * 2}px)`,
          maxWidth: breakpoints.values["lg"],
          // ...overrides?.Modal?.inner?.size?.xl,
        },
        // ...overrides?.Modal?.inner?.root,
      },
      closeIcon: {
        ...constants.icon,
        width: 15,
        height: 15,
        display: "block",
        top: 0,
        cursor: "pointer",
        position: "absolute",
        "& svg": {
          stroke: palette.common.black,
        },
        "&.right": {
          transform: "translate(-50%, 50%)",
          right: 0,
          // ...overrides?.Modal?.closeIcon?.right,
        },
        "&.left": {
          left: 0,
          transform: "translate(50%, -50%)",
          // ...overrides?.Modal?.closeIcon?.left,
        },
        "&.none": {
          display: "none",
        },
        // ...overrides?.Modal?.closeIcon?.root,
      },
    };
  }
);

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
  const { classes } = useStyles();

  const ref = useRef(null);

  const handleClose = () => {
    onClose && onClose();
  };

  useOnClickOutside(ref, () => onClickOutside && onClickOutside());

  if (!active) return null;

  return (
    <article
      className={clsx(classes.root, className, "active")}
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
        className={clsx(
          classes.inner,
          injectedClass?.inner,
          typeof maxWidth != "number" ? maxWidth : ""
        )}
      >
        {closePosition !== "none" && (
          <div
            onClick={handleClose}
            className={clsx(
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

// export { IModalProps }
