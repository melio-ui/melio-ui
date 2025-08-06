import React from 'react';

import { Popper } from '@mangoui/popper';
import { useMergedRef } from '@mangoui/use-merged-ref';

import setRef from '../../internal/set-ref';

import { DropdownContext } from './dropdown';
import { getTargetEl } from './utils/get-target-el';

export interface DropdownContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popper.Content>, 'onPlaced'> {
  /**
   * Close 될 때 Dropdown 컴포넌트 DOM 제거
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
  /**
   * DropdownItem 클릭시 close
   * @default true
   */
  closeOnItemClick?: boolean;
}

export interface DropdownContentContextValue {
  closeOnItemClick?: boolean;
}
export const DropdownContentContext = React.createContext<DropdownContentContextValue>({
  closeOnItemClick: true,
});

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>((props, ref) => {
  const {
    style,
    destroyOnClose = true,
    forceMount,
    closeOnEsc = true,
    closeOnBlur = true,
    closeOnItemClick = true,
    children,
    onBlur,
    onKeyDown,
    ...rest
  } = props;

  const { open, triggerRef, onClose } = React.useContext(DropdownContext);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentMergedRef = useMergedRef(contentRef, ref);

  const initialize = React.useRef<boolean>(true);

  // onBlur 시 close
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    const target = (event.target ?? event.currentTarget) as HTMLElement;
    const { activeElement } = target.ownerDocument;
    const relatedTarget = (event.relatedTarget ?? activeElement) as HTMLElement;

    const targetIsContent =
      contentRef.current === relatedTarget || contentRef.current?.contains(relatedTarget);

    const _targetEl = getTargetEl(triggerRef.current);
    const targetIsTarget = _targetEl === relatedTarget || _targetEl.contains(relatedTarget);
    // // !triggerRef.current && position 으로 위치 제어 하는 경우 targetIsTarget 은 의미 없으므로 false
    // if (!triggerRef.current && position?.top !== undefined && position?.left !== undefined) {
    //   targetIsTarget = false;
    // }

    // targetIsTarget 이 true 인 경우는 DropdownTrigger 에서 처리 - 여기서는 작동안하도록 처리
    const isValidBlur = !targetIsContent && !targetIsTarget;
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
      setRef(contentMergedRef, node);
    },
    [contentMergedRef],
  );

  React.useEffect(() => {
    if (open) {
      initialize.current = false;
      contentRef.current?.focus();
    }
  }, [open]);

  const contextValue = React.useMemo(
    () => ({
      closeOnItemClick,
    }),
    [closeOnItemClick],
  );

  if (initialize.current && !open && !forceMount) {
    return null;
  }

  if (!open && !forceMount && destroyOnClose) {
    return null;
  }

  return (
    <DropdownContentContext.Provider value={contextValue}>
      <Popper.Content
        data-state={open ? 'open' : 'closed'}
        {...rest}
        ref={handleRef}
        role="menu"
        tabIndex={-1}
        style={{
          display: open ? undefined : 'none',
          ...style,
          ...{
            '--mango-dropdown-content-transform-origin': 'var(--mango-popper-transform-origin)',
            '--mango-dropdown-content-available-width': 'var(--mango-popper-available-width)',
            '--mango-dropdown-content-available-height': 'var(--mango-popper-available-height)',
            '--mango-dropdown-trigger-width': 'var(--mango-popper-anchor-width)',
            '--mango-dropdown-trigger-height': 'var(--mango-popper-anchor-height)',
          },
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Popper.Content>
    </DropdownContentContext.Provider>
  );
});

DropdownContent.displayName = 'Dropdown.Content';

export default DropdownContent;
