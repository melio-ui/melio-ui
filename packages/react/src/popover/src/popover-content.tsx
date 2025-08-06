import React from 'react';

import { Popper } from '@mangoui/popper';
import { useMergedRef } from '@mangoui/use-merged-ref';

import setRef from '../../internal/set-ref';

import { PopoverContext } from './popover';
import { getTargetEl } from './utils/get-target-el';

export interface PopoverContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popper.Content>, 'onPlaced'> {
  /**
   * Close 될 때 Popover 컴포넌트 DOM 제거
   * forceMount=true 시 unabled 됨
   * @default true
   */
  destroyOnClose?: boolean;
  forceMount?: boolean;
  /** ESC 키 사용시 close
   * @default true
   */
  closeOnEsc?: boolean;
  closeOnBlur?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const {
    style,
    destroyOnClose = true,
    forceMount,
    closeOnEsc = true,
    closeOnBlur = true,
    children,
    onBlur,
    onKeyDown,
    ...rest
  } = props;
  const { open, triggerRef, onClose } = React.useContext(PopoverContext);

  const popoverContentRef = React.useRef<HTMLDivElement>(null);
  const popoverContentMergedRef = useMergedRef(popoverContentRef, ref);

  const initialize = React.useRef<boolean>(true);

  // onBlur 시 close
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    const target = (event.target ?? event.currentTarget) as HTMLElement;
    const { activeElement } = target.ownerDocument;
    const relatedTarget = (event.relatedTarget ?? activeElement) as HTMLElement;

    const targetIsPopover =
      popoverContentRef.current === relatedTarget ||
      popoverContentRef.current?.contains(relatedTarget);

    const _targetEl = getTargetEl(triggerRef.current);
    const targetIsTarget = _targetEl === relatedTarget || _targetEl.contains(relatedTarget);
    // // !triggerRef.current && position 으로 위치 제어 하는 경우 targetIsTarget 은 의미 없으므로 false
    // if (!triggerRef.current && position?.top !== undefined && position?.left !== undefined) {
    //   targetIsTarget = false;
    // }

    // targetIsTarget 이 true 인 경우는 PopoverTrigger 에서 처리 - 여기서는 작동안하도록 처리
    const isValidBlur = !targetIsPopover && !targetIsTarget;
    if (open && closeOnBlur && isValidBlur) {
      onClose();
    }

    onBlur?.(event);
  };

  // Esc 키 down 시 blur(blur 시 close)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (closeOnEsc && event.key === 'Escape') {
      onClose();
    }

    onKeyDown?.(event);
  };

  const handleRef = React.useCallback(
    (node: any) => {
      setRef(popoverContentMergedRef, node);
    },
    [popoverContentMergedRef],
  );

  React.useEffect(() => {
    if (open) {
      initialize.current = false;
      popoverContentRef.current?.focus();
    }
  }, [open]);

  if (initialize.current && !open && !forceMount) {
    return null;
  }

  if (!open && !forceMount && destroyOnClose) {
    return null;
  }

  return (
    <Popper.Content
      data-state={open ? 'open' : 'closed'}
      {...rest}
      ref={handleRef}
      role="dialog"
      tabIndex={-1}
      style={{
        display: open ? undefined : 'none',
        ...style,
        ...{
          '--mango-popover-content-transform-origin': 'var(--mango-popper-transform-origin)',
          '--mango-popover-content-available-width': 'var(--mango-popper-available-width)',
          '--mango-popover-content-available-height': 'var(--mango-popper-available-height)',
          '--mango-popover-trigger-width': 'var(--mango-popper-anchor-width)',
          '--mango-popover-trigger-height': 'var(--mango-popper-anchor-height)',
        },
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Popper.Content>
  );
});

PopoverContent.displayName = 'Popover.Content';

export default PopoverContent;
