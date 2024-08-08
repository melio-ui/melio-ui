'use client';

import React from 'react';

import { ToastClose, ToastContent, ToastRoot, ToastViewport } from '@melio-ui/toast';

import './styles.css';

export default function ToastDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="toast-button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Toast
      </button>

      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastContent className="toast-content">
          <div style={{ backgroundColor: '#dffadc', height: 50, padding: 15, color: 'black' }}>
            Notification
          </div>
        </ToastContent>
        <ToastViewport className="toast-viewport" />
      </ToastRoot>
    </>
  );
}
