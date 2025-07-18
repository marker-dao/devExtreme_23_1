export class WidgetMock {
  constructor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widget, data, columns, headerFilter, filterSync) {
    this.widget = widget;
    this.data = data;
    this.columns = columns;
    this.headerFilter = headerFilter;
    this.filterSync = filterSync;
    this.NAME = 'dxDataGrid';
    this._controllers = {
      data: this.data,
      columns: this.columns,
      headerFilter: this.headerFilter,
      filterSync: this.filterSync
    };
  }
  option() {
    // @ts-expect-error
    return this.widget.option(...arguments);
  }
  columnOption() {
    // @ts-expect-error
    return this.widget.columnOption(...arguments);
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