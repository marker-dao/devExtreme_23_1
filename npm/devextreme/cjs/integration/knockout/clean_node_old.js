/**
* DevExtreme (cjs/integration/knockout/clean_node_old.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _knockout = _interopRequireDefault(require("knockout"));
var _version = require("../../core/utils/version");
var _element_data = require("../../core/element_data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

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
      return originalEmpty.apply(this, arguments);
    };
    const originalRemove = jQuery.fn.remove;
    jQuery.fn.remove = function (selector, keepData) {
      if (!keepData) {
        let subject = this;
        if (selector) {
          subject = subject.filter(selector);
        }
        cleanKoData(subject, true);
      }
      return originalRemove.call(this, selector, keepData);
    };
    const originalHtml = jQuery.fn.html;
    jQuery.fn.html = function (value) {
      if (typeof value === 'string') {
        cleanKoData(this, false);
      }
      return originalHtml.apply(this, arguments);
    };
    const originalReplaceWith = jQuery.fn.replaceWith;
    jQuery.fn.replaceWith = function () {
      const result = originalReplaceWith.apply(this, arguments);
      if (!this.parent().length) {
        cleanKoData(this, true);
      }
      return result;
    };
  };
  _element_data.strategyChanging.add(function (strategy) {
    const isJQuery = !!strategy.fn;
    if (isJQuery && (0, _version.compare)(strategy.fn.jquery, [2, 0]) < 0) {
      patchCleanData(strategy);
    }
  });
}
