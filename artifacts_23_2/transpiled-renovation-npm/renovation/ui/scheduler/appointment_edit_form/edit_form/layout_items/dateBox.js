"use strict";

exports.getDateBoxLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
const getDateBoxLayoutItemConfig = (editorTemplate, dataField, colSpan, labelText) => ({
  dataField,
  colSpan,
  label: {
    text: labelText
  },
  validationRules: [{
    type: 'required'
  }],
  template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
});
exports.getDateBoxLayoutItemConfig = getDateBoxLayoutItemConfig;