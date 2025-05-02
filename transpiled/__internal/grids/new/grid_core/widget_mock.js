"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetMock = void 0;
class WidgetMock {
  constructor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widget, data, columns) {
    this.widget = widget;
    this.data = data;
    this.columns = columns;
    this.NAME = 'dxDataGrid';
    this._controllers = {
      data: this.data,
      columns: this.columns,
      filterSync: {
        getCustomFilterOperations() {
          return [];
        }
      }
    };
  }
  option() {
    // @ts-expect-error
    return this.widget.option(...arguments);
  }
  _createActionByOption() {
    // @ts-expect-error
    return this.widget._createActionByOption(...arguments);
  }
  _createComponent() {
    // @ts-expect-error
    return this.widget._createComponent(...arguments);
  }
}
exports.WidgetMock = WidgetMock;