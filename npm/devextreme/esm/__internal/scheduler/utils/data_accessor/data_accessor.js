/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/data_accessor.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/m_type';
export class DataAccessor {
  constructor() {
    /** @deprecated instead of `getter` property use `get` function. getter will be private */
    this.getter = {};
    /** @deprecated instead of `setter` property use `set` function. setter will be private */
    this.setter = {};
  }
  updateExpressions(fields) {
    Object.entries(fields).forEach(_ref => {
      let [key, value] = _ref;
      return this.updateExpression(key, value);
    });
  }
  get(field, obj) {
    if (this.getter[field]) {
      return this.getter[field](obj);
    }
    return undefined;
  }
  set(field, obj, value) {
    if (this.setter[field]) {
      this.setter[field](obj, value);
    }
    return this;
  }
  has(field) {
    return isDefined(this.getter[field]);
  }
}
