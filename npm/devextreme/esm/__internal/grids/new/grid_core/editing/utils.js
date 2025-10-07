/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const defaultSetFieldValue = function (newData, value) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const column = this;
  const {
    dataField
  } = column;
  if (!dataField) {
    return;
  }
  newData[dataField] = value;
};
export class PendingPromises {
  constructor() {
    this.promises = new Set();
  }
  waitForAll() {
    return Promise.all([...this.promises]);
  }
  add(p) {
    this.promises.add(p);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    p.then(() => {
      this.promises.delete(p);
    });
    return p;
  }
}
