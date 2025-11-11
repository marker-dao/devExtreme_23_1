/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.task.area.container.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ScrollView from '../../ui/scroll_view/scroll_view';
export class TaskAreaContainer {
  constructor(element, ganttViewWidget) {
    this._element = element;
    this._scrollView = ganttViewWidget._createComponent(this._element, ScrollView, {
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
