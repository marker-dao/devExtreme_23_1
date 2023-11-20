"use strict";

exports.getDescriptionLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
const getDescriptionLayoutItemConfig = (editorTemplate, dataField, label) => ({
  dataField,
  colSpan: 2,
  label: {
    text: label
  },
  template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
});
exports.getDescriptionLayoutItemConfig = getDescriptionLayoutItemConfig;