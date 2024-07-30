import React from 'react';

import {
  DropdownContent,
  DropdownItem,
  DropdownPortal,
  DropdownRoot,
  DropdownTrigger,
} from '@melio-ui/dropdown';

import './styles.css';

export default function DropdownDemo() {
  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        <button
          type="button"
          style={{
            border: '1px solid #fff',
            padding: 5,
            borderRadius: 5,
          }}
        >
          Dropdown
        </button>
      </DropdownTrigger>
      <DropdownPortal>
        <DropdownContent className="dropdown-content">
          <DropdownItem className="dropdown-item">DropdownItem - 1</DropdownItem>
          <DropdownItem className="dropdown-item">DropdownItem - 2</DropdownItem>
          <DropdownItem className="dropdown-item">DropdownItem - 3</DropdownItem>
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  );
}
