/**
* DevExtreme (cjs/__internal/core/templates/m_template_base.js)
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
exports.renderedCallbacks = exports.TemplateBase = void 0;
var _visibility_change = require("../../../common/core/events/visibility_change");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _dom = require("../../../core/utils/dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const renderedCallbacks = exports.renderedCallbacks = (0, _callbacks.default)({
  syncStrategy: true
});
class TemplateBase {
  render(options) {
    options = options || {};
    const {
      onRendered
    } = options;
    delete options.onRendered;
    let $result;
    if (options.renovated && options.transclude && this._element) {
      $result = (0, _renderer.default)('<div>').append(this._element).contents();
    } else {
      // @ts-expect-error need type overload
      $result = this._renderCore(options);
    }
    this._ensureResultInContainer($result, options.container);
    renderedCallbacks.fire($result, options.container);
    onRendered && onRendered();
    return $result;
  }
  _ensureResultInContainer($result, container) {
    if (!container) {
      return;
    }
    const $container = (0, _renderer.default)(container);
    const resultInContainer = (0, _dom.contains)($container.get(0), $result.get(0));
    $container.append($result);
    if (resultInContainer) {
      return;
    }
    const resultInBody = (0, _dom.contains)(_dom_adapter.default.getBody(), $container.get(0));
    if (!resultInBody) {
      return;
    }
    (0, _visibility_change.triggerShownEvent)($result);
  }
  _renderCore() {
    throw _errors.default.Error('E0001');
  }
}
exports.TemplateBase = TemplateBase;
