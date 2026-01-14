"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplate = void 0;
var _inferno = require("inferno");
// NOTE: React vs Inferno type conflict here
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, Object.assign({}, props))) : TemplateProp);
exports.getTemplate = getTemplate;