/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.task.area.container.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskAreaContainer = void 0;
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TaskAreaContainer {
  constructor(element, ganttViewWidget) {
    this._element = element;
    this._scrollView = ganttViewWidget._createComponent(this._element, _scroll_view.default, {
      scrollByContent: false,
      scrollByThumb: true,
      showScrollbar: 'onHover',
      direction: 'both',
      onScroll: () => {
        ganttViewWidget.updateView();
      }
    });
  }
  // ITaskAreaContainer
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get scrollTop() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._scrollView.scrollTop();
  }
  set scrollTop(value) {
    const diff = value - this._scrollView.scrollTop();
    if (diff !== 0) {
      this._scrollView.scrollBy({
        left: 0,
        top: diff
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get scrollLeft() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._scrollView.scrollLeft();
  }
  set scrollLeft(value) {
    const diff = value - this._scrollView.scrollLeft();
    if (diff !== 0) {
      this._scrollView.scrollBy({
        left: diff,
        top: 0
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get scrollWidth() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._scrollView.scrollWidth();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get scrollHeight() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._scrollView.scrollHeight();
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isExternal() {
    return true;
  }
  getWidth() {
    return this._element.offsetWidth;
  }
  getHeight() {
    return this._element.offsetHeight;
  }
  getElement() {
    return this._element;
  }
}
exports.TaskAreaContainer = TaskAreaContainer;
