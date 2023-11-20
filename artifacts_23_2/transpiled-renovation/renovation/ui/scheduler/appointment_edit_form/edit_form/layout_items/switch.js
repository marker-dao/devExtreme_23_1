"use strict";

exports.getSwitchLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
const AppointmentFormClass = 'dx-appointment-form-switch';
const getSwitchLayoutItemConfig = (editorTemplate, dataField, label) => ({
  dataField,
  cssClass: AppointmentFormClass,
  label: {
    text: label,
    location: 'right'
  },
  template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
});
exports.getSwitchLayoutItemConfig = getSwitchLayoutItemConfig;