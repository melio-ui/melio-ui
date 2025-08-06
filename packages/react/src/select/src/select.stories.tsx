import React from 'react';

import { Select } from '.';
import { SelectValue } from './root/select-root';
import * as styles from './select.stories.css';

export default { title: 'Components/Select' };

export function Basic(): React.JSX.Element {
  return (
    <>
      <h1>기본</h1>
      <Select.Root defaultValue={null}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            {/* <Select.ScrollUpButton /> */}
            <Select.Viewport>
              <Select.Item value={null} className={styles.item}>
                {/* <Select.ItemIndicator /> */}
                <Select.ItemText>선택하세요.</Select.ItemText>
              </Select.Item>
              <Select.Item value="1" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 1</Select.ItemText>
              </Select.Item>
              <Select.Item value="2" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 2</Select.ItemText>
              </Select.Item>

              <Select.Separator className={styles.separator} />

              <Select.Group>
                <Select.Label className={styles.label}>Title</Select.Label>
                <Select.Item value="3" className={styles.item}>
                  <Select.ItemIndicator />
                  <Select.ItemText>Option 3</Select.ItemText>
                </Select.Item>
                <Select.Item value="4" className={styles.item}>
                  <Select.ItemIndicator />
                  <Select.ItemText>Option 4</Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
            {/* <Select.ScrollDownButton />
            <Select.Arrow /> */}
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

export function OnValueChange(): React.JSX.Element {
  const [value, setValue] = React.useState<SelectValue>('2');

  const handleValueChange = (val: SelectValue): void => {
    setValue(val);
  };

  return (
    <>
      <h1>OnValueChange</h1>
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.Viewport>
              <Select.Item value="1" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 1</Select.ItemText>
              </Select.Item>
              <Select.Item value="2" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 2</Select.ItemText>
              </Select.Item>
              <Select.Item value="3" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 3</Select.ItemText>
              </Select.Item>
              <Select.Item value="4" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 4</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

export function OnOpenChange(): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  return (
    <>
      <h1>OnOpenChange</h1>
      <Select.Root open={open} onOpenChange={handleOpenChange}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.Viewport>
              <Select.Item value="1" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 1</Select.ItemText>
              </Select.Item>
              <Select.Item value="2" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 2</Select.ItemText>
              </Select.Item>
              <Select.Item value="3" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 3</Select.ItemText>
              </Select.Item>
              <Select.Item value="4" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 4</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

export function Disabled(): React.JSX.Element {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const handleDisabledChange = (newDisabled: boolean): void => {
    setDisabled(newDisabled);
  };

  return (
    <>
      <h1>Disabled</h1>
      <button
        onClick={(): void => {
          handleDisabledChange(!disabled);
        }}
      >
        {disabled ? 'enabled 로 변경' : 'disabled 로 변경'}
      </button>
      <Select.Root disabled={disabled} defaultValue="1">
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.Viewport>
              <Select.Item value="1" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 1</Select.ItemText>
              </Select.Item>
              <Select.Item value="2" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 2</Select.ItemText>
              </Select.Item>
              <Select.Item value="3" className={styles.item}>
                <Select.ItemIndicator />
                <Select.ItemText>Option 3</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}
