import React from 'react';

import { useComposedRefs } from '@mangoui/compose-refs';

import { useSelectContentContext } from '../content/select-content-context';
import { useSelectViewportContext } from './select-viewport-context';

const CONTENT_MARGIN = 10;

export type SelectViewportElement = HTMLDivElement;

export interface SelectViewportProps extends React.ComponentPropsWithoutRef<'div'> {
  nonce?: string;
}

const SelectViewport = React.forwardRef<SelectViewportElement, SelectViewportProps>(
  (props, ref) => {
    const { nonce, onScroll, ...viewportProps } = props;

    const contentContext = useSelectContentContext();
    const viewportContext = useSelectViewportContext();

    const composedRefs = useComposedRefs(ref, contentContext.onViewportChange);
    const prevScrollTopRef = React.useRef(0);

    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `[data-mango-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-mango-select-viewport]::-webkit-scrollbar{display:none}`,
          }}
          nonce={nonce}
        />
        <div
          data-mango-select-viewport=""
          role="presentation"
          {...viewportProps}
          ref={composedRefs}
          style={{
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: 'relative',
            // flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: 'hidden auto',
            ...viewportProps.style,
          }}
          onScroll={(event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if (shouldExpandOnScrollRef?.current && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);

                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;

                  contentWrapper.style.height = clampedNextHeight + 'px';
                  if (contentWrapper.style.bottom === '0px') {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    // ensure the content stays pinned to the bottom
                    contentWrapper.style.justifyContent = 'flex-end';
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;

            onScroll?.(event);
          }}
        />
      </>
    );
  },
);

SelectViewport.displayName = 'Select.Viewport';

export default SelectViewport;
