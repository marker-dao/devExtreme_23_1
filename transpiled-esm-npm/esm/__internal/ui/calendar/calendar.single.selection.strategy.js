import CalendarSelectionStrategy from './calendar.selection.strategy';
class CalendarSingleSelectionStrategy extends CalendarSelectionStrategy {
  constructor(component) {
    super(component);
    this.NAME = 'SingleSelection';
  }
  dateOption(optionName) {
    if (optionName === 'value') {
      return this.calendar._getDateOption('value');
    }
    return this.calendar._getDateOption(optionName);
  }
  getViewOptions() {
    const value = this.dateOption('value') ?? undefined;
    return {
      value,
      range: [],
      selectionMode: 'single'
    };
  }
  selectValue(selectedValue, e) {
    this.skipNavigate();
    this.dateValue(selectedValue, e);
  }
  updateAriaSelected(val, previousVal) {
    const value = val ?? [this.dateOption('value')];
    const previousValue = previousVal ?? [];
    super.updateAriaSelected(value, previousValue);
  }
  getDefaultCurrentDate() {
    return this.dateOption('value');
  }
  restoreValue() {
    this.calendar.option('value', null);
  }
  _updateViewsValue(value) {
    this._updateViewsOption('value', value[0]);
  }
}
export default CalendarSingleSelectionStrategy;