/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.templates.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttTemplatesManager = void 0;
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

class GanttTemplatesManager {
  constructor(gantt) {
    this._gantt = gantt;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createTemplateFunction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createTemplateFunction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createTemplateFunction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createTemplateFunction;
  }
}
exports.GanttTemplatesManager = GanttTemplatesManager;
