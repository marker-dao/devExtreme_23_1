/**
* DevExtreme (esm/__internal/integration/knockout/clean_node_old.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable func-names */
import { strategyChanging } from '../../core/m_element_data';
import { compare as compareVersion } from '../../core/utils/m_version';
// eslint-disable-next-line import/no-extraneous-dependencies
import ko from 'knockout';
if (ko) {
  const patchCleanData = function (jQuery) {
    const cleanKoData = function (element, andSelf) {
      const cleanNode = function () {
        ko.cleanNode(this);
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
  strategyChanging.add(strategy => {
    const isJQuery = !!strategy.fn;
    if (isJQuery && compareVersion(strategy.fn.jquery, [2, 0]) < 0) {
      patchCleanData(strategy);
    }
  });
}
