/**
* DevExtreme (cjs/__internal/integration/knockout/clean_node_old.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_element_data = require("../../core/m_element_data");
var _m_version = require("../../core/utils/m_version");
var _knockout = _interopRequireDefault(require("knockout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable func-names */

// eslint-disable-next-line import/no-extraneous-dependencies

if (_knockout.default) {
  const patchCleanData = function (jQuery) {
    const cleanKoData = function (element, andSelf) {
      const cleanNode = function () {
        _knockout.default.cleanNode(this);
      };
      if (andSelf) {
        element.each(cleanNode);
      } else {
        element.find('*').each(cleanNode);
      }
    };
    const originalEmpty = jQuery.fn.empty;
    jQuery.fn.empty = function () {
      cleanKoData(this, false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return originalEmpty.apply(this, args);
    };
    const originalRemove = jQuery.fn.remove;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    jQuery.fn.remove = function (selector, keepData) {
      if (!keepData) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let subject = this;
        if (selector) {
          subject = subject.filter(selector);
        }
        cleanKoData(subject, true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return originalRemove.call(this, selector, keepData);
    };
    const originalHtml = jQuery.fn.html;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    jQuery.fn.html = function (value) {
      if (typeof value === 'string') {
        cleanKoData(this, false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,prefer-rest-params
      return originalHtml.apply(this, arguments);
    };
    const originalReplaceWith = jQuery.fn.replaceWith;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    jQuery.fn.replaceWith = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const result = originalReplaceWith.apply(this, args);
      if (!this.parent().length) {
        cleanKoData(this, true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    };
  };
  _m_element_data.strategyChanging.add(strategy => {
    const isJQuery = !!strategy.fn;
    if (isJQuery && (0, _m_version.compare)(strategy.fn.jquery, [2, 0]) < 0) {
      patchCleanData(strategy);
    }
  });
}
