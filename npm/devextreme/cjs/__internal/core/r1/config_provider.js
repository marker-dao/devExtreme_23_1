/**
* DevExtreme (cjs/__internal/core/r1/config_provider.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProviderDefaultProps = exports.ConfigProvider = void 0;
var _index = require("../../core/r1/runtime/inferno/index");
var _config_context = require("./config_context");
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

const ConfigProviderDefaultProps = exports.ConfigProviderDefaultProps = {};
class ConfigProvider extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.__getterCache = {};
  }
  get config() {
    if (this.__getterCache.config !== undefined) {
      return this.__getterCache.config;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.config = (() => ({
      rtlEnabled: this.props.rtlEnabled
    }))();
  }
  componentWillUpdate(nextProps) {
    if (this.props.rtlEnabled !== nextProps.rtlEnabled) {
      this.__getterCache.config = undefined;
    }
  }
  getChildContext() {
    return Object.assign({}, this.context, {
      [_config_context.ConfigContext.id]: this.config || _config_context.ConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
exports.ConfigProvider = ConfigProvider;
ConfigProvider.defaultProps = ConfigProviderDefaultProps;
