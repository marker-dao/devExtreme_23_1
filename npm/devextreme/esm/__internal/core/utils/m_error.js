/**
* DevExtreme (esm/__internal/core/utils/m_error.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable import/no-commonjs */
import { extend } from '../../../core/utils/extend';
import { format } from '../../../core/utils/string';
import { version } from '../../../core/version';
import consoleUtils from './m_console';
const ERROR_URL = `https://js.devexpress.com/error/${version.split('.').slice(0, 2).join('_')}/`;
function error(baseErrors, errors) {
  const exports = {
    ERROR_MESSAGES: extend(errors, baseErrors),
    // eslint-disable-next-line object-shorthand
    Error: function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return makeError(args);
    },
    log() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const id = args[0];
      let method = 'log';
      if (/^E\d+$/.test(id)) {
        method = 'error';
      } else if (/^W\d+$/.test(id)) {
        method = 'warn';
      }
      consoleUtils.logger[method](method === 'log' ? id : combineMessage(args));
    }
  };
  function combineMessage(args) {
    const id = args[0];
    args = args.slice(1);
    return formatMessage(id, formatDetails(id, args));
  }
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return format.apply(this, args).replace(/\.*\s*?$/, '');
  }
  function formatMessage(id, details) {
    const kind = id !== null && id !== void 0 && id.startsWith('W') ? 'warning' : 'error';
    return format.apply(this, ['{0} - {1}.\n\nFor additional information on this {2} message, see: {3}', id, details, kind, getErrorUrl(id)]);
  }
  function makeError(args) {
    const id = args[0];
    args = args.slice(1);
    const details = formatDetails(id, args);
    const url = getErrorUrl(id);
    const message = formatMessage(id, details);
    return extend(new Error(message), {
      __id: id,
      __details: details,
      url
    });
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}
export { error };
export default error;
