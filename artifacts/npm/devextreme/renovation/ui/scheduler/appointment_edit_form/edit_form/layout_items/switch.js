/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/switch.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
