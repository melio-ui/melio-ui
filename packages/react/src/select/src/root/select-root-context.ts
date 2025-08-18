import React from 'react';

import { SelectTriggerElement } from '../trigger/select-trigger';
import { SelectValueElement } from '../value/select-value';
import { SelectValue } from './select-root';

type Direction = 'ltr' | 'rtl';

export interface SelectRootContextValue {
  trigger: SelectTriggerElement | null;
  valueNode: SelectValueElement | null;
  valueNodeHasChildren: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  value?: SelectValue;
  defaultValue?: SelectValue;
  // multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  selectedItemText: React.ReactNode | null; // string 타입으로 변경할지 좀 더 생각해 보자
  contentId: string;
  dir?: Direction;
  triggerPointerDownPosRef: React.MutableRefObject<{ x: number; y: number } | null>;
  //
  onTriggerChange: (node: SelectTriggerElement | null) => void;
  onValueNodeChange: (node: SelectValueElement) => void;
  onValueNodeHasChildrenChange: (hasChildren: boolean) => void;
  onValueChange: (value: SelectValue) => void;
  onSelectedItemText: (itemText: React.ReactNode) => void;
  onOpenChange: (open: boolean) => void;
}

export const SelectRootContext = React.createContext<SelectRootContextValue>({
  trigger: null,
  valueNode: null,
  valueNodeHasChildren: false,
  open: false,
  defaultOpen: false,
  value: '',
  defaultValue: '',
  selectedItemText: null,
  contentId: '',
  triggerPointerDownPosRef: { current: null },
  //
  onTriggerChange: (node: SelectTriggerElement | null) => {},
  onValueNodeChange: (node: SelectValueElement) => {},
  onValueNodeHasChildrenChange: (hasChildren: boolean) => {},
  onValueChange: (value: SelectValue) => {},
  onSelectedItemText: (itemText: React.ReactNode) => {},
  onOpenChange: (open: boolean) => {},
});

export function useSelectRootContext(): SelectRootContextValue {
  const context = React.useContext(SelectRootContext);
  if (context === null) {
    throw new Error(
      'Mango UI: SelectRootContext is missing. Select parts must be placed within <Select.Root>.',
    );
  }
  return context;
}
