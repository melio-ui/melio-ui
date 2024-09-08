'use client';

import { Dialog } from '@melio-ui/dialog';

import Root from './drawer';
import Content from './drawer-content';

export {
  DialogTrigger as DrawerTrigger,
  DialogPortal as DrawerPortal,
  DialogClose as DrawerClose,
  DialogBackdrop as DrawerBackdrop,
} from '@melio-ui/dialog';

export { default as DrawerRoot } from './drawer';
export { default as DrawerContent } from './drawer-content';

export * from './drawer';
export * from './drawer-content';

export type {
  DialogTriggerProps as DrawerTriggerProps,
  DialogPortalProps as DrawerPortalProps,
  DialogCloseProps as DrawerCloseProps,
  DialogBackdropProps as DrawerBackdropProps,
} from '@melio-ui/dialog';

export const Drawer = {
  Root,
  Trigger: Dialog.Trigger,
  Portal: Dialog.Portal,
  Content,
  Close: Dialog.Close,
  Backdrop: Dialog.Backdrop,
};
