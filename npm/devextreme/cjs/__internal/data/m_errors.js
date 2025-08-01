/**
* DevExtreme (cjs/__internal/data/m_errors.js)
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
exports.setErrorHandler = exports.handleError = exports.errors = exports.errorHandler = void 0;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _error = _interopRequireDefault(require("../../core/utils/error"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const errors = exports.errors = (0, _error.default)(_errors.default.ERROR_MESSAGES, {
  E4000: '[DevExpress.data]: {0}',
  E4001: 'Unknown aggregating function is detected: \'{0}\'',
  E4002: 'Unsupported OData protocol version is used',
  E4003: 'Unknown filter operation is used: {0}',
  E4004: 'The thenby() method is called before the sortby() method',
  E4005: 'Store requires a key expression for this operation',
  E4006: 'ArrayStore \'data\' option must be an array',
  E4007: 'Compound keys cannot be auto-generated',
  E4008: 'Attempt to insert an item with a duplicated key',
  E4009: 'Data item cannot be found',
  E4010: 'CustomStore does not support creating queries',
  E4011: 'Custom Store method is not implemented or is not a function: {0}',
  E4012: 'Custom Store method returns an invalid value: {0}',
  E4013: 'Local Store requires the \'name\' configuration option is specified',
  E4014: 'Unknown data type is specified for ODataStore: {0}',
  E4015: 'Unknown entity name or alias is used: {0}',
  E4016: 'The compileSetter(expr) method is called with \'self\' passed as a parameter',
  E4017: 'Keys cannot be modified',
  E4018: 'The server has returned a non-numeric value in a response to an item count request',
  E4019: 'Mixing of group operators inside a single group of filter expression is not allowed',
  E4020: 'Unknown store type is detected: {0}',
  E4021: 'The server response does not provide the totalCount value',
  E4022: 'The server response does not provide the groupCount value',
  E4023: 'Could not parse the following XML: {0}',
  E4024: 'String function {0} cannot be used with the data field {1} of type {2}.',
  W4000: 'Data returned from the server has an incorrect structure',
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: 'Data loading has failed for some cells due to the following error: {0}'
});
// eslint-disable-next-line import/no-mutable-exports
let errorHandler = exports.errorHandler = null;
const handleError = function (error) {
  var _errorHandler;
  // @ts-expect-error
  (_errorHandler = errorHandler) === null || _errorHandler === void 0 || _errorHandler(error);
};
// eslint-disable-next-line no-return-assign
exports.handleError = handleError;
const setErrorHandler = handler => exports.errorHandler = errorHandler = handler;
exports.setErrorHandler = setErrorHandler;
