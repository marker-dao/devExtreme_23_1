/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getHeight, getWidth, setHeight, setWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
export class GanttSizeHelper {
  constructor(gantt) {
    this._gantt = gantt;
  }
  _setTreeListDimension(dimension, value) {
    var _this$_gantt$_ganttTr;
    const setter = dimension === 'width' ? setWidth : setHeight;
    const getter = dimension === 'width' ? getWidth : getHeight;
    setter(this._gantt._$treeListWrapper, value);
    (_this$_gantt$_ganttTr = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr === void 0 || _this$_gantt$_ganttTr.setOption(dimension, getter(this._gantt._$treeListWrapper));
  }
  _setGanttViewDimension(dimension, value) {
    const setter = dimension === 'width' ? setWidth : setHeight;
    const getter = dimension === 'width' ? getWidth : getHeight;
    setter(this._gantt._$ganttView, value);
    this._gantt._setGanttViewOption(dimension, getter(this._gantt._$ganttView));
  }
  _getPanelsWidthByOption() {
    var _leftPanelWidth$index, _leftPanelWidth$index2;
    const ganttWidth = getWidth(this._gantt.$element());
    const {
      taskListWidth: leftPanelWidth
    } = this._gantt.option();
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let rightPanelWidth;
    // @ts-expect-error ts-error
    if (!isNaN(leftPanelWidth)) {
      // @ts-expect-error ts-error
      rightPanelWidth = ganttWidth - parseInt(leftPanelWidth, 10);
      // @ts-expect-error ts-error
    } else if (((_leftPanelWidth$index = leftPanelWidth.indexOf) === null || _leftPanelWidth$index === void 0 ? void 0 : _leftPanelWidth$index.call(leftPanelWidth, 'px')) > 0) {
      // @ts-expect-error ts-error
      rightPanelWidth = `${ganttWidth - parseInt(leftPanelWidth.replace('px', ''), 10)}px`;
      // @ts-expect-error ts-error
    } else if (((_leftPanelWidth$index2 = leftPanelWidth.indexOf) === null || _leftPanelWidth$index2 === void 0 ? void 0 : _leftPanelWidth$index2.call(leftPanelWidth, '%')) > 0) {
      // @ts-expect-error ts-error
      rightPanelWidth = `${100 - parseInt(leftPanelWidth.replace('%', ''), 10)}%`;
    }
    // @ts-expect-error ts-error
    return {
      leftPanelWidth,
      rightPanelWidth
    };
  }
  onAdjustControl() {
    const elementHeight = getHeight(this._gantt.$element());
    this.updateGanttWidth();
    this.setGanttHeight(elementHeight);
  }
  onApplyPanelSize(e) {
    this.setInnerElementsWidth(e);
    this.updateGanttRowHeights();
  }
  updateGanttRowHeights() {
    var _this$_gantt$_ganttTr2;
    const rowHeight = (_this$_gantt$_ganttTr2 = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr2 === void 0 ? void 0 : _this$_gantt$_ganttTr2.getRowHeight();
    if (this._gantt._getGanttViewOption('rowHeight') !== rowHeight) {
      var _this$_gantt$_ganttVi;
      this._gantt._setGanttViewOption('rowHeight', rowHeight);
      (_this$_gantt$_ganttVi = this._gantt._ganttView) === null || _this$_gantt$_ganttVi === void 0 || _this$_gantt$_ganttVi._ganttViewCore.updateRowHeights(rowHeight);
    }
  }
  adjustHeight() {
    if (!this._gantt._hasHeight) {
      var _this$_gantt$_ganttTr3;
      this._gantt._setGanttViewOption('height', 0);
      this._gantt._setGanttViewOption('height', (_this$_gantt$_ganttTr3 = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr3 === void 0 ? void 0 : _this$_gantt$_ganttTr3.getOffsetHeight());
    }
  }
  setInnerElementsWidth(widths) {
    var _widths, _widths2;
    if (!hasWindow()) {
      return;
    }
    const takeWithFromOption = !widths;
    if (takeWithFromOption) {
      // eslint-disable-next-line no-param-reassign
      widths = this._getPanelsWidthByOption();
      this._setTreeListDimension('width', 0);
      this._setGanttViewDimension('width', 0);
    }
    this._setTreeListDimension('width', (_widths = widths) === null || _widths === void 0 ? void 0 : _widths.leftPanelWidth);
    this._setGanttViewDimension('width', (_widths2 = widths) === null || _widths2 === void 0 ? void 0 : _widths2.rightPanelWidth);
    if (takeWithFromOption) {
      var _this$_gantt$_splitte;
      (_this$_gantt$_splitte = this._gantt._splitter) === null || _this$_gantt$_splitte === void 0 || _this$_gantt$_splitte._setSplitterPositionLeft();
    }
  }
  updateGanttWidth() {
    var _this$_gantt$_splitte2;
    (_this$_gantt$_splitte2 = this._gantt._splitter) === null || _this$_gantt$_splitte2 === void 0 || _this$_gantt$_splitte2._dimensionChanged();
  }
  setGanttHeight(height) {
    var _this$_gantt$_ganttVi2;
    // @ts-expect-error ts-error
    const toolbarHeightOffset = this._gantt._$toolbarWrapper.get(0).offsetHeight;
    const mainWrapperHeight = height - toolbarHeightOffset;
    this._setTreeListDimension('height', mainWrapperHeight);
    this._setGanttViewDimension('height', mainWrapperHeight);
    (_this$_gantt$_ganttVi2 = this._gantt._ganttView) === null || _this$_gantt$_ganttVi2 === void 0 || _this$_gantt$_ganttVi2._ganttViewCore.resetAndUpdate();
  }
}