import React from 'react';

import {
  DropdownClose as MDropdownClose,
  DropdownContent as MDropdownContent,
  DropdownItem as MDropdownItem,
  DropdownPortal as MDropdownPortal,
  DropdownRoot as MDropdownRoot,
  DropdownTrigger as MDropdownTrigger,
} from '@melio-ui/dropdown';

import { cn } from '@/shared/utils/cn';

export const DropdownRoot = MDropdownRoot;
export const DropdownPortal = MDropdownPortal;
export const DropdownTrigger = MDropdownTrigger;
export const DropdownClose = MDropdownClose;

interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof MDropdownContent> {}
export function DropdownContent({ className, ...props }: DropdownContentProps) {
  return (
    <MDropdownContent
      {...props}
      className={cn(
        'absolute bg-slate-500',
        'rounded border border-slate-600 shadow-sm',
        'focus:outline-0',
        className,
      )}
    />
  );
}

interface DropdownItemProps extends React.ComponentPropsWithoutRef<typeof MDropdownItem> {}
export function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <MDropdownItem
      {...props}
      className={cn(
        'flex cursor-pointer px-4 py-2',
        'border-b-0 leading-4',
        'hover:bg-slate-400',
        'data-[disabled]:pointer-events-none data-[disabled]:cursor-default data-[disabled]:opacity-45',
        className,
      )}
    />
  );
}

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Portal: DropdownPortal,
  Content: DropdownContent,
  Item: DropdownItem,
  Close: DropdownClose,
};
