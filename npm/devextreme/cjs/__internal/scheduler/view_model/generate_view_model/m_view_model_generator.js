/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/m_view_model_generator.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentViewModelGenerator = void 0;
var _date = require("../../../core/utils/date");
var _adapt_agenda_settings = require("./adapt_agenda_settings");
var _add_collector = require("./add_collector");
var _m_strategy_agenda = _interopRequireDefault(require("./rendering_strategies/m_strategy_agenda"));
var _m_strategy_horizontal = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal"));
var _m_strategy_horizontal_month = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal_month"));
var _m_strategy_horizontal_month_line = _interopRequireDefault(require("./rendering_strategies/m_strategy_horizontal_month_line"));
var _m_strategy_vertical = _interopRequireDefault(require("./rendering_strategies/m_strategy_vertical"));
var _m_strategy_week = _interopRequireDefault(require("./rendering_strategies/m_strategy_week"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RENDERING_STRATEGIES = {
  horizontal: _m_strategy_horizontal.default,
  horizontalMonth: _m_strategy_horizontal_month.default,
  horizontalMonthLine: _m_strategy_horizontal_month_line.default,
  vertical: _m_strategy_vertical.default,
  week: _m_strategy_week.default,
  agenda: _m_strategy_agenda.default
};
class AppointmentViewModelGenerator {
  initRenderingStrategy(options) {
    const RenderingStrategy = RENDERING_STRATEGIES[options.appointmentRenderingStrategyName];
    this.renderingStrategy = new RenderingStrategy(options);
  }
  getRenderingStrategy() {
    return this.renderingStrategy;
  }
  generate(filteredItems, options) {
    const {
      viewOffset,
      appointmentRenderingStrategyName,
      dataAccessors,
      timeZoneCalculator
    } = options;
    const appointments = filteredItems ? filteredItems.slice() : [];
    this.initRenderingStrategy(options);
    const renderingStrategy = this.getRenderingStrategy();
    const positionMap = renderingStrategy.createTaskPositionMap(appointments); // appointments are mutated inside!
    const shiftedViewModel = this.postProcess(appointments, positionMap);
    const viewModel = this.unshiftViewModelAppointmentsByViewOffset(shiftedViewModel, viewOffset);
    viewModel.forEach(item => {
      item.settings.forEach(settings => {
        settings.geometry = appointmentRenderingStrategyName === 'agenda' ? undefined : renderingStrategy.getAppointmentGeometry(settings);
      });
    });
    const viewModelPlain = appointmentRenderingStrategyName === 'agenda' ? (0, _adapt_agenda_settings.adaptAgendaSettings)(viewModel, dataAccessors, timeZoneCalculator) : (0, _add_collector.addCollector)(viewModel, timeZoneCalculator);
    return {
      positionMap,
      viewModel: viewModelPlain
    };
  }
  postProcess(filteredItems, positionMap) {
    const renderingStrategy = this.getRenderingStrategy();
    return filteredItems.map((data, index) => {
      // TODO research do we need this code
      if (!renderingStrategy.keepAppointmentSettings()) {
        delete data.settings;
      }
      // TODO Seems we can analize direction in the rendering strategies
      const appointmentSettings = positionMap[index];
      appointmentSettings.forEach(item => {
        item.direction = renderingStrategy.getDirection() === 'vertical' && !item.allDay ? 'vertical' : 'horizontal';
      });
      const item = {
        itemData: data,
        settings: appointmentSettings,
        needRepaint: true,
        needRemove: false
      };
      return item;
    });
  }
  // NOTE: Unfortunately, we cannot implement immutable behavior here
  // because in this case it will break the refs (keys) of dataSource's appointments,
  // and it will break appointment updates :(
  unshiftViewModelAppointmentsByViewOffset(viewModel, viewOffset) {
    const processedAppointments = new Set();
    // eslint-disable-next-line no-restricted-syntax
    for (const model of viewModel) {
      // eslint-disable-next-line no-restricted-syntax
      for (const setting of model.settings ?? []) {
        var _setting$info;
        const appointment = setting === null || setting === void 0 || (_setting$info = setting.info) === null || _setting$info === void 0 ? void 0 : _setting$info.appointment;
        if (appointment && !processedAppointments.has(appointment)) {
          appointment.startDate = _date.dateUtilsTs.addOffsets(appointment.startDate, viewOffset);
          appointment.endDate = _date.dateUtilsTs.addOffsets(appointment.endDate, viewOffset);
          appointment.normalizedEndDate = _date.dateUtilsTs.addOffsets(appointment.normalizedEndDate, viewOffset);
          processedAppointments.add(appointment);
        }
      }
    }
    return viewModel;
  }
}
exports.AppointmentViewModelGenerator = AppointmentViewModelGenerator;
