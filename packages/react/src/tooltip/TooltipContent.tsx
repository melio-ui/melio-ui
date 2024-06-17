import React from 'react';

import { createPopper } from '@popperjs/core';
import { Transition, TransitionStatus } from 'react-transition-group';

import { useMergedRef } from '../hooks';
import setRef from '../internal/setRef';
import { ComponentPropsWithoutRef, TypeAttributes } from '../types/common';

import { TooltipContext } from './Tooltip';

export interface TooltipContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Tootip 이 display되는 위치
   * @default 'top'
   */
  placement?: TypeAttributes.OverlayPlacement;
}

// export interface TooltipContentContextValue extends Pick<TooltipContentProps, 'placement'> {}
// export const TooltipContentContext = React.createContext<TooltipContentContextValue>({});

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const { placement = 'top', children, ...rest } = props;
  const { open, triggerRef } = React.useContext(TooltipContext);

  const tooltipRef = React.useRef<HTMLDivElement>();
  const tooltipMergedRef = useMergedRef(tooltipRef, ref);

  const handleOpen = React.useCallback(() => {
    if (!open || !triggerRef.current || !tooltipRef.current) {
      return;
    }

    createPopper(triggerRef.current, tooltipRef.current, {
      placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    });
  }, [open, placement, triggerRef]);

  const handleRef = React.useCallback(
    (node: any) => {
      // setRef(tooltipRef, node);
      setRef(tooltipMergedRef, node);
      handleOpen();
    },
    [handleOpen, tooltipMergedRef],
  );

  // const contextValue = React.useMemo(
  //   () => ({
  //     placement,
  //   }),
  //   [placement],
  // );

  if (!open) {
    return null;
  }

  return (
    <Transition in={open} timeout={300}>
      {(state: TransitionStatus) => (
        <div
          ref={handleRef}
          // data-placement={placement} // @popperjs/core 에서 data-popper-placement 로 정의함
          {...rest}
        >
          {children}
        </div>
      )}
    </Transition>
  );
});

TooltipContent.displayName = 'Tooltip.Content';

export default TooltipContent;
