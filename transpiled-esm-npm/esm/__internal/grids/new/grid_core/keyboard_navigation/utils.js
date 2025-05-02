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