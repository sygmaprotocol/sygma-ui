import React from "react";
import { IModalProps, Modal } from "../../modules";

import { useStyles } from "./styles";

interface ICustomModalProps extends IModalProps {}

const CustomModal: React.FC<ICustomModalProps> = ({
  children,
  className,
  ...rest
}: ICustomModalProps) => {
  const { classes, cx } = useStyles();

  return (
    <Modal className={cx(classes.root, className)} {...rest}>
      {children}
    </Modal>
  );
};

export default CustomModal;
