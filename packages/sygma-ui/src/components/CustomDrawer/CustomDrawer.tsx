import React from "react";
import { IDrawerProps } from "@chainsafe/common-components";
import { Drawer } from "../Drawer";
import { useStyles } from "./styles";

interface ICustomDrawerProps extends IDrawerProps {}

const CustomDrawer: React.FC<ICustomDrawerProps> = ({
  children,
  className,
  ...rest
}: ICustomDrawerProps) => {
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
