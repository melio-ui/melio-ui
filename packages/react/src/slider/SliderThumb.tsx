import React from 'react';

import { useMergedRef } from '../hooks';

import { SliderContext } from './Slider';
import useThumb from './hooks/useThumb';

export interface SliderThumbProps extends React.ComponentPropsWithoutRef<'div'> {}

export interface SliderThumbContextValue {
  thumbValue: number;
  isActiveThumb: boolean;
}
export const SliderThumbContext = React.createContext<SliderThumbContextValue>({
  thumbValue: 0,
  isActiveThumb: false,
});

const SliderThumb = React.forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
  const { style, children, onMouseOver, onMouseOut, ...rest } = props;
  const { orientation } = React.useContext(SliderContext);

  const thumbRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useMergedRef(ref, thumbRef);

  const { thumbValue, thumbPercentValue, thumbIsMouseDown, displayStyle } = useThumb({
    thumbRef,
  });

  const [isOver, setOver] = React.useState<boolean>(false);

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>): void => {
    setOver(true);
    onMouseOver?.(event);
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>): void => {
    setOver(false);
    onMouseOut?.(event);
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
  const isActiveThumb = isOver === true || thumbIsMouseDown === true;

  const positionStyle = React.useMemo(
    () =>
      orientation === 'horizontal'
        ? { left: `${thumbPercentValue}%`, display: displayStyle }
        : { bottom: `${thumbPercentValue}%`, display: displayStyle },
    [displayStyle, orientation, thumbPercentValue],
  );

  const contextValue = React.useMemo(
    () => ({
      thumbValue,
      isActiveThumb,
    }),
    [isActiveThumb, thumbValue],
  );

  return (
    <SliderThumbContext.Provider value={contextValue}>
      <div
        ref={handleRef}
        style={{ ...positionStyle, ...style }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        {...rest}
      >
        {children}
      </div>
    </SliderThumbContext.Provider>
  );
});

SliderThumb.displayName = 'Slider.Thumb';

export default SliderThumb;
