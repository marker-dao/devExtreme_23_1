/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/options_validator_errors_handler.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../../ui/widget/ui.errors';
import { OptionsValidatorErrorHandler } from './core/index';
const GLOBAL_ERROR_HANDLER = {
  logError: function (errorCode) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    errors.log(errorCode, ...args);
  },
  throwError: function (errorCode) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    throw errors.Error(errorCode, ...args);
  }
};
export class SchedulerOptionsValidatorErrorsHandler extends OptionsValidatorErrorHandler {
  constructor() {
    super({
      startDayHour: 'E1058',
      endDayHour: 'E1058',
      startDayHourAndEndDayHour: 'E1058',
      offset: 'E1061',
      cellDuration: 'E1062',
      cellDurationAndVisibleInterval: 'E1062',
      views: 'W0008'
    }, GLOBAL_ERROR_HANDLER);
  }
}
