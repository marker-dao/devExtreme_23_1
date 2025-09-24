/**
* DevExtreme (esm/__internal/scheduler/__tests__/__mock__/model/scheduler.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { APPOINTMENT_POPUP_CLASS } from '../../../appointment_popup/m_popup';
import { POPUP_DIALOG_CLASS } from '../../../m_scheduler';
import { createAppointmentModel } from './appointment';
import { PopupModel } from './popup';
const getTexts = cells => Array.from(cells).map(cell => {
  var _cell$textContent;
  return ((_cell$textContent = cell.textContent) === null || _cell$textContent === void 0 ? void 0 : _cell$textContent.trim()) ?? '';
});
export class SchedulerModel {
  constructor(container) {
    this.getPopups = () => document.querySelectorAll(`.dx-overlay-wrapper.${APPOINTMENT_POPUP_CLASS}, .dx-overlay-wrapper.${POPUP_DIALOG_CLASS}`);
    this.getLoadPanel = () => document.querySelector('.dx-loadpanel');
    this.getTooltipAppointment = () => document.querySelector('.dx-tooltip-appointment-item');
    this.container = container;
  }
  get popup() {
    return this.getPopup();
  }
  getAppointment(text) {
    if (!text) {
      return createAppointmentModel(this.container.querySelector('.dx-scheduler-appointment'));
    }
    return this.getAppointments().find(appointment => appointment.getText() === text) ?? createAppointmentModel(null);
  }
  getAppointments() {
    return [...this.container.querySelectorAll('.dx-scheduler-appointment')].map(element => createAppointmentModel(element));
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
    return new PopupModel(popupElement);
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
export const createSchedulerModel = container => {
  const model = new SchedulerModel(container);
  return model;
};
