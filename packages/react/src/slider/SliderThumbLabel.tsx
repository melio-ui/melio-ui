import React from 'react';

import { SliderThumbContext } from './SliderThumb';

export interface SliderThumbLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  auto?: boolean;
}

const SliderThumbLabel = React.forwardRef<HTMLSpanElement, SliderThumbLabelProps>((props, ref) => {
  const { auto, children, ...rest } = props;
  const { thumbValue, isActiveThumb } = React.useContext(SliderThumbContext);

  if (auto && !isActiveThumb) {
    return null;
  }

  return (
    <span ref={ref} {...rest}>
      {children ?? thumbValue}
    </span>
  );
});

SliderThumbLabel.displayName = 'Slider.ThumbLabel';

export default SliderThumbLabel;
