import React from 'react';

import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '@melio-ui/popover';

import './styles.css';

export default function PopoverDemo() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button type="button">Open Popover</button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="popover-content">
          <div style={{ padding: 10 }}>This is a Popover Content</div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
