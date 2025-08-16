import { style } from '@vanilla-extract/css';

// export const root = style({});

export const trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  height: '2.5rem',
  paddingLeft: '0.875rem',
  paddingRight: '0.75rem',
  margin: 0,
  outline: 0,
  border: '1px solid var(--border)',
  borderRadius: '0.375rem',
  fontFamily: 'inherit',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  // color: 'var(--color-gray-900)',
  color: 'inherit',
  cursor: 'default',
  userSelect: 'none',
  minWidth: '9rem',
  width: '12.5rem',

  selectors: {
    '&:hover': { backgroundColor: 'var(--selected-hover)' },
    '&:active': { backgroundColor: 'var(--selected-hover)' },
    '&[data-popup-open]': { backgroundColor: 'var(--selected-hover)' },
    '&:focus-visible': { outline: '2px solid var(--color-blue)', outlineOffset: '-1px' },
    '&[data-disabled]': {
      cursor: 'default',
      opacity: 0.45,
      pointerEvents: 'none',
    },
  },
});

export const content = style({
  backgroundColor: 'var(--component-bg)',
  border: '0.0625rem solid var(--border)',
  borderRadius: '0.25rem',
  boxShadow: '0 0.125rem 0.1875rem 0 rgba(0, 0, 0, 0.15)',

  ':focus': {
    outline: 0,
  },
});

export const item = style({
  display: 'flex',
  cursor: 'default',
  padding: '8px 16px',
  borderBottom: 'none',
  lineHeight: '1.063rem', // rem(17px); 빌드시 에러남 (원래 안났는데 그냥 갑자기 남)

  fontSize: '13px',
  color: 'var(--violet-11)',
  borderRadius: '3px',
  alignItems: 'center',
  height: '25px',
  position: 'relative',
  userSelect: 'none',

  ':hover': {
    background: 'var(--selected-hover)',
  },

  selectors: {
    '&[data-disabled]': {
      cursor: 'default',
      opacity: 0.45,
      pointerEvents: 'none',
    },
    '&[data-highlighted]': {
      outline: 0,
      backgroundColor: 'var(--selected-hover)',
      color: 'var(--color-white)',
    },
  },
});

export const separator = style({
  height: '0.0625rem',
  backgroundColor: 'var(--border)',
  margin: '0.3125rem',
});

export const label = style({
  padding: '0 0.5625rem',
  fontSize: '0.75rem',
  lineHeight: '1.5625rem',
  color: 'var(--soft-text)',
});

export const scrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25px',
  backgroundColor: 'var(--component-down-bg)',
  color: 'var(--selected-text)',
  cursor: 'default',
});
