/**
* DevExtreme (cjs/ui/gantt/ui.gantt.templates.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttTemplatesManager = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _element = require("../../core/element");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GanttTemplatesManager {
  constructor(gantt) {
    this._gantt = gantt;
  }
  getTaskTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: this._gantt.getTaskDataByCoreData(item),
        container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskProgressTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: item,
        container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskTimeTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: item,
        container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskContentTemplateFunc(taskContentTemplateOption) {
    const isTaskShowing = true;
    const template = taskContentTemplateOption && this._gantt._getTemplate(taskContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback, index) => {
      item.taskData = this._gantt.getTaskDataByCoreData(item.taskData);
      template.render({
        model: item,
        container: (0, _element.getPublicElement)((0, _renderer.default)(container)),
        onRendered: () => {
          callback(container, index);
        }
      });
      return isTaskShowing;
    });
    return createTemplateFunction;
  }
}
exports.GanttTemplatesManager = GanttTemplatesManager;
