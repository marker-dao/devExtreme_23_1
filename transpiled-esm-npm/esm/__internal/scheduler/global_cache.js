import { isDefined } from '../../core/utils/type';
export class Cache {
  constructor() {
    this.cache = new Map();
  }
  get size() {
    return this.cache.size;
  }
  clear() {
    this.cache.clear();
  }
  get(name) {
    return this.cache.get(name);
  }
  memo(name, valueCallback) {
    if (!this.cache.has(name)) {
      const value = valueCallback();
      if (isDefined(value)) {
        this.cache.set(name, value);
      }
    }
    return this.cache.get(name);
  }
  delete(name) {
    this.cache.delete(name);
  }
}
export const globalCache = {
  timezones: new Cache()
};