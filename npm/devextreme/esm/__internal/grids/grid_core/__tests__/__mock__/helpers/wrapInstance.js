/**
* DevExtreme (esm/__internal/grids/grid_core/__tests__/__mock__/helpers/wrapInstance.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
