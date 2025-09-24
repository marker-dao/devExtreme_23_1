import _extends from "@babel/runtime/helpers/esm/extends";
import Widget from '../../ui/widget/ui.widget';
import { extend } from '../core/utils/m_extend';
import { DEFAULT_SCHEDULER_INTEGRATION_OPTIONS, DEFAULT_SCHEDULER_INTERNAL_OPTIONS, DEFAULT_SCHEDULER_OPTIONS, DEFAULT_SCHEDULER_OPTIONS_RULES, DEPRECATED_SCHEDULER_OPTIONS } from './utils/options/constants';
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
    return extend(true, options, _extends({}, DEFAULT_SCHEDULER_OPTIONS, DEFAULT_SCHEDULER_INTERNAL_OPTIONS, DEFAULT_SCHEDULER_INTEGRATION_OPTIONS));
  }
  _setDeprecatedOptions() {
    // @ts-expect-error
    super._setDeprecatedOptions();
    // @ts-expect-error
    extend(this._deprecatedOptions, DEPRECATED_SCHEDULER_OPTIONS);
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
    return getViewOption(optionName, optionValue);
  }
  hasAgendaView() {
    return this.views.some(view => view.type === 'agenda' || view.name === 'agenda');
  }
}