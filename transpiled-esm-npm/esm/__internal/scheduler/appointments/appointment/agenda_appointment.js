import $ from '../../../../core/renderer';
import { APPOINTMENT_CONTENT_CLASSES } from '../../m_classes';
import { Appointment } from './m_appointment';
export class AgendaAppointment extends Appointment {
  get coloredElement() {
    return this.$element().find(`.${APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER}`);
  }
  _renderResourceList() {
    // eslint-disable-next-line no-void
    void this.resourceProcessor.getAppointmentResourcesValues(this.rawAppointment).then(list => {
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