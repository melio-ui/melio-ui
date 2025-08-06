import React from 'react';

import { SelectItemTextElement } from '../item-text/select-item-text';
import { SelectValue } from '../root/select-root';

export interface SelectItemContextValue {
  value: SelectValue;
  disabled?: boolean;
  textId: string;
  isSelected: boolean;
  onItemTextChange: (node: SelectItemTextElement | null) => void;
}

export const SelectItemContext = React.createContext<SelectItemContextValue>({
  value: '',
  disabled: false,
  textId: '',
  isSelected: false,
  onItemTextChange: (node: SelectItemTextElement | null) => {},
});

export function useSelectItemContext(): SelectItemContextValue {
  const context = React.useContext(SelectItemContext);
  if (context === null) {
    throw new Error(
      'Mango UI: SelectContentContext is missing. Select parts must be placed within <Select.Content>.',
    );
  }
  return context;
}
