/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_appointment_layout.js)
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
exports.createAppointmentLayout = exports.createAgendaAppointmentLayout = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_classes = require("../m_classes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const allDayText = ` ${_message.default.format('dxScheduler-allDay')}: `;
const recurringText = _message.default.format('dxScheduler-appointmentAriaLabel-recurring');
const createAppointmentLayout = (formatText, config) => {
  const result = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
  (0, _renderer.default)('<div>').text(formatText.text).addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).appendTo(result);
  if (config.html) {
    result.html(config.html);
  }
  const $contentDetails = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(result);
  (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(formatText.formatDate).appendTo($contentDetails);
  config.isRecurrence && (0, _renderer.default)('<span>').addClass(`${_m_classes.APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON} dx-icon-repeat`).attr('aria-label', recurringText).attr('role', 'img').appendTo(result);
  config.isAllDay && (0, _renderer.default)('<div>').text(allDayText).addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo($contentDetails);
  return result;
};
exports.createAppointmentLayout = createAppointmentLayout;
const createAgendaAppointmentLayout = (formatText, config) => {
  const result = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
  const leftLayoutContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-agenda-appointment-left-layout').appendTo(result);
  const rightLayoutContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-agenda-appointment-right-layout').appendTo(result);
  // eslint-disable-next-line no-unused-vars
  const marker = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER).appendTo(leftLayoutContainer);
  config.isRecurrence && (0, _renderer.default)('<span>').addClass(`${_m_classes.APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON} dx-icon-repeat`).attr('aria-label', recurringText).appendTo(marker);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const text = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).text(formatText.text).appendTo(rightLayoutContainer);
  const additionalContainer = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(rightLayoutContainer);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const date = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(formatText.formatDate).appendTo(additionalContainer);
  if (config.isAllDay) {
    (0, _renderer.default)('<div>').text(allDayText).addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo(additionalContainer);
  }
  return result;
};
exports.createAgendaAppointmentLayout = createAgendaAppointmentLayout;
