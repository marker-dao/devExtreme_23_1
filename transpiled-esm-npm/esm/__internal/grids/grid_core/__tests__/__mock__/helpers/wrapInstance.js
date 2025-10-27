import { jest } from '@jest/globals';
export default function wrapInstance(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    const originalValue = instance[key];
    if (typeof originalValue === 'function' && key !== 'constructor') {
      const originalMethod = originalValue;
      instance[key] = jest.fn(originalMethod.bind(instance));
    }
  });
  return instance;
}