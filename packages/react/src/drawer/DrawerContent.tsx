import React from 'react';

import Modal, { ModalContentProps } from '../modal';
import { DrawerContext } from './Drawer';

export interface DrawerContentProps extends ModalContentProps {}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>((props, ref) => {
  const { placement } = React.useContext(DrawerContext);

  return <Modal.Content ref={ref} data-placement={placement} {...props} />;
});

DrawerContent.displayName = 'Drawer.Content';

export default DrawerContent;
