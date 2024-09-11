import React from 'react';

import { PopperContentContext } from './popper-content';
import { Side } from './types';

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export interface PopperArrowProps extends React.ComponentPropsWithoutRef<'svg'> {}

const PopperArrow = React.forwardRef<SVGSVGElement, PopperArrowProps>((props, ref) => {
  const { width = 10, height = 5, children, ...arrowProps } = props;
  const contentContext = React.useContext(PopperContentContext);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];

  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    <span
      ref={contentContext.onArrowChange}
      style={{
        position: 'absolute',
        left: contentContext.arrowX,
        top: contentContext.arrowY,
        [baseSide]: 0,
        transformOrigin: {
          top: '',
          right: '0 0',
          bottom: 'center 0',
          left: '100% 0',
        }[contentContext.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: `rotate(180deg)`,
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[contentContext.placedSide],
        visibility: contentContext.shouldHideArrow ? 'hidden' : undefined,
      }}
    >
      {/* TODO: Slot 사용 생각해 보자 */}
      <svg
        {...arrowProps}
        ref={ref}
        style={{
          ...arrowProps.style,
          // ensures the element can be measured correctly (mostly for if SVG)
          display: 'block',
        }}
        width={width}
        height={height}
        viewBox="0 0 30 10"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 30,0 15,10" />
      </svg>
    </span>
  );
});

PopperArrow.displayName = 'Popper.Arrow';

export default PopperArrow;
