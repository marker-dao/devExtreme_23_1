/**
* DevExtreme (cjs/__internal/scheduler/shaders/m_current_time_shader.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DATE_TIME_SHADER_CLASS = 'dx-scheduler-date-time-shader';
class CurrentTimeShader {
  constructor(_workSpace) {
    this._workSpace = _workSpace;
    this._$container = this._workSpace._dateTableScrollable.$content();
  }
  render() {
    this.initShaderElements();
    this.renderShader();
    this._shader.forEach(shader => {
      this._$container.append(shader);
    });
  }
  initShaderElements() {
    this._$shader = this.createShader();
    this._shader = [];
    this._shader.push(this._$shader);
  }
  renderShader() {}
  createShader() {
    return (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_CLASS);
  }
  clean() {
    this._$container && this._$container.find(`.${DATE_TIME_SHADER_CLASS}`).remove();
  }
}
var _default = exports.default = CurrentTimeShader;
