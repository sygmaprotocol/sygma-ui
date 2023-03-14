import React from "react";
import { IModalProps, Modal } from "../../modules";
import { useStyles } from "./styles";

const CustomModal: React.FC<IModalProps> = ({
  children,
  className,
  ...rest
}: IModalProps) => {
  const { classes, cx } = useStyles();

  return (
    <Modal className={cx(classes.root, className)} {...rest}>
      {children}
    </Modal>
  );
};

export default CustomModal;
