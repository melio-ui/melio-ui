import React from 'react';

import { useComposedRefs } from '@mangoui/compose-refs';
import { Slot } from '@mangoui/slot';

import { useSelectContentContext } from '../content/select-content-context';
import { SelectItemTextElement } from '../item-text/select-item-text';
import { SelectValue } from '../root/select-root';
import { useSelectRootContext } from '../root/select-root-context';
import { SelectItemContext } from './select-item-context';

export type SelectItemElement = HTMLDivElement;

export interface SelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: SelectValue;
  disabled?: boolean;
  textValue?: string;
  asChild?: boolean;
}

const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>((props, ref) => {
  const rootContext = useSelectRootContext();

  const {
    children,
    value,
    disabled = rootContext.disabled,
    textValue: textValueProp,
    asChild = false,
    onFocus,
    onBlur,
    onClick,
    onPointerUp,
    onPointerDown,
    onPointerMove,
    onPointerLeave,
    ...itemProps
  } = props;

  const contentContext = useSelectContentContext();

  const [isFocused, setIsFocused] = React.useState(false);
  const [textValue, setTextValue] = React.useState(textValueProp ?? '');

  const Component = asChild ? Slot : 'div';

  const isSelected = rootContext.value === value;

  const composedRefs = useComposedRefs(ref, (node) =>
    contentContext.itemRefCallback?.(node, value, disabled ?? false),
  );

  const textId = React.useId();
  const pointerTypeRef = React.useRef<React.PointerEvent['pointerType']>('touch');

  const handleSelect = (): void => {
    if (!disabled) {
      rootContext.onValueChange(value);

      // multiple 모드 추가 개발시 여기서 isSelected true 면 추가 false 면 제거 구현
      // context.onSelectedItemText((prevItemText) => [...prevItemText, children])
      rootContext.onSelectedItemText(textValue);

      rootContext.onOpenChange(false);
    }
  };

  const onItemTextChange = React.useCallback((node: SelectItemTextElement | null) => {
    setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? '').trim());
  }, []);

  const contextValue = React.useMemo(
    () => ({
      value,
      disabled,
      textId,
      isSelected,
      onItemTextChange,
    }),
    [value, disabled, textId, isSelected, onItemTextChange],
  );

  if (value === '' || value === undefined) {
    throw new Error(
      'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.',
    );
  }

  return (
    <SelectItemContext.Provider value={contextValue}>
      <Component
        role="option"
        aria-labelledby={textId}
        data-highlighted={isFocused ? '' : undefined}
        aria-selected={isSelected}
        data-state={isSelected ? 'checked' : 'unchecked'}
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? '' : undefined}
        tabIndex={disabled ? undefined : -1}
        {...itemProps}
        ref={composedRefs}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onClick={(event) => {
          // Open on click when using a touch or pen device
          if (pointerTypeRef.current !== 'mouse') handleSelect();
          onClick?.(event);
        }}
        onPointerUp={(event) => {
          if (pointerTypeRef.current === 'mouse') handleSelect();
          onPointerUp?.(event);
        }}
        onPointerDown={(event) => {
          pointerTypeRef.current = event.pointerType;
          onPointerDown?.(event);
        }}
        onPointerMove={(event) => {
          pointerTypeRef.current = event.pointerType;
          if (disabled) {
            contentContext.onItemLeave?.();
          } else if (pointerTypeRef.current === 'mouse') {
            event.currentTarget.focus({ preventScroll: true });
          }
        }}
        onPointerLeave={(event) => {
          if (event.currentTarget === document.activeElement) {
            contentContext.onItemLeave?.();
          }
          onPointerLeave?.(event);
        }}
      >
        {children}
      </Component>
    </SelectItemContext.Provider>
  );
});

SelectItem.displayName = 'Select.Item';

export default SelectItem;
