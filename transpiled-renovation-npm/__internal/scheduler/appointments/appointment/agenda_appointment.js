"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgendaAppointment = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_classes = require("../../m_classes");
var _m_appointment = require("./m_appointment");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AgendaAppointment extends _m_appointment.Appointment {
  get coloredElement() {
    return this.$element().find(`.${_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER}`);
  }
  _renderResourceList() {
    const resourceManager = this.option('getResourceManager')();
    // eslint-disable-next-line no-void
    void resourceManager.getAppointmentResourcesValues(this.rawAppointment).then(list => {
      const parent = this.$element().find(`.${_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS}`);
      const container = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(parent);
      list.forEach(item => {
        const itemContainer = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(container);
        (0, _renderer.default)('<div>').text(`${item.label}:`).appendTo(itemContainer);
        (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(item.values.join(', ')).appendTo(itemContainer);
      });
    });
  }
  _render() {
    super._render();
    this._renderResourceList();
  }
}
exports.AgendaAppointment = AgendaAppointment;