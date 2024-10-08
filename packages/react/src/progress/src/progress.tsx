import React from 'react';

import { getProgressState } from '../../internal/get-progress-state';

export interface ProgressProps extends React.ComponentPropsWithoutRef<'div'> {
  /** bar value (진행 표시) */
  value?: number;
  /**
   * bar 최대값
   * @default 100
   */
  max?: number;
  /** indeterminate 유무 */
  indeterminate?: boolean;
}

export interface ProgressContextValue
  extends Pick<ProgressProps, 'value' | 'max' | 'indeterminate'> {
  computedValue: number;
}
export const ProgressContext = React.createContext<ProgressContextValue>({
  computedValue: 0,
  max: 100,
});

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { value = 0, max = 100, indeterminate, children, ...rest } = props;

  const computedValue = React.useMemo(
    () => Math.round(((value <= max && value >= 0 ? value : 0) / max) * 100),
    [max, value],
  );

  const contextValue = React.useMemo(
    () => ({ value, max, computedValue, indeterminate }),
    [computedValue, indeterminate, max, value],
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      <div
        data-state={getProgressState(value, max, indeterminate)}
        data-value={value}
        data-max={max}
        {...rest}
        ref={ref}
        role="progressbar"
      >
        {children}
      </div>
    </ProgressContext.Provider>
  );
});

Progress.displayName = 'Progress';

export default Progress;
