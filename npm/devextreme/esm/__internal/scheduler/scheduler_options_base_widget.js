/**
* DevExtreme (esm/__internal/scheduler/scheduler_options_base_widget.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Widget from '../../ui/widget/ui.widget';
import { extend } from '../core/utils/m_extend';
import timeZoneUtils from './m_utils_time_zone';
import { DEFAULT_SCHEDULER_INTEGRATION_OPTIONS, DEFAULT_SCHEDULER_INTERNAL_OPTIONS, DEFAULT_SCHEDULER_OPTIONS, DEFAULT_SCHEDULER_OPTIONS_RULES } from './utils/options/constants';
import { getCurrentView, getViewOption, getViews } from './utils/options/utils';
import { SchedulerOptionsValidator, SchedulerOptionsValidatorErrorsHandler } from './utils/options_validator/index';
export class SchedulerOptionsBaseWidget extends Widget {
  constructor() {
    super(...arguments);
    this.views = [];
  }
  _init() {
    // @ts-expect-error
    super._init();
    this.optionsValidator = new SchedulerOptionsValidator();
    this.optionsValidatorErrorHandler = new SchedulerOptionsValidatorErrorsHandler();
  }
  _getDefaultOptions() {
    // @ts-expect-error
    const options = super._getDefaultOptions();
    return extend(true, options, Object.assign({}, DEFAULT_SCHEDULER_OPTIONS, DEFAULT_SCHEDULER_INTERNAL_OPTIONS, DEFAULT_SCHEDULER_INTEGRATION_OPTIONS));
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    const rules = super._defaultOptionsRules();
    return rules.concat(DEFAULT_SCHEDULER_OPTIONS_RULES);
  }
  updateViews() {
    const views = this.option('views') ?? [];
    this.views = getViews(views);
    this.currentView = getCurrentView(this.option('currentView') ?? '', views);
  }
  _initMarkup() {
    // @ts-expect-error
    super._initMarkup();
    this.updateViews();
    this.validateOptions();
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
    const currentViewOptions = Object.assign({}, this.option(), {
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
  getTimeZone() {
    return (this.option('timeZone') || timeZoneUtils.getMachineTimezoneName()) ?? 'Etc/UTC';
  }
  getViewOption(optionName) {
    var _this$currentView;
    const viewOptionValue = (_this$currentView = this.currentView) === null || _this$currentView === void 0 ? void 0 : _this$currentView[optionName];
    const optionValue = viewOptionValue ?? this.option(optionName);
    return getViewOption(optionName, optionValue);
  }
  hasAgendaView() {
    return this.views.some(view => view.type === 'agenda' || view.name === 'agenda');
  }
}
