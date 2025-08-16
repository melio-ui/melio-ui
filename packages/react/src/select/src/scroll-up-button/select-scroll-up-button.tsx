import React from 'react';

import { Slot } from '@mangoui/slot';

import { useSelectContentContext } from '../content/select-content-context';

export interface SelectScrollUpButtonProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export type SelectScrollUpButtonElement = HTMLDivElement;

const SelectScrollUpButton = React.forwardRef<
  SelectScrollUpButtonElement,
  SelectScrollUpButtonProps
>((props, ref) => {
  const { children, asChild = false, ...scrollUpButtonProps } = props;

  const Component = asChild ? Slot : 'div';

  const contentContext = useSelectContentContext();
  const [canScrollUp, setCanScrollUp] = React.useState(false);

  React.useLayoutEffect(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      const viewport = contentContext.viewport;
      function handleScroll(): void {
        const canScrollUp = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp);
      }
      handleScroll();
      viewport.addEventListener('scroll', handleScroll);
      return () => {
        viewport.removeEventListener('scroll', handleScroll);
      };
    }
  }, [contentContext.isPositioned, contentContext.viewport]);

  return canScrollUp ? (
    <Component
      aria-hidden
      {...scrollUpButtonProps}
      ref={ref}
      onClick={() => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }}
    >
      {children ?? '˄'}
    </Component>
  ) : null;
});

SelectScrollUpButton.displayName = 'Select.ScrollUpButton';

export default SelectScrollUpButton;
