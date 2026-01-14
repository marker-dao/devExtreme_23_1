"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationConfigProviderDefaultProps = exports.PaginationConfigProvider = void 0;
var _index = require("../../core/r1/runtime/inferno/index");
var _pagination_config_context = require("./pagination_config_context");
/* eslint-disable @typescript-eslint/no-explicit-any */

const PaginationConfigProviderDefaultProps = exports.PaginationConfigProviderDefaultProps = {};
class PaginationConfigProvider extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  getConfig() {
    return {
      isGridCompatibilityMode: this.props.isGridCompatibilityMode
    };
  }
  getChildContext() {
    return Object.assign({}, this.context, {
      [_pagination_config_context.PaginationConfigContext.id]: this.getConfig() || _pagination_config_context.PaginationConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
exports.PaginationConfigProvider = PaginationConfigProvider;
PaginationConfigProvider.defaultProps = PaginationConfigProviderDefaultProps;