import React from 'react';

import { Popper } from '@mangoui/popper';
import { useMergedRef } from '@mangoui/use-merged-ref';

import { TooltipContext } from './tooltip';
import {
  Polygon,
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isPointInPolygon,
} from './utils';

type TooltipContentElement = React.ElementRef<typeof Popper.Content>;
export interface TooltipContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popper.Content>, 'onPlaced'> {}

const TooltipContent = React.forwardRef<TooltipContentElement, TooltipContentProps>(
  (props, ref) => {
    const { side = 'top', style, children, ...rest } = props;
    const { open, triggerRef, onClose, onPointerInTransitChange } =
      React.useContext(TooltipContext);

    const [content, setContent] = React.useState<TooltipContentElement | null>(null);
    const composedRefs = useMergedRef(ref, (node) => {
      setContent(node);
    });

    const [pointerGraceArea, setPointerGraceArea] = React.useState<Polygon | null>(null);

    const trigger = triggerRef.current;

    const handleRemoveGraceArea = React.useCallback(() => {
      setPointerGraceArea(null);
      onPointerInTransitChange(false);
    }, [onPointerInTransitChange]);

    const handleCreateGraceArea = React.useCallback(
      (event: PointerEvent, hoverTarget: HTMLElement) => {
        const currentTarget = event.currentTarget as HTMLElement;
        const exitPoint = { x: event.clientX, y: event.clientY };
        const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
        const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
        const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
        const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
        setPointerGraceArea(graceArea);
        onPointerInTransitChange(true);
      },
      [onPointerInTransitChange],
    );

    React.useEffect(() => {
      return () => {
        handleRemoveGraceArea();
      };
    }, [handleRemoveGraceArea]);

    React.useEffect(() => {
      if (trigger && content) {
        const handleTriggerLeave = (event: PointerEvent): void => {
          // console.log('content ============ trigger:handleTriggerLeave');
          handleCreateGraceArea(event, content);
        };
        const handleContentLeave = (event: PointerEvent): void => {
          // console.log('content ============ content:handleContentLeave');
          handleCreateGraceArea(event, trigger);
        };

        trigger.addEventListener('pointerleave', handleTriggerLeave);
        content.addEventListener('pointerleave', handleContentLeave);
        return () => {
          trigger.removeEventListener('pointerleave', handleTriggerLeave);
          content.removeEventListener('pointerleave', handleContentLeave);
        };
      }
    }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);

    React.useEffect(() => {
      if (pointerGraceArea) {
        const handleTrackPointerGrace = (event: PointerEvent): void => {
          const target = event.target as HTMLElement;
          const pointerPosition = { x: event.clientX, y: event.clientY };
          const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
          const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);

          if (hasEnteredTarget) {
            handleRemoveGraceArea();
          } else if (isPointerOutsideGraceArea) {
            handleRemoveGraceArea();
            onClose();
          }
        };
        document.addEventListener('pointermove', handleTrackPointerGrace);
        return () => {
          document.removeEventListener('pointermove', handleTrackPointerGrace);
        };
      }
    }, [content, handleRemoveGraceArea, onClose, pointerGraceArea, trigger]);

    // Close the tooltip if the trigger is scrolled
    React.useEffect(() => {
      if (trigger) {
        const handleScroll = (event: Event): void => {
          const target = event.target as HTMLElement;
          if (target?.contains(trigger)) onClose();
        };
        window.addEventListener('scroll', handleScroll, { capture: true });
        return () => {
          window.removeEventListener('scroll', handleScroll, { capture: true });
        };
      }
    }, [onClose, trigger]);

    if (!open) {
      return null;
    }

    return (
      <Popper.Content
        data-state={open ? 'open' : 'closed'}
        side={side}
        {...rest}
        ref={composedRefs}
        style={{
          ...style,
          // re-namespace exposed content custom properties
          ...{
            '--mango-tooltip-content-transform-origin': 'var(--mango-popper-transform-origin)',
            '--mango-tooltip-content-available-width': 'var(--mango-popper-available-width)',
            '--mango-tooltip-content-available-height': 'var(--mango-popper-available-height)',
            '--mango-tooltip-trigger-width': 'var(--mango-popper-anchor-width)',
            '--mango-tooltip-trigger-height': 'var(--mango-popper-anchor-height)',
          },
        }}
      >
        {children}
      </Popper.Content>
    );
  },
);

TooltipContent.displayName = 'Tooltip.Content';

export default TooltipContent;
