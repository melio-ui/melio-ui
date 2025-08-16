import React from 'react';

import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/react-dom';
import type { Placement } from '@floating-ui/react-dom';

import { useMergedRef } from '@mangoui/use-merged-ref';

import { getSideAndAlignFromPlacement, transformOrigin } from './helpers';
import { useCallbackRef } from './hooks/use-callback-ref';
import { useLayoutEffect } from './hooks/use-layout-effect';
import { useSize } from './hooks/use-size';
import { PopperContext } from './popper';
import { Align, Side } from './types';

type Boundary = Element | null;

export interface PopperContentProps extends React.ComponentPropsWithoutRef<'div'> {
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
  arrowPadding?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Boundary | Boundary[];
  collisionPadding?: number | Partial<Record<Side, number>>;
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
  updatePositionStrategy?: 'optimized' | 'always';
  onPlaced?: () => void;
}

export interface PopperContentContextValue {
  placedSide: Side;
  arrowX?: number;
  arrowY?: number;
  shouldHideArrow: boolean;
  onArrowChange: (arrow: HTMLSpanElement | null) => void;
}
export const PopperContentContext = React.createContext<PopperContentContextValue>({
  placedSide: 'bottom',
  shouldHideArrow: true,
  onArrowChange: () => {},
});

const PopperContent = React.forwardRef<HTMLDivElement, PopperContentProps>((props, ref) => {
  const {
    side = 'bottom',
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding: collisionPaddingProp = 0,
    sticky = 'partial',
    hideWhenDetached = false,
    updatePositionStrategy = 'optimized',
    onPlaced,
    ...contentProps
  } = props;

  const context = React.useContext(PopperContext);

  const [content, setContent] = React.useState<HTMLDivElement | null>(null);
  const composedRefs = useMergedRef(ref, (node) => {
    setContent(node);
  });

  const [arrow, setArrow] = React.useState<HTMLSpanElement | null>(null);
  const arrowSize = useSize(arrow);
  const arrowWidth = arrowSize?.width ?? 0;
  const arrowHeight = arrowSize?.height ?? 0;

  const desiredPlacement = (side + (align !== 'center' ? '-' + align : '')) as Placement;

  const collisionPadding =
    typeof collisionPaddingProp === 'number'
      ? collisionPaddingProp
      : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };

  const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
  const hasExplicitBoundaries = boundary.length > 0;

  const detectOverflowOptions = {
    padding: collisionPadding,
    boundary: boundary.filter((_v) => _v !== null),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: hasExplicitBoundaries,
  };

  const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: 'fixed',
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: updatePositionStrategy === 'always',
      });
      return cleanup;
    },
    elements: {
      reference: context.anchor,
    },
    middleware: [
      offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
      avoidCollisions &&
        shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions,
        }),
      avoidCollisions && flip({ ...detectOverflowOptions }),
      size({
        ...detectOverflowOptions,
        apply: ({ elements, rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          const contentStyle = elements.floating.style;
          contentStyle.setProperty('--mango-popper-available-width', `${availableWidth}px`);
          contentStyle.setProperty('--mango-popper-available-height', `${availableHeight}px`);
          contentStyle.setProperty('--mango-popper-anchor-width', `${anchorWidth}px`);
          contentStyle.setProperty('--mango-popper-anchor-height', `${anchorHeight}px`);
        },
      }),
      arrow && floatingUIarrow({ element: arrow, padding: arrowPadding }),
      transformOrigin({ arrowWidth, arrowHeight }),
      hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions }),
    ],
  });

  const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);

  const handlePlaced = useCallbackRef(onPlaced);
  useLayoutEffect(() => {
    if (isPositioned) {
      handlePlaced?.();
    }
  }, [isPositioned, handlePlaced]);

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;

  const [contentZIndex, setContentZIndex] = React.useState<string>();
  useLayoutEffect(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);

  const contextValue = React.useMemo(
    () => ({
      placedSide,
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow,
      onArrowChange: setArrow,
    }),
    [arrowX, arrowY, cannotCenterArrow, placedSide],
  );

  return (
    <div
      ref={refs.setFloating}
      data-mango-popper-content-wrapper=""
      style={{
        ...floatingStyles,
        transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
        minWidth: 'max-content',
        zIndex: contentZIndex,
        ['--mango-popper-transform-origin' as any]: [
          middlewareData.transformOrigin?.x,
          middlewareData.transformOrigin?.y,
        ].join(' '),

        // hide the content if using the hide middleware and should be hidden
        // set visibility to hidden and disable pointer events so the UI behaves
        // as if the PopperContent isn't there at all
        ...(middlewareData.hide?.referenceHidden && {
          visibility: 'hidden',
          pointerEvents: 'none',
        }),
      }}
      // Floating UI interally calculates logical alignment based the `dir` attribute on
      // the reference/floating node, we must add this attribute here to ensure
      // this is calculated when portalled as well as inline.
      dir={props.dir}
    >
      <PopperContentContext.Provider value={contextValue}>
        <div
          data-side={placedSide}
          data-align={placedAlign}
          {...contentProps}
          ref={composedRefs}
          style={{
            ...contentProps.style,
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: !isPositioned ? 'none' : undefined,
          }}
        />
      </PopperContentContext.Provider>
    </div>
  );
});

PopperContent.displayName = 'Popper.Content';

export default PopperContent;
