import React from 'react';

import { ComponentPropsWithoutRef } from '../types/common';

import { SwitchContext } from './Switch';
import getState from './helpers/getState';

export interface SwitchThumbProps extends ComponentPropsWithoutRef<'span'> {}

const SwitchThumb = React.forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const { children, ...rest } = props;

  const { checked } = React.useContext(SwitchContext);

  return (
    <span ref={ref} data-state={getState(checked)} {...rest}>
      {children}
    </span>
  );
});

SwitchThumb.displayName = 'Switch.Thumb';

export default SwitchThumb;
