import React from "react";
import { useOnClickOutside } from "@chainsafe/common-theme";
import { makeStyles } from "tss-react/mui";

interface IStyleProps {
  size: number;
}

const useStyles = makeStyles<IStyleProps>()(
  ({ palette, transitions }, props: IStyleProps) => {
    return {
      root: {
        backgroundColor: palette.background.default,
        border: "1px solid",
        borderColor: "#E8E8E8",
        position: "fixed",
        opacity: 0,
        visibility: "hidden",
        transition: `all ${transitions.duration.standard}ms ease`,
        "&.top": {
          top: 0,
          left: 0,
          height: `${props.size}px`,
          width: "100%",
          transform: "translateY(-100%)",
          "&.open": {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
          },
        },
        "&.right": {
          right: 0,
          top: 0,
          height: "100%",
          width: `${props.size}px`,
          transform: "translateX(100%)",
          "&.open": {
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0)",
          },
        },
        "&.bottom": {
          bottom: 0,
          left: 0,
          height: `${props.size}px`,
          width: "100%",
          transform: "translateY(100%)",
          "&.open": {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
          },
        },
        "&.left": {
          left: 0,
          top: 0,
          height: "100%",
          width: `${props.size}px`,
          transform: "translateX(-100%)",
          "&.open": {
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0)",
          },
        },
      },
      backdrop: {
        transition: `all ${transitions.duration.standard}ms`,
        "&.open": {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.25,
          background: "#BFBFBF",
          "&.transparent": {
            background: "transparent",
          },
        },
      },
    };
  }
);

export type Position = "top" | "bottom" | "right" | "left";

export interface IDrawerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  open: boolean;
  position?: Position;
  size?: number;
  backdrop?: boolean;

  onClose?(): void;

  classNames?: {
    backdrop?: string;
  };
}

const SIZE = 360;

const Drawer: React.FC<IDrawerProps> = ({
  children,
  className,
  position = "left",
  open,
  size = SIZE,
  backdrop = true,
  onClose,
  classNames,
}: IDrawerProps) => {
  const { classes, cx } = useStyles({ size });

  const drawerRef = React.useRef(null);

  useOnClickOutside(drawerRef, onClose);

  return (
    <div>
      <div
        className={cx(
          classes.backdrop,
          classNames?.backdrop,
          open && "open",
          !backdrop && "transparent"
        )}
      />
      <div
        className={cx(className, classes.root, position, open && "open")}
        ref={drawerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
