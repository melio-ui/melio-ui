import React from 'react';

import { Textarea } from 'mango-headlessui';

import cn from '@/utils/cn';

import ChangeInput from './examples/ChangeInput';

const inputStyle = cn(
  'inline-block w-full min-w-0 relative border border-solid border-border box-border bg-component-bg text-inherit py-1 px-3 leading-none',
  'focus:outline-0 focus:border-primary focus:border focus:shadow-[0_0_2px_border-primary]',
);

export default function TextareaPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Textarea
          className={cn(
            'inline-block w-full min-w-0 relative border border-solid border-border box-border bg-component-bg text-inherit py-1 px-3 leading-none',
            'focus:outline-0 focus:border-primary focus:border focus:shadow-[0_0_2px_border-primary]',
          )}
        />
      </div>

      <ChangeInput />

      <div>Disabled</div>
      <div className="flex flex-col gap-2">
        <Textarea
          className={cn(
            inputStyle,
            'disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed',
          )}
          disabled
        />
        <Textarea
          className={cn(
            inputStyle,
            'disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed',
          )}
          disabled
          defaultValue="defaultValue."
        />
        <Textarea
          className={cn(
            inputStyle,
            'disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-disabled-border disabled:cursor-not-allowed',
          )}
          disabled
          placeholder="placeholder."
        />
      </div>

      <div>ReadOnly</div>
      <div className="flex flex-col gap-2">
        <Textarea className={inputStyle} readOnly />
        <Textarea className={inputStyle} readOnly defaultValue="defaultValue." />
        <Textarea className={inputStyle} readOnly placeholder="placeholder." />
      </div>

      <div>Size</div>
      <div className="flex flex-col gap-2">
        <Textarea className={cn(inputStyle, 'py-[1px] px-3 text-sm')} defaultValue="small" />
        <Textarea className={inputStyle} defaultValue="medium" />
        <Textarea className={cn(inputStyle, 'py-3 px-3 text-lg')} defaultValue="large" />
      </div>

      <div>Invalid</div>
      <div className="flex flex-col gap-2">
        <Textarea
          className={cn(
            'inline-block w-full min-w-0 relative border border-solid box-border bg-component-bg text-inherit py-1 px-3 leading-none',
            'border-error',
            'focus:outline-0 focus:border-error focus:border focus:shadow-[0_0_2px_border-error]',
          )}
        />
      </div>
    </div>
  );
}
