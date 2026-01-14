/**
* DevExtreme (esm/__internal/core/utils/m_stubs.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function stubComponent(componentName) {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  return class NoComponent {
    constructor() {
      // TODO: make correct exceptions here and in decorators
      throw new Error(`Module '${componentName}' not found`);
    }
    static getInstance() {}
  };
}
