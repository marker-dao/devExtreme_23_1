/**
* DevExtreme (cjs/__internal/core/di/index.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIContext = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
class DIContext {
  constructor() {
    this.instances = new Map();
    this.fabrics = new Map();
    this.aliases = new Map();
    this.antiRecursionSet = new Set();
    this.globalDecorators = [];
  }
  register(id, fabric) {
    // eslint-disable-next-line no-param-reassign
    fabric ?? (fabric = id);
    this.fabrics.set(id, fabric);
  }
  registerInstance(id, instance) {
    const decoratedInstance = this.applyGlobalDecorators(instance);
    this.instances.set(id, decoratedInstance);
  }
  get(id) {
    const instance = this.tryGet(id);
    if (instance) {
      return instance;
    }
    throw new Error(`DI item is not registered: ${id}`);
  }
  tryGet(id) {
    // eslint-disable-next-line no-param-reassign
    id = this.resolveAlias(id);
    if (this.instances.get(id)) {
      return this.instances.get(id);
    }
    const fabric = this.fabrics.get(id);
    if (fabric) {
      const instance = this.create(fabric);
      const decoratedInstance = this.applyGlobalDecorators(instance);
      this.instances.set(id, decoratedInstance);
      this.instances.set(fabric, decoratedInstance);
      return decoratedInstance;
    }
    return null;
  }
  registerDecorator(decoratorFn) {
    if (this.hasInitiatedInstances) {
      throw new Error('Cannot register decorator: decorators must be registered before any instances are created or retrieved from the DI container.');
    }
    this.globalDecorators.push(decoratorFn);
  }
  get hasInitiatedInstances() {
    return this.instances.size > 0;
  }
  applyGlobalDecorators(instance) {
    return this.globalDecorators.reduce((currentInstance, currentDecorator) => currentDecorator(currentInstance), instance);
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
  addAlias(aliasId, id) {
    this.aliases.set(aliasId, id);
  }
  resolveAlias(aliasId) {
    let result = aliasId;
    /*
      NOTE: cycle it here for case when some alias resolves to another alias.
      e.g. A -> B -> C
      We need to resolve until we get class without aliases
    */
    while (this.aliases.has(result)) {
      result = this.aliases.get(result);
    }
    return result;
  }
}
exports.DIContext = DIContext;
