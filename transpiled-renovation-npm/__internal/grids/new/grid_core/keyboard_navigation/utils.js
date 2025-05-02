"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeKeyName = exports.getKeyWithModifications = exports.SEPARATOR = exports.KEY_NAMES_MAPPING = exports.KEY_MODIFICATIONS = void 0;
const KEY_NAMES_MAPPING = exports.KEY_NAMES_MAPPING = {
  ' ': 'Space'
};
const KEY_MODIFICATIONS = exports.KEY_MODIFICATIONS = {
  shift: 'shift',
  alt: 'alt',
  ctrl: 'ctrl'
};
const SEPARATOR = exports.SEPARATOR = '+';
const normalizeKeyName = keyName => KEY_NAMES_MAPPING[keyName] ?? keyName;
exports.normalizeKeyName = normalizeKeyName;
const getKeyWithModifications = event => {
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
exports.getKeyWithModifications = getKeyWithModifications;