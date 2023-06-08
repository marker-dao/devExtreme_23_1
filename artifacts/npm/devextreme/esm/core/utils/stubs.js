/**
* DevExtreme (esm/core/utils/stubs.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function stubComponent(componentName) {
  return class NoComponent {
    constructor() {
      // TODO: make correct exceptions here and in decorators
      throw new Error("Module '".concat(componentName, "' not found"));
    }
    static getInstance() {}
  };
}
