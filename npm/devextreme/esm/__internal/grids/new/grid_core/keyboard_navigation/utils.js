/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const KEY_NAMES_MAPPING = {
  ' ': 'Space'
};
export const KEY_MODIFICATIONS = {
  shift: 'shift',
  alt: 'alt',
  ctrl: 'ctrl'
};
export const SEPARATOR = '+';
export const normalizeKeyName = keyName => KEY_NAMES_MAPPING[keyName] ?? keyName;
export const getKeyWithModifications = event => {
  const normalizedKeyName = normalizeKeyName(event.key);
  switch (true) {
    case event.altKey:
      return `${normalizedKeyName}${SEPARATOR}${KEY_MODIFICATIONS.alt}`;
    case event.shiftKey:
      return `${normalizedKeyName}${SEPARATOR}${KEY_MODIFICATIONS.shift}`;
    case event.ctrlKey:
    case event.metaKey:
      return `${normalizedKeyName}${SEPARATOR}${KEY_MODIFICATIONS.ctrl}`;
    default:
      return normalizedKeyName;
  }
};
