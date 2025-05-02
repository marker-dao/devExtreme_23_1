/**
* DevExtreme (esm/__internal/core/di/index.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class DIContext {
  constructor() {
    this.instances = new Map();
    this.fabrics = new Map();
    this.antiRecursionSet = new Set();
  }
  register(id, fabric) {
    // eslint-disable-next-line no-param-reassign
    fabric ?? (fabric = id);
    this.fabrics.set(id, fabric);
  }
  registerInstance(id, instance) {
    this.instances.set(id, instance);
  }
  get(id) {
    const instance = this.tryGet(id);
    if (instance) {
      return instance;
    }
    throw new Error(`DI item is not registered: ${id}`);
  }
  tryGet(id) {
    if (this.instances.get(id)) {
      return this.instances.get(id);
    }
    const fabric = this.fabrics.get(id);
    if (fabric) {
      const res = this.create(fabric);
      this.instances.set(id, res);
      this.instances.set(fabric, res);
      return res;
    }
    return null;
  }
  create(fabric) {
    if (this.antiRecursionSet.has(fabric)) {
      throw new Error('dependency cycle in DI');
    }
    this.antiRecursionSet.add(fabric);
    const args = fabric.dependencies.map(dependency => this.get(dependency));
    this.antiRecursionSet.delete(fabric);
    // eslint-disable-next-line new-cap
    return new fabric(...args);
  }
}
