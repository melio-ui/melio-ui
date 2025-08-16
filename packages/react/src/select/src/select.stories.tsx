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

      <div style={{ width: '100%', height: 30 }} />
      <h3>항목 disabled</h3>
      <Select.Root defaultValue="1">
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
              <Select.Item value="2" className={styles.item} disabled>
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

export function DestroyOnClose(): React.JSX.Element {
  return (
    <>
      <h1>destroyOnClose (false)</h1>
      <Select.Root defaultValue={null}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content} destroyOnClose={false}>
            <Select.Viewport>
              <Select.Item value={null} className={styles.item}>
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
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

export function ForceMount(): React.JSX.Element {
  return (
    <>
      <h1>forceMount</h1>
      <Select.Root defaultValue={null}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content} forceMount>
            <Select.Viewport>
              <Select.Item value={null} className={styles.item}>
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
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

export function Container(): React.JSX.Element {
  // const containerRef = React.useRef(null);
  const [container, setContainer] = React.useState<HTMLElement>();

  React.useEffect(() => {
    setContainer(document.getElementById('container') as HTMLElement);
  }, []);

  return (
    <>
      <h1>Container</h1>
      {/* <div ref={containerRef} /> */}
      <div id="container" />
      <Select.Root defaultValue={null}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal container={container}>
          <Select.Content className={styles.content}>
            <Select.Viewport>
              <Select.Item value={null} className={styles.item}>
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
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

const options = [
  { label: '선택하세요.', value: null },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
  { label: 'Option 9', value: '9' },
  { label: 'Option 10', value: '10' },
  { label: 'Option 11', value: '11' },
  { label: 'Option 12', value: '12' },
  { label: 'Option 13', value: '13' },
  { label: 'Option 14', value: '14' },
  { label: 'Option 15', value: '15' },
  { label: 'Option 16', value: '16' },
];

export function Scroll(): React.JSX.Element {
  return (
    <>
      <h1>Scroll</h1>
      <Select.Root defaultValue={null}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.ScrollUpButton className={styles.scrollButton} />
            <Select.Viewport style={{ maxHeight: 200 }}>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className={styles.item}>
                  {option.value === null ? null : <Select.ItemIndicator />}
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className={styles.scrollButton} />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}
