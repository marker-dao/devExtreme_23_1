/**
* DevExtreme (cjs/__internal/scheduler/scheduler_options_base_widget.js)
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
exports.SchedulerOptionsBaseWidget = void 0;
var _ui = _interopRequireDefault(require("../../ui/widget/ui.widget"));
var _m_extend = require("../core/utils/m_extend");
var _constants = require("./utils/options/constants");
var _utils = require("./utils/options/utils");
var _index = require("./utils/options_validator/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class SchedulerOptionsBaseWidget extends _ui.default {
  constructor() {
    super(...arguments);
    this.views = [];
  }
  _init() {
    // @ts-expect-error
    super._init();
    this.optionsValidator = new _index.SchedulerOptionsValidator();
    this.optionsValidatorErrorHandler = new _index.SchedulerOptionsValidatorErrorsHandler();
  }
  _getDefaultOptions() {
    // @ts-expect-error
    const options = super._getDefaultOptions();
    return (0, _m_extend.extend)(true, options, _extends({}, _constants.DEFAULT_SCHEDULER_OPTIONS, _constants.DEFAULT_SCHEDULER_INTERNAL_OPTIONS, _constants.DEFAULT_SCHEDULER_INTEGRATION_OPTIONS));
  }
  _setDeprecatedOptions() {
    // @ts-expect-error
    super._setDeprecatedOptions();
    // @ts-expect-error
    (0, _m_extend.extend)(this._deprecatedOptions, _constants.DEPRECATED_SCHEDULER_OPTIONS);
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    const rules = super._defaultOptionsRules();
    return rules.concat(_constants.DEFAULT_SCHEDULER_OPTIONS_RULES);
  }
  updateViews() {
    const views = this.option('views') ?? [];
    this.views = (0, _utils.getViews)(views);
    this.currentView = (0, _utils.getCurrentView)(this.option('currentView') ?? '', views);
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup();
    this.updateViews();
  }
  schedulerOptionChanged(args) {
    switch (args.name) {
      case 'currentView':
      case 'views':
        this.updateViews();
        break;
      default:
        break;
    }
    this.validateOptions();
  }
  validateOptions() {
    const currentViewOptions = _extends({}, this.option(), {
      // NOTE: We override this.option values here
      // because the old validation logic checked only current view options.
      // Changing it and validate all views configuration will be a BC.
      startDayHour: this.getViewOption('startDayHour'),
      endDayHour: this.getViewOption('endDayHour'),
      offset: this.getViewOption('offset'),
      cellDuration: this.getViewOption('cellDuration')
    });
    const validationResult = this.optionsValidator.validate(currentViewOptions);
    this.optionsValidatorErrorHandler.handleValidationResult(validationResult);
  }
  getViewOption(optionName) {
    var _this$currentView;
    const viewOptionValue = (_this$currentView = this.currentView) === null || _this$currentView === void 0 ? void 0 : _this$currentView[optionName];
    const optionValue = viewOptionValue ?? this.option(optionName);
    return (0, _utils.getViewOption)(optionName, optionValue);
  }
  hasAgendaView() {
    return this.views.some(view => view.type === 'agenda' || view.name === 'agenda');
  }
}
exports.SchedulerOptionsBaseWidget = SchedulerOptionsBaseWidget;
