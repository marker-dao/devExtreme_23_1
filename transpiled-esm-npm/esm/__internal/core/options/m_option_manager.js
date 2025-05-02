/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { normalizeOptions } from '../../../core/options/utils';
import { noop } from '../../../core/utils/common';
import { equals } from '../../../core/utils/comparator';
import { compileGetter, compileSetter, getPathParts } from '../../../core/utils/data';
import { extend } from '../../../core/utils/extend';
import { isDefined, isPlainObject } from '../../../core/utils/type';
const cachedGetters = {};
const cachedSetters = {};
export class OptionManager {
  constructor(options, optionsByReference) {
    this._options = options;
    this._optionsByReference = optionsByReference;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
    this._validateOptionsCallback;
  }
  _setByReference(options, rulesOptions) {
    extend(true, options, rulesOptions);
    for (const fieldName in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
        options[fieldName] = rulesOptions[fieldName];
      }
    }
  }
  _setPreparedValue(name, value, merge, silent) {
    const previousValue = this.get(this._options, name, false);
    if (!equals(previousValue, value)) {
      const path = getPathParts(name);
      !silent && this._changingCallback(name, previousValue, value);
      cachedSetters[name] = cachedSetters[name] || compileSetter(name);
      cachedSetters[name](this._options, value, {
        functionsAsIs: true,
        merge: isDefined(merge) ? merge : !this._optionsByReference[name],
        unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
      });
      !silent && this._changedCallback(name, value, previousValue);
    }
  }
  _prepareRelevantNames(options, name, value, silent) {
    if (isPlainObject(value)) {
      for (const valueName in value) {
        this._prepareRelevantNames(options, `${name}.${valueName}`, value[valueName]);
      }
    }
    this._namePreparedCallbacks(options, name, value, silent);
  }
  // eslint-disable-next-line @typescript-eslint/default-param-last
  get() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._options;
    let name = arguments.length > 1 ? arguments[1] : undefined;
    let unwrapObservables = arguments.length > 2 ? arguments[2] : undefined;
    cachedGetters[name] = cachedGetters[name] || compileGetter(name);
    return cachedGetters[name](options, {
      functionsAsIs: true,
      unwrapObservables
    });
  }
  set(options, value, merge, silent) {
    options = normalizeOptions(options, value);
    for (const name in options) {
      this._prepareRelevantNames(options, name, options[name], silent);
    }
    if (this._validateOptionsCallback) {
      options = this._validateOptionsCallback(options);
    }
    for (const name in options) {
      this._setPreparedValue(name, options[name], merge, silent);
    }
  }
  onRelevantNamesPrepared(callBack) {
    this._namePreparedCallbacks = callBack;
  }
  onChanging(callBack) {
    this._changingCallback = callBack;
  }
  onChanged(callBack) {
    this._changedCallback = callBack;
  }
  onValidateOptions(callback) {
    this._validateOptionsCallback = callback;
  }
  dispose() {
    this._changingCallback = noop;
    this._changedCallback = noop;
  }
}