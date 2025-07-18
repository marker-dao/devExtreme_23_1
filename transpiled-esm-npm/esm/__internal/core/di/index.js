/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
export class DIContext {
  constructor() {
    this.instances = new Map();
    this.fabrics = new Map();
    this.aliases = new Map();
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
    // eslint-disable-next-line no-param-reassign
    id = this.resolveAlias(id);
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