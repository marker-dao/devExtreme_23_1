"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSetFieldValue = exports.PendingPromises = void 0;
const defaultSetFieldValue = function (newData, value) {
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
exports.defaultSetFieldValue = defaultSetFieldValue;
class PendingPromises {
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
exports.PendingPromises = PendingPromises;