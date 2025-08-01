/**
* DevExtreme (cjs/__internal/ui/m_validation_group.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../../core/dom_component"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _m_validation_engine = _interopRequireDefault(require("./m_validation_engine"));
var _m_validation_summary = _interopRequireDefault(require("./m_validation_summary"));
var _m_validator = _interopRequireDefault(require("./m_validator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VALIDATION_ENGINE_CLASS = 'dx-validationgroup';
const VALIDATOR_CLASS = 'dx-validator';
const VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
class ValidationGroup extends _dom_component.default {
  _getDefaultOptions() {
    // @ts-expect-error
    return super._getDefaultOptions();
  }
  _init() {
    // @ts-expect-error ts-error
    super._init();
    _m_validation_engine.default.addGroup(this, false);
  }
  _initMarkup() {
    const $element = this.$element();
    $element.addClass(VALIDATION_ENGINE_CLASS);
    // @ts-expect-error ts-error
    $element.find(`.${VALIDATOR_CLASS}`).each((_, validatorContainer) => {
      _m_validator.default.getInstance((0, _renderer.default)(validatorContainer))._initGroupRegistration();
    });
    // @ts-expect-error ts-error
    $element.find(`.${VALIDATION_SUMMARY_CLASS}`).each((_, summaryContainer) => {
      _m_validation_summary.default.getInstance((0, _renderer.default)(summaryContainer)).refreshValidationGroup();
    });
    // @ts-expect-error ts-error
    super._initMarkup();
  }
  validate() {
    return _m_validation_engine.default.validateGroup(this);
  }
  reset() {
    return _m_validation_engine.default.resetGroup(this);
  }
  _dispose() {
    _m_validation_engine.default.removeGroup(this);
    this.$element().removeClass(VALIDATION_ENGINE_CLASS);
    // @ts-expect-error ts-error
    super._dispose();
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
}
(0, _component_registrator.default)('dxValidationGroup', ValidationGroup);
var _default = exports.default = ValidationGroup;
