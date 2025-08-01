/**
* DevExtreme (esm/__internal/core/options/m_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../core/devices';
import { findBestMatches } from '../../../core/utils/common';
import { compileGetter } from '../../../core/utils/data';
import { extend } from '../../../core/utils/extend';
import { isEmptyObject, isFunction } from '../../../core/utils/type';
const cachedGetters = {};
export const convertRulesToOptions = rules => {
  const currentDevice = devices.current();
  return rules.reduce((options, _ref) => {
    let {
      device,
      options: ruleOptions
    } = _ref;
    const deviceFilter = device || {};
    const match = isFunction(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match) {
      extend(true, options, ruleOptions);
    }
    return options;
  }, {});
};
export const normalizeOptions = (options, value) => typeof options !== 'string' ? options : {
  [options]: value
};
export const deviceMatch = (device, filter) => isEmptyObject(filter) || findBestMatches(device, [filter]).length > 0;
export const getFieldName = fullName => fullName.substr(fullName.lastIndexOf('.') + 1);
export const getParentName = fullName => fullName.substr(0, fullName.lastIndexOf('.'));
export const getNestedOptionValue = function (optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || compileGetter(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
export const createDefaultOptionRules = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return options;
};
