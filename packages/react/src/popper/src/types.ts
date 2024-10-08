/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMRect) */
// interface DOMRect extends DOMRectReadOnly {
//   height: number;
//   width: number;
//   x: number;
//   y: number;
// }

export interface Measurable {
  // getBoundingClientRect: () => ClientRect;
  getBoundingClientRect: () => DOMRect;
}

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;
const ALIGN_OPTIONS = ['start', 'center', 'end'] as const;

export type Side = (typeof SIDE_OPTIONS)[number];
export type Align = (typeof ALIGN_OPTIONS)[number];
