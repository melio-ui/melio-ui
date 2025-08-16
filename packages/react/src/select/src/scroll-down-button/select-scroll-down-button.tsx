import React from 'react';

import { Slot } from '@mangoui/slot';

import { useSelectContentContext } from '../content/select-content-context';

export interface SelectScrollDownButtonProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export type SelectScrollDownButtonElement = HTMLDivElement;

const SelectScrollDownButton = React.forwardRef<
  SelectScrollDownButtonElement,
  SelectScrollDownButtonProps
>((props, ref) => {
  const { children, asChild = false, ...scrollDownButtonProps } = props;

  const Component = asChild ? Slot : 'div';

  const contentContext = useSelectContentContext();
  const [canScrollDown, setCanScrollDown] = React.useState(false);

  React.useLayoutEffect(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      const viewport = contentContext.viewport;
      function handleScroll(): void {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        // we use Math.ceil here because if the UI is zoomed-in
        // `scrollTop` is not always reported as an integer
        const canScrollDown = Math.ceil(viewport.scrollTop) < maxScroll;
        console.log('canScrollDown', viewport.scrollHeight, viewport.clientHeight);
        setCanScrollDown(canScrollDown);
      }
      handleScroll();
      viewport.addEventListener('scroll', handleScroll);
      return () => {
        viewport.removeEventListener('scroll', handleScroll);
      };
    }
  }, [contentContext.isPositioned, contentContext.viewport]);

  return canScrollDown ? (
    <Component
      aria-hidden
      {...scrollDownButtonProps}
      ref={ref}
      onClick={() => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }}
    >
      {children ?? '˅'}
    </Component>
  ) : null;
});

SelectScrollDownButton.displayName = 'Select.ScrollDownButton';

export default SelectScrollDownButton;
