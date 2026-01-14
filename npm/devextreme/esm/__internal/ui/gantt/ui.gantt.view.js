/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.view.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { cancelAnimationFrame, requestAnimationFrame } from '../../../common/core/animation/frame';
import coreLocalization from '../../../common/core/localization/core';
import dateLocalization from '../../../common/core/localization/date';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { format } from '../../../core/utils/string';
import { isDefined } from '../../../core/utils/type';
import Widget from '../../core/widget/widget';
import { getGanttViewCore } from '../../ui/gantt/gantt_importer';
import { TaskAreaContainer } from '../../ui/gantt/ui.gantt.task.area.container';
const visualStateKey = 'visualState';
const fullScreenModeKey = 'fullScreen';
export class GanttView extends Widget {
  _init() {
    super._init();
    this._onSelectionChanged = this._createActionByOption('onSelectionChanged');
    this._onViewTypeChanged = this._createActionByOption('onViewTypeChanged');
    this._onScroll = this._createActionByOption('onScroll');
    this._onDialogShowing = this._createActionByOption('onDialogShowing');
    this._onPopupMenuShowing = this._createActionByOption('onPopupMenuShowing');
    this._onPopupMenuHiding = this._createActionByOption('onPopupMenuHiding');
    this._expandAll = this._createActionByOption('onExpandAll');
    this._collapseAll = this._createActionByOption('onCollapseAll');
    this._taskClick = this._createActionByOption('onTaskClick');
    this._taskDblClick = this._createActionByOption('onTaskDblClick');
    this._onAdjustControl = this._createActionByOption('onAdjustControl');
  }
  _initMarkup() {
    var _this$option;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const GanttView = getGanttViewCore();
    this._ganttViewCore = new GanttView(this.$element().get(0), this, {
      showResources: this.option('showResources'),
      showDependencies: this.option('showDependencies'),
      taskTitlePosition: this._getTaskTitlePosition(this.option('taskTitlePosition')),
      firstDayOfWeek: this._getFirstDayOfWeek(this.option('firstDayOfWeek')),
      allowSelectTask: this.option('allowSelection'),
      startDateRange: this.option('startDateRange'),
      endDateRange: this.option('endDateRange'),
      editing: this._parseEditingSettings(this.option('editing')),
      validation: this.option('validation'),
      stripLines: {
        // @ts-expect-error ts-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        stripLines: (_this$option = this.option('stripLines')) === null || _this$option === void 0 ? void 0 : _this$option.map(item => Object.assign({}, item))
      },
      areHorizontalBordersEnabled: this.option('showRowLines'),
      areAlternateRowsEnabled: false,
      viewType: this._getViewTypeByScaleType(this.option('scaleType')),
      viewTypeRange: this._parseViewTypeRangeSettings(this.option('scaleTypeRange')),
      cultureInfo: this._getCultureInfo(),
      taskTooltipContentTemplate: this.option('taskTooltipContentTemplate'),
      taskProgressTooltipContentTemplate: this.option('taskProgressTooltipContentTemplate'),
      taskTimeTooltipContentTemplate: this.option('taskTimeTooltipContentTemplate'),
      taskContentTemplate: this.option('taskContentTemplate'),
      sieve: this.option('sieve')
    });
    this._selectTask(this.option('selectedRowKey'));
    this.updateBarItemsState();
    const visualState = this.option(visualStateKey);
    if (visualState) {
      // eslint-disable-next-line @stylistic/max-len
      this._restoreStateFrameId = requestAnimationFrame(() => this._restoreVisualState(visualState));
    }
  }
  _dispose() {
    super._dispose();
    cancelAnimationFrame(this._restoreStateFrameId);
  }
  _restoreVisualState(state) {
    if (state[fullScreenModeKey]) {
      this._ganttViewCore.setFullScreenMode();
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getFirstDayOfWeek(value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isDefined(value) ? value : dateLocalization.firstDayOfWeekIndex();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTaskAreaContainer() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._ganttViewCore.getTaskAreaContainer();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getBarManager() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._ganttViewCore.barManager;
  }
  executeCoreCommand(id) {
    const command = this._ganttViewCore.getCommandByKey(id);
    if (command) {
      command.execute();
    }
  }
  changeTaskExpanded(id, value) {
    this._ganttViewCore.changeTaskExpanded(id, value);
  }
  updateView() {
    var _this$_ganttViewCore;
    (_this$_ganttViewCore = this._ganttViewCore) === null || _this$_ganttViewCore === void 0 || _this$_ganttViewCore.updateView();
  }
  updateBarItemsState() {
    this._ganttViewCore.barManager.updateItemsState([]);
  }
  setWidth(value) {
    this._ganttViewCore.setWidth(value);
  }
  _onDimensionChanged() {
    this._ganttViewCore.onBrowserWindowResize();
  }
  _selectTask(id) {
    this._ganttViewCore.selectTaskById(id);
  }
  _update(keepExpandState) {
    var _this$_ganttViewCore2;
    (_this$_ganttViewCore2 = this._ganttViewCore) === null || _this$_ganttViewCore2 === void 0 || _this$_ganttViewCore2.updateWithDataReload(keepExpandState);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCultureInfo() {
    return {
      // @ts-expect-error ts-error
      monthNames: dateLocalization.getMonthNames('wide'),
      // @ts-expect-error ts-error
      dayNames: dateLocalization.getDayNames('wide'),
      abbrMonthNames: dateLocalization.getMonthNames('abbreviated'),
      abbrDayNames: dateLocalization.getDayNames('abbreviated'),
      quarterNames: this._getQuarterNames(),
      amText: this._getAmText(),
      pmText: this._getPmText(),
      start: messageLocalization.format('dxGantt-dialogStartTitle'),
      end: messageLocalization.format('dxGantt-dialogEndTitle'),
      progress: messageLocalization.format('dxGantt-dialogProgressTitle')
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getAmText() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._hasAmPM() ? dateLocalization.getPeriodNames()[0] : '';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPmText() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._hasAmPM() ? dateLocalization.getPeriodNames()[1] : '';
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _hasAmPM() {
    const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
    const dateString = date.toLocaleTimeString(coreLocalization.locale());
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return /am|pm/i.exec(dateString) || /am|pm/i.exec(date.toString());
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getQuarterNames() {
    const quarterFormat = messageLocalization.format('dxGantt-quarter');
    if (!quarterFormat) {
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return dateLocalization.getQuarterNames();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [format(quarterFormat, 1), format(quarterFormat, 2), format(quarterFormat, 3), format(quarterFormat, 4)];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskTitlePosition(value) {
    switch (value) {
      case 'outside':
        return 1;
      case 'none':
        return 2;
      default:
        return 0;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getViewTypeByScaleType(scaleType) {
    switch (scaleType) {
      case 'minutes':
        return 0;
      case 'hours':
        return 1;
      case 'sixHours':
        return 2;
      case 'days':
        return 3;
      case 'weeks':
        return 4;
      case 'months':
        return 5;
      case 'quarters':
        return 6;
      case 'years':
        return 7;
      default:
        return undefined;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _parseEditingSettings(value) {
    return {
      enabled: value.enabled,
      allowDependencyDelete: value.allowDependencyDeleting,
      allowDependencyInsert: value.allowDependencyAdding,
      allowTaskDelete: value.allowTaskDeleting,
      allowTaskInsert: value.allowTaskAdding,
      allowTaskUpdate: value.allowTaskUpdating,
      allowResourceDelete: value.allowResourceDeleting,
      allowResourceInsert: value.allowResourceAdding,
      allowResourceUpdate: value.allowResourceUpdating,
      allowTaskResourceUpdate: value.allowTaskResourceUpdating
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _parseViewTypeRangeSettings(value) {
    return {
      min: this._getViewTypeByScaleType(value.min),
      max: this._getViewTypeByScaleType(value.max)
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _optionChanged(args) {
    switch (args.name) {
      case 'width':
        super._optionChanged(args);
        this._ganttViewCore.setWidth(args.value);
        break;
      case 'height':
        this._ganttViewCore.setHeight(args.value);
        break;
      case 'tasks':
      case 'dependencies':
      case 'resources':
      case 'resourceAssignments':
        this._sieveOptions = undefined;
        this._update(true);
        break;
      case 'showResources':
        this._ganttViewCore.setShowResources(args.value);
        break;
      case 'showDependencies':
        this._ganttViewCore.setShowDependencies(args.value);
        break;
      case 'taskTitlePosition':
        this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(args.value));
        break;
      case 'firstDayOfWeek':
        this._ganttViewCore.setFirstDayOfWeek(this._getFirstDayOfWeek(args.value));
        break;
      case 'startDateRange':
        this._ganttViewCore.setStartDateRange(args.value);
        break;
      case 'endDateRange':
        this._ganttViewCore.setEndDateRange(args.value);
        break;
      case 'allowSelection':
        this._ganttViewCore.setAllowSelection(args.value);
        break;
      case 'selectedRowKey':
        this._selectTask(args.value);
        break;
      case 'editing':
        this._ganttViewCore.setEditingSettings(this._parseEditingSettings(args.value));
        break;
      case 'validation':
        this._ganttViewCore.setValidationSettings(args.value);
        this._update(true);
        break;
      case 'showRowLines':
        this._ganttViewCore.setRowLinesVisible(args.value);
        break;
      case 'scaleType':
        this._ganttViewCore.setViewType(this._getViewTypeByScaleType(args.value));
        break;
      case 'scaleTypeRange':
        this._ganttViewCore.setViewTypeRange(this._getViewTypeByScaleType(args.value.min), this._getViewTypeByScaleType(args.value.max));
        break;
      case 'stripLines':
        this._ganttViewCore.setStripLines({
          stripLines: this.option('stripLines')
        });
        break;
      case 'taskTooltipContentTemplate':
        this._ganttViewCore.setTaskTooltipContentTemplate(args.value);
        break;
      case 'taskProgressTooltipContentTemplate':
        this._ganttViewCore.setTaskProgressTooltipContentTemplate(args.value);
        break;
      case 'taskTimeTooltipContentTemplate':
        this._ganttViewCore.setTaskTimeTooltipContentTemplate(args.value);
        break;
      case 'taskContentTemplate':
        this._ganttViewCore.setTaskContentTemplate(args.value);
        break;
      case 'sieve':
        this._sortAndFilter(args.value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  // IGanttOwner
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get bars() {
    return this.option('bars');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getRowHeight() {
    return this.option('rowHeight');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getHeaderHeight() {
    return this.option('headerHeight');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getGanttTasksData() {
    const tasks = this.option('tasks');
    const sieveOptions = this.getSieveOptions();
    if (sieveOptions !== null && sieveOptions !== void 0 && sieveOptions.sievedItems && sieveOptions !== null && sieveOptions !== void 0 && sieveOptions.sieveColumn) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return sieveOptions.sievedItems;
    }
    return tasks;
  }
  _sortAndFilter(args) {
    this._sieveOptions = args;
    this._update(!(args !== null && args !== void 0 && args.expandTasks));
    const selectedRowKey = this.option('selectedRowKey');
    this._selectTask(selectedRowKey);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSieveOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._sieveOptions;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getGanttDependenciesData() {
    return this.option('dependencies');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getGanttResourcesData() {
    return this.option('resources');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getGanttResourceAssignmentsData() {
    return this.option('resourceAssignments');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getGanttWorkTimeRules() {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getExternalTaskAreaContainer(element) {
    if (!this._taskAreaContainer) {
      this._taskAreaContainer = new TaskAreaContainer(element, this);
    }
    return this._taskAreaContainer;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  prepareExternalTaskAreaContainer(element, info) {
    if (info !== null && info !== void 0 && info.height) {
      var _this$_taskAreaContai;
      (_this$_taskAreaContai = this._taskAreaContainer) === null || _this$_taskAreaContai === void 0 || _this$_taskAreaContai._scrollView.option('height', info.height);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  changeGanttTaskSelection(id, selected) {
    var _this$_onSelectionCha;
    (_this$_onSelectionCha = this._onSelectionChanged) === null || _this$_onSelectionCha === void 0 || _this$_onSelectionCha.call(this, {
      id,
      selected
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onGanttScroll(scrollTop) {
    var _this$_onScroll;
    (_this$_onScroll = this._onScroll) === null || _this$_onScroll === void 0 || _this$_onScroll.call(this, {
      scrollTop
    });
  }
  showDialog(name, parameters, callback, afterClosing) {
    var _this$_onDialogShowin;
    (_this$_onDialogShowin = this._onDialogShowing) === null || _this$_onDialogShowin === void 0 || _this$_onDialogShowin.call(this, {
      name,
      parameters,
      callback,
      afterClosing
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getModelChangesListener() {
    return this.option('modelChangesListener');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getExportInfo() {
    return this.option('exportInfo');
  }
  showPopupMenu(info) {
    var _this$_onPopupMenuSho;
    (_this$_onPopupMenuSho = this._onPopupMenuShowing) === null || _this$_onPopupMenuSho === void 0 || _this$_onPopupMenuSho.call(this, info);
  }
  hidePopupMenu(info) {
    var _this$_onPopupMenuHid;
    (_this$_onPopupMenuHid = this._onPopupMenuHiding) === null || _this$_onPopupMenuHid === void 0 || _this$_onPopupMenuHid.call(this, info);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getMainElement() {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.option('mainElement').get(0);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  adjustControl() {
    var _this$_onAdjustContro;
    (_this$_onAdjustContro = this._onAdjustControl) === null || _this$_onAdjustContro === void 0 || _this$_onAdjustContro.call(this);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getRequireFirstLoadParentAutoCalc() {
    return this.option('validation.autoUpdateParentTasks');
  }
  collapseAll() {
    var _this$_collapseAll;
    (_this$_collapseAll = this._collapseAll) === null || _this$_collapseAll === void 0 || _this$_collapseAll.call(this);
  }
  expandAll() {
    var _this$_expandAll;
    (_this$_expandAll = this._expandAll) === null || _this$_expandAll === void 0 || _this$_expandAll.call(this);
  }
  onTaskClick(key, event) {
    var _this$_taskClick;
    (_this$_taskClick = this._taskClick) === null || _this$_taskClick === void 0 || _this$_taskClick.call(this, {
      key,
      event
    });
    return true;
  }
  onTaskDblClick(key, event) {
    var _this$_taskDblClick;
    return (_this$_taskDblClick = this._taskDblClick) === null || _this$_taskDblClick === void 0 ? void 0 : _this$_taskDblClick.call(this, {
      key,
      event
    });
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
  onGanttViewContextMenu(event, key, type) {
    return true;
  }
  getFormattedDateText(date) {
    let result = '';
    if (date) {
      const datePart = dateLocalization.format(date, 'shortDate');
      const timeFormat = this._hasAmPM() ? 'hh:mm a' : 'HH:mm';
      const timePart = dateLocalization.format(date, timeFormat);
      result = `${datePart} ${timePart}`;
    }
    return result;
  }
  destroyTemplate(container) {
    $(container).empty();
  }
  onTaskAreaSizeChanged(info) {
    var _this$_taskAreaContai2;
    const scrollView = (_this$_taskAreaContai2 = this._taskAreaContainer) === null || _this$_taskAreaContai2 === void 0 ? void 0 : _this$_taskAreaContai2._scrollView;
    if (isDefined(info === null || info === void 0 ? void 0 : info.height)) {
      var _this$_taskAreaContai3;
      // @ts-expect-error ts-error
      const direction = (info === null || info === void 0 ? void 0 : info.height) > ((_this$_taskAreaContai3 = this._taskAreaContainer) === null || _this$_taskAreaContai3 === void 0 ? void 0 : _this$_taskAreaContai3.getHeight()) ? 'both' : 'horizontal';
      scrollView.option('direction', direction);
    }
  }
  updateGanttViewType(type) {
    var _this$_onViewTypeChan;
    (_this$_onViewTypeChan = this._onViewTypeChanged) === null || _this$_onViewTypeChan === void 0 || _this$_onViewTypeChan.call(this, {
      type
    });
  }
  // export
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTreeListTableStyle() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callExportHelperMethod('getTreeListTableStyle');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTreeListColCount() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callExportHelperMethod('getTreeListColCount');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTreeListHeaderInfo(colIndex) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callExportHelperMethod('getTreeListHeaderInfo', colIndex);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTreeListCellInfo(rowIndex, colIndex, key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callExportHelperMethod('getTreeListCellInfo', key, colIndex);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTreeListEmptyDataCellInfo() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callExportHelperMethod('getTreeListEmptyDataCellInfo');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  callExportHelperMethod(methodName) {
    const helper = this.option('exportHelper');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return helper[methodName](...args);
  }
  applyTasksExpandedState(state) {
    var _this$_ganttViewCore3;
    (_this$_ganttViewCore3 = this._ganttViewCore) === null || _this$_ganttViewCore3 === void 0 || _this$_ganttViewCore3.applyTasksExpandedState(state);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getVisualStateToRestore() {
    var _this$_ganttViewCore4, _this$_ganttViewCore5;
    return {
      [fullScreenModeKey]: (_this$_ganttViewCore4 = this._ganttViewCore) === null || _this$_ganttViewCore4 === void 0 || (_this$_ganttViewCore5 = _this$_ganttViewCore4.isInFullScreenMode) === null || _this$_ganttViewCore5 === void 0 ? void 0 : _this$_ganttViewCore5.call(_this$_ganttViewCore4)
    };
  }
}
