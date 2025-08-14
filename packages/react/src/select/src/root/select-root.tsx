import React, { ReactNode } from 'react';

import { Popper } from '@mangoui/popper';
import { useControlled } from '@mangoui/use-controlled/src';

import { SelectItemTextProps } from '../item-text/select-item-text';
import { SelectItemProps } from '../item/select-item';
import { SelectTriggerElement } from '../trigger/select-trigger';
import { SelectValueElement } from '../value/select-value';
import { SelectRootContext } from './select-root-context';

export type SelectValue = string | number | null; // unknown;
// export type SelectValue = string | string[];

export interface SelectRootProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  onValueChange?: (value: SelectValue) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  children: ReactNode;
  dir?: 'ltr' | 'rtl';
  multiple?: boolean;
  id?: string;
}

export default function SelectRoot(props: SelectRootProps): React.JSX.Element {
  const {
    children,
    value: valueProp,
    defaultValue,
    onValueChange,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disabled,
    readOnly,
    required,
    name,
    dir,
    multiple,
    id,
  } = props;

  const [trigger, setTrigger] = React.useState<SelectTriggerElement | null>(null);
  const [valueNode, setValueNode] = React.useState<SelectValueElement | null>(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = React.useState(false);

  const [open, setOpen] = useControlled<boolean | undefined>(openProp, defaultOpen);
  const [value, setValue] = useControlled<SelectValue | undefined>(valueProp, defaultValue);

  const [selectedItemText, setSelectedItemText] = React.useState<React.ReactNode>(
    (): React.ReactNode => {
      const itemMap = new Map<SelectValue, React.ReactNode>();

      const traverse = (node: React.ReactNode): void => {
        React.Children.forEach(node, (child) => {
          if (!React.isValidElement(child)) {
            return;
          }

          if ((child.type as any).displayName === 'Select.Item') {
            const { value: itemValue, children: itemChildren } = child.props as SelectItemProps;

            let textContent: React.ReactNode = null;
            React.Children.forEach(itemChildren, (itemChild) => {
              if (
                React.isValidElement(itemChild) &&
                (itemChild.type as any).displayName === 'Select.Text'
              ) {
                textContent = (itemChild.props as SelectItemTextProps).children;
              }
            });

            if (itemValue !== undefined) {
              itemMap.set(itemValue, textContent);
            }
          } else if ((child.props as any).children) {
            traverse((child.props as any).children);
          }
        });
      };

      traverse(children);
      return itemMap.get(value !== undefined ? value : null);
    },
  );
  // console.log('selectedItemText', selectedItemText);

  const serializedValue = React.useMemo(() => {
    if (multiple && Array.isArray(value) && value.length === 0) {
      return '';
    }

    return serializeValue(value);
  }, [multiple, value]);

  // contentId 설정
  const contentId = React.useId();

  const triggerPointerDownPosRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [onOpenChange, setOpen],
  );

  const handleValueChange = React.useCallback(
    (newValue: SelectValue) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange, setValue],
  );

  const contextValue = React.useMemo(
    () => ({
      trigger,
      valueNode,
      valueNodeHasChildren,
      open,
      defaultOpen,
      name,
      value,
      defaultValue,
      multiple,
      disabled,
      readOnly,
      required,
      selectedItemText,
      contentId,
      dir,
      triggerPointerDownPosRef,
      //
      onTriggerChange: setTrigger,
      onValueNodeChange: setValueNode,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      onValueChange: handleValueChange,
      onSelectedItemText: setSelectedItemText,
      onOpenChange: handleOpenChange,
    }),
    [
      trigger,
      valueNode,
      valueNodeHasChildren,
      open,
      defaultOpen,
      name,
      value,
      defaultValue,
      multiple,
      disabled,
      readOnly,
      required,
      selectedItemText,
      contentId,
      dir,
      handleValueChange,
      handleOpenChange,
    ],
  );

  return (
    <Popper.Root>
      <SelectRootContext.Provider value={contextValue}>
        {children}
        <input
          id={id || undefined}
          name={multiple ? undefined : name}
          value={serializedValue}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          // ref={ref}
          style={visuallyHidden}
          tabIndex={-1}
          aria-hidden="true"
        />
      </SelectRootContext.Provider>
    </Popper.Root>
  );
}

SelectRoot.displayName = 'Select.Root';

const visuallyHidden: React.CSSProperties = {
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'fixed',
  top: 0,
  left: 0,
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1,
};

function serializeValue(value?: SelectValue): string {
  if (value == null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
