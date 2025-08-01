/**
* DevExtreme (cjs/__internal/scheduler/utils/loader/utils.js)
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
exports.normalizeDataSource = exports.loadResource = void 0;
var _data_source = _interopRequireDefault(require("../../../../data/data_source"));
var _m_utils = require("../../../data/data_source/m_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const normalizeDataSource = function (dataSourceOptions) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!dataSourceOptions) {
    return undefined;
  }
  if (dataSourceOptions instanceof _data_source.default) {
    return dataSourceOptions;
  }
  const result = _extends({}, (0, _m_utils.normalizeDataSourceOptions)(dataSourceOptions, {}), options);
  return new _data_source.default(result);
};
exports.normalizeDataSource = normalizeDataSource;
const loadResource = async function (dataSource) {
  let forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!dataSource) {
    return [];
  }
  if (forceReload) {
    return new Promise((resolve, reject) => {
      dataSource.reload().then(resolve, reject);
    });
  }
  if (dataSource.isLoaded()) {
    return dataSource.items();
  }
  return new Promise((resolve, reject) => {
    dataSource.load().then(resolve, reject);
  });
};
exports.loadResource = loadResource;
