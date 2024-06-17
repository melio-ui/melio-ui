import React from 'react';

import Slot from '../internal/components/Slot';
import { ComponentPropsWithoutRef } from '../types/common';

import { ModalContext } from './Modal';

export interface ModalCloseProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>((props, ref) => {
  const { children, asChild, onClick, ...rest } = props;
  const { handleClose } = React.useContext(ModalContext);
  const Component = asChild ? Slot : 'button';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    handleClose();
    onClick?.(event);
  };

  return (
    <Component ref={ref} type="button" onClick={handleClick} {...rest}>
      {children ?? 'Close'}
    </Component>
  );
});

ModalClose.displayName = 'Modal.Close';

export default ModalClose;
