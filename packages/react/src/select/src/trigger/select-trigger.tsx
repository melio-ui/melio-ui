import React from 'react';

import { useComposedRefs } from '@mangoui/compose-refs/src/composeRefs';
import { Popper } from '@mangoui/popper';
import { Slot } from '@mangoui/slot';

import { useSelectRootContext } from '../root/select-root-context';

export type SelectTriggerElement = HTMLDivElement;

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean;
  asChild?: boolean;
}

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>((props, ref) => {
  const rootContext = useSelectRootContext();

  const {
    disabled = rootContext.disabled,
    children,
    asChild = false,
    onClick,
    onPointerDown,
    ...triggerProps
  } = props;

  const Component = asChild ? Slot : 'div';

  const composedRefs = useComposedRefs(ref, rootContext.onTriggerChange);
  const pointerTypeRef = React.useRef<React.PointerEvent['pointerType']>('touch');

  const handleOpen = (pointerEvent?: React.MouseEvent | React.PointerEvent): void => {
    if (!disabled) {
      rootContext.onOpenChange(true);
    }

    if (pointerEvent) {
      rootContext.triggerPointerDownPosRef.current = {
        x: Math.round(pointerEvent.pageX),
        y: Math.round(pointerEvent.pageY),
      };
    }
  };

  return (
    <Popper.Anchor asChild>
      <Component
        ref={composedRefs}
        role="combobox"
        aria-controls={rootContext.contentId}
        aria-expanded={rootContext.open}
        aria-required={rootContext.required}
        aria-autocomplete="none"
        aria-readonly={rootContext.readOnly || undefined}
        dir={rootContext.dir}
        data-state={rootContext.open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        data-placeholder={
          rootContext.value === '' || rootContext.value === undefined ? '' : undefined
        }
        {...triggerProps}
        tabIndex={disabled ? -1 : 0}
        onClick={(event) => {
          // event.currentTarget.focus();

          // Open on click when using a touch or pen device
          if (pointerTypeRef.current !== 'mouse') {
            handleOpen(event);
          }
          onClick?.(event);
        }}
        onPointerDown={(event) => {
          pointerTypeRef.current = event.pointerType;

          // prevent implicit pointer capture
          // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }

          // 마우스 왼쪽 버튼 + Ctrl키가 눌리지 않은 상태에서만 처리
          if (event.button === 0 && !event.ctrlKey && event.pointerType === 'mouse') {
            handleOpen(event);
            // prevent trigger from stealing focus from the active item after opening.
            event.preventDefault();
          }
          onPointerDown?.(event);
        }}
      >
        {children}
      </Component>
    </Popper.Anchor>
  );
});

SelectTrigger.displayName = 'Select.Trigger';

export default SelectTrigger;
