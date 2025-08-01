/**
* DevExtreme (esm/__internal/scheduler/appointments/appointment/agenda_appointment.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { APPOINTMENT_CONTENT_CLASSES } from '../../m_classes';
import { Appointment } from './m_appointment';
export class AgendaAppointment extends Appointment {
  get coloredElement() {
    return this.$element().find(`.${APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER}`);
  }
  _renderResourceList() {
    const resourceManager = this.option('getResourceManager')();
    // eslint-disable-next-line no-void
    void resourceManager.getAppointmentResourcesValues(this.rawAppointment).then(list => {
      const parent = this.$element().find(`.${APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS}`);
      const container = $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(parent);
      list.forEach(item => {
        const itemContainer = $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(container);
        $('<div>').text(`${item.label}:`).appendTo(itemContainer);
        $('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(item.values.join(', ')).appendTo(itemContainer);
      });
    });
  }
  _render() {
    super._render();
    this._renderResourceList();
  }
}
