"use strict";

exports.getRenderEditorTemplate = void 0;
var _inferno = require("@devextreme/runtime/inferno");
const getRenderEditorTemplate = editorTemplate => (item, container) => {
  (0, _inferno.renderTemplate)(() => editorTemplate, {
    item,
    container
  }, null);
};
exports.getRenderEditorTemplate = getRenderEditorTemplate;