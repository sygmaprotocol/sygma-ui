import React from "react";
import { Drawer } from "../Drawer";
import { useStyles } from "./styles";

export declare type Position = "top" | "bottom" | "right" | "left";

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

const CustomDrawer: React.FC<IDrawerProps> = ({
  children,
  className,
  ...rest
}: IDrawerProps) => {
  const { classes, cx } = useStyles();

  return (
    <Drawer
      classNames={{
        backdrop: classes.backdrop,
      }}
      className={cx(classes.root, className)}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
