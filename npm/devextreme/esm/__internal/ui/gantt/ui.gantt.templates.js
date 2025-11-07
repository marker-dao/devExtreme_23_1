/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.templates.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
export class GanttTemplatesManager {
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
        container: getPublicElement($(container)),
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
        container: getPublicElement($(container)),
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
        container: getPublicElement($(container)),
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
        container: getPublicElement($(container)),
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
