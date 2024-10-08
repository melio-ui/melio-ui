'use client';

import Root from './accordion';
import ArrowIcon from './accordion-arrow-icon';
import Content from './accordion-content';
import Header from './accordion-header';
import Item from './accordion-item';

export { default as AccordionRoot } from './accordion';
export { default as AccordionArrowIcon } from './accordion-arrow-icon';
export { default as AccordionContent } from './accordion-content';
export { default as AccordionHeader } from './accordion-header';
export { default as AccordionItem } from './accordion-item';

export * from './accordion';
export * from './accordion-item';
export * from './accordion-header';
export * from './accordion-content';
export * from './accordion-arrow-icon';

export type { ExpandedIndexType, ExpandedValueType } from './types';

// const Accordion = Object.assign(Root, { Item, Header, Title, Content, ArrowIcon });

export const Accordion = {
  Root,
  Item,
  Header,
  Content,
  ArrowIcon,
};
