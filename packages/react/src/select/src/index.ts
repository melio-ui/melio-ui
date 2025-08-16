'use client';

// import Arrow from './select-arrow';
import Content from './content/select-content';
import Group from './group/select-group';
import Icon from './icon/select-icon';
import ItemIndicator from './item-indicator/select-item-indicator';
import ItemText from './item-text/select-item-text';
import Item from './item/select-item';
import Label from './label/select-label';
import Portal from './portal/select-portal';
import Root from './root/select-root';
import ScrollDownButton from './scroll-down-button/select-scroll-down-button';
import ScrollUpButton from './scroll-up-button/select-scroll-up-button';
import Separator from './separator/select-separator';
import Trigger from './trigger/select-trigger';
import Value from './value/select-value';
import Viewport from './viewport/select-viewport';

export { default as SelectRoot } from './root/select-root';
export { default as SelectTrigger } from './trigger/select-trigger';
export { default as SelectContent } from './content/select-content';
export { default as SelectItem } from './item/select-item';
export { default as SelectItemText } from './item-text/select-item-text';
export { default as SelectItemIndicator } from './item-indicator/select-item-indicator';
export { default as SelectLabel } from './label/select-label';
export { default as SelectGroup } from './group/select-group';
export { default as SelectViewport } from './viewport/select-viewport';
export { default as SelectSeparator } from './separator/select-separator';
export { default as SelectPortal } from './portal/select-portal';
export { default as SelectValue } from './value/select-value';
export { default as SelectIcon } from './icon/select-icon';
export { default as SelectScrollDownButton } from './scroll-down-button/select-scroll-down-button';
export { default as SelectScrollUpButton } from './scroll-up-button/select-scroll-up-button';
// export { default as SelectArrow } from './select-arrow';

export * from './root/select-root';
export * from './trigger/select-trigger';
export * from './content/select-content';
export * from './item/select-item';
export * from './item-text/select-item-text';
export * from './item-indicator/select-item-indicator';
export * from './label/select-label';
export * from './group/select-group';
export * from './viewport/select-viewport';
export * from './separator/select-separator';
export * from './portal/select-portal';
export * from './value/select-value';
export * from './icon/select-icon';
export * from './scroll-down-button/select-scroll-down-button';
export * from './scroll-up-button/select-scroll-up-button';
// export * from './select-arrow';

export const Select = {
  Root,
  Trigger,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  Label,
  Group,
  Viewport,
  Separator,
  Portal,
  Value,
  Icon,
  ScrollDownButton,
  ScrollUpButton,
};
