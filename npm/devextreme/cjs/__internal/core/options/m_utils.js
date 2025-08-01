/**
* DevExtreme (cjs/__internal/core/options/m_utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOptions = exports.getParentName = exports.getNestedOptionValue = exports.getFieldName = exports.deviceMatch = exports.createDefaultOptionRules = exports.convertRulesToOptions = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const cachedGetters = {};
const convertRulesToOptions = rules => {
  const currentDevice = _devices.default.current();
  return rules.reduce((options, _ref) => {
    let {
      device,
      options: ruleOptions
    } = _ref;
    const deviceFilter = device || {};
    const match = (0, _type.isFunction)(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match) {
      (0, _extend.extend)(true, options, ruleOptions);
    }
    return options;
  }, {});
};
exports.convertRulesToOptions = convertRulesToOptions;
const normalizeOptions = (options, value) => typeof options !== 'string' ? options : {
  [options]: value
};
exports.normalizeOptions = normalizeOptions;
const deviceMatch = (device, filter) => (0, _type.isEmptyObject)(filter) || (0, _common.findBestMatches)(device, [filter]).length > 0;
exports.deviceMatch = deviceMatch;
const getFieldName = fullName => fullName.substr(fullName.lastIndexOf('.') + 1);
exports.getFieldName = getFieldName;
const getParentName = fullName => fullName.substr(0, fullName.lastIndexOf('.'));
exports.getParentName = getParentName;
const getNestedOptionValue = function (optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || (0, _data.compileGetter)(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
exports.getNestedOptionValue = getNestedOptionValue;
const createDefaultOptionRules = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return options;
};
exports.createDefaultOptionRules = createDefaultOptionRules;
