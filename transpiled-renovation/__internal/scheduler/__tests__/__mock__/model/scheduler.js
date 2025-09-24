"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchedulerModel = exports.SchedulerModel = void 0;
var _m_popup = require("../../../appointment_popup/m_popup");
var _m_scheduler = require("../../../m_scheduler");
var _appointment = require("./appointment");
var _popup = require("./popup");
const getTexts = cells => Array.from(cells).map(cell => {
  var _cell$textContent;
  return ((_cell$textContent = cell.textContent) === null || _cell$textContent === void 0 ? void 0 : _cell$textContent.trim()) ?? '';
});
class SchedulerModel {
  constructor(container) {
    this.getPopups = () => document.querySelectorAll(`.dx-overlay-wrapper.${_m_popup.APPOINTMENT_POPUP_CLASS}, .dx-overlay-wrapper.${_m_scheduler.POPUP_DIALOG_CLASS}`);
    this.getLoadPanel = () => document.querySelector('.dx-loadpanel');
    this.getTooltipAppointment = () => document.querySelector('.dx-tooltip-appointment-item');
    this.container = container;
  }
  get popup() {
    return this.getPopup();
  }
  getAppointment(text) {
    if (!text) {
      return (0, _appointment.createAppointmentModel)(this.container.querySelector('.dx-scheduler-appointment'));
    }
    return this.getAppointments().find(appointment => appointment.getText() === text) ?? (0, _appointment.createAppointmentModel)(null);
  }
  getAppointments() {
    return [...this.container.querySelectorAll('.dx-scheduler-appointment')].map(element => (0, _appointment.createAppointmentModel)(element));
  }
  getDateTableContent() {
    const cells = this.container.querySelectorAll('.dx-scheduler-date-table-cell');
    return getTexts(cells);
  }
  getHeaderPanelContent() {
    const cells = this.container.querySelectorAll('.dx-scheduler-header-panel-cell');
    return getTexts(cells);
  }
  getTimePanelContent() {
    const cells = this.container.querySelectorAll('.dx-scheduler-time-panel-cell');
    return getTexts(cells);
  }
  getGroupTableContent() {
    const cells = this.container.querySelectorAll('.dx-scheduler-group-header');
    return getTexts(cells);
  }
  getPopup() {
    const elements = this.getPopups();
    if (elements.length === 0) {
      throw new Error('Popup is not rendered');
    }
    const popupElement = elements[0];
    return new _popup.PopupModel(popupElement);
  }
  openPopupByDblClick(text) {
    const appointment = this.getAppointment(text);
    if (!(appointment !== null && appointment !== void 0 && appointment.element)) {
      throw new Error(`Appointment "${text}" not found`);
    }
    appointment.element.click();
    appointment.element.click();
    return appointment;
  }
}
exports.SchedulerModel = SchedulerModel;
const createSchedulerModel = container => {
  const model = new SchedulerModel(container);
  return model;
};
exports.createSchedulerModel = createSchedulerModel;