"use strict";

exports.getTimeZoneLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
const getTimeZoneLayoutItemConfig = (editorTemplate, dataField, colSpan, visibleIndex, visible) => ({
  dataField,
  visibleIndex,
  colSpan,
  label: {
    text: ' '
  },
  visible,
  template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
});
exports.getTimeZoneLayoutItemConfig = getTimeZoneLayoutItemConfig;