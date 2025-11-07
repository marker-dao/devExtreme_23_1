/**
* DevExtreme (esm/__internal/core/state_manager/dev/logger.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const LOG_TYPE_TO_LEVEL = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
export class Logger {
  constructor(options) {
    this.logLevel = (options === null || options === void 0 ? void 0 : options.logLevel) ?? 'info';
    this.prefix = (options === null || options === void 0 ? void 0 : options.prefix) ?? '';
  }
  setLevel(level) {
    this.logLevel = level;
  }
  setPrefix(prefix) {
    this.prefix = prefix;
  }
  debug(message) {
    if (this.shouldLog('debug')) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      console.debug(this.formatMessage(message), ...args);
    }
  }
  info(message) {
    if (this.shouldLog('info')) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      console.info(this.formatMessage(message), ...args);
    }
  }
  warn(message) {
    if (this.shouldLog('warn')) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      console.warn(this.formatMessage(message), ...args);
    }
  }
  error(message) {
    if (this.shouldLog('error')) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      console.error(this.formatMessage(message), ...args);
    }
  }
  formatMessage(message) {
    return this.prefix ? `${this.prefix} ${message}` : message;
  }
  shouldLog(level) {
    return LOG_TYPE_TO_LEVEL[level] >= LOG_TYPE_TO_LEVEL[this.logLevel];
  }
}
