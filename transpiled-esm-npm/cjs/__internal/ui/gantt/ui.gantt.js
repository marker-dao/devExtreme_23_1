"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_utils = _interopRequireDefault(require("../../../__internal/grids/grid_core/m_utils"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _data = require("../../../core/utils/data");
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _splitter_control = _interopRequireDefault(require("../../../ui/splitter_control"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _uiGantt = require("../../ui/gantt/ui.gantt.actions");
var _uiGantt2 = require("../../ui/gantt/ui.gantt.bars");
var _uiGantt3 = require("../../ui/gantt/ui.gantt.custom_fields");
var _uiGanttData = _interopRequireDefault(require("../../ui/gantt/ui.gantt.data.option"));
var _uiGantt4 = require("../../ui/gantt/ui.gantt.data_changes_processing_helper");
var _uiGantt5 = require("../../ui/gantt/ui.gantt.dialogs");
var _uiGantt6 = require("../../ui/gantt/ui.gantt.export_helper");
var _uiGantt7 = require("../../ui/gantt/ui.gantt.helper");
var _uiGantt8 = require("../../ui/gantt/ui.gantt.mapping_helper");
var _uiGantt9 = require("../../ui/gantt/ui.gantt.model_changes_listener");
var _uiGantt10 = require("../../ui/gantt/ui.gantt.size_helper");
var _uiGantt11 = require("../../ui/gantt/ui.gantt.templates");
var _uiGantt12 = require("../../ui/gantt/ui.gantt.treelist");
var _uiGantt13 = require("../../ui/gantt/ui.gantt.view");
var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const window = (0, _window.getWindow)();
const GANTT_CLASS = 'dx-gantt';
const GANTT_VIEW_CLASS = 'dx-gantt-view';
const GANTT_TREE_LIST_WRAPPER = 'dx-gantt-treelist-wrapper';
const GANTT_TOOLBAR_WRAPPER = 'dx-gantt-toolbar-wrapper';
const GANTT_MAIN_WRAPPER = 'dx-gantt-main-wrapper';
const GANTT_TASKS = 'tasks';
const GANTT_DEPENDENCIES = 'dependencies';
const GANTT_RESOURCES = 'resources';
const GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
const GANTT_NEW_TASK_CACHE_KEY = 'gantt_new_task_key';
class Gantt extends _widget.default {
  _init() {
    super._init();
    _m_utils.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    this._initGantt();
    this._isGanttRendered = false;
    this._initHelpers();
  }
  _initGantt() {
    this._refreshDataSources();
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(GANTT_CLASS);
    this._$toolbarWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
    this._$toolbar = (0, _renderer.default)('<div>').appendTo(this._$toolbarWrapper);
    this._$mainWrapper = (0, _renderer.default)('<div>').addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
    this._$treeListWrapper = (0, _renderer.default)('<div>').addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
    this._$treeList = (0, _renderer.default)('<div>').appendTo(this._$treeListWrapper);
    this._$splitter = (0, _renderer.default)('<div>').appendTo(this._$mainWrapper);
    this._$ganttView = (0, _renderer.default)('<div>').addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
    this._$dialog = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._$loadPanel = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._$contextMenu = (0, _renderer.default)('<div>').appendTo(this.$element());
  }
  _clean() {
    var _this$_ganttView, _this$_ganttView2;
    this._savedGanttViewState = (_this$_ganttView = this._ganttView) === null || _this$_ganttView === void 0 ? void 0 : _this$_ganttView.getVisualStateToRestore();
    (_this$_ganttView2 = this._ganttView) === null || _this$_ganttView2 === void 0 || _this$_ganttView2._ganttViewCore.cleanMarkup();
    delete this._ganttView;
    delete this._dialogInstance;
    delete this._loadPanel;
    delete this._exportHelper;
    super._clean();
  }
  _refresh() {
    this._isGanttRendered = false;
    this._contentReadyRaised = false;
    super._refresh();
  }
  _fireContentReadyAction() {
    if (!this._contentReadyRaised) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      super._fireContentReadyAction();
    }
    this._contentReadyRaised = true;
  }
  _dimensionChanged() {
    var _this$_ganttView3;
    (_this$_ganttView3 = this._ganttView) === null || _this$_ganttView3 === void 0 || _this$_ganttView3._onDimensionChanged();
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._refreshGantt();
    }
  }
  _refreshGantt() {
    this._refreshDataSources();
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => this._refresh());
  }
  _refreshDataSources() {
    this._refreshDataSource(GANTT_TASKS);
    this._refreshDataSource(GANTT_DEPENDENCIES);
    this._refreshDataSource(GANTT_RESOURCES);
    this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
  }
  _renderContent() {
    this._isMainElementVisible = this.$element().is(':visible');
    if (this._isMainElementVisible && !this._isGanttRendered) {
      this._isGanttRendered = true;
      this._renderBars();
      this._renderTreeList();
      this._renderSplitter();
    }
  }
  _renderTreeList() {
    this._ganttTreeList = new _uiGantt12.GanttTreeList(this);
    // @ts-expect-error ts-error
    this._treeList = this._ganttTreeList.getTreeList();
    this._ganttTreeList.onAfterTreeListCreate();
  }
  _renderSplitter() {
    this._splitter = this._createComponent(this._$splitter, _splitter_control.default, {
      container: this.$element(),
      leftElement: this._$treeListWrapper,
      rightElement: this._$ganttView,
      onApplyPanelSize: e => {
        var _this$_sizeHelper;
        (_this$_sizeHelper = this._sizeHelper) === null || _this$_sizeHelper === void 0 || _this$_sizeHelper.onApplyPanelSize(e);
      }
    });
    this._splitter.option('initialLeftPanelWidth', this.option('taskListWidth'));
  }
  _renderBars() {
    this._bars = [];
    this._toolbar = new _uiGantt2.GanttToolbar(this._$toolbar, this);
    this._updateToolbarContent();
    this._bars.push(this._toolbar);
    this._contextMenuBar = new _uiGantt2.GanttContextMenuBar(this._$contextMenu, this);
    this._updateContextMenu();
    this._bars.push(this._contextMenuBar);
  }
  _initHelpers() {
    this._mappingHelper = new _uiGantt8.GanttMappingHelper(this);
    this._customFieldsManager = new _uiGantt3.GanttCustomFieldsManager(this);
    this._actionsManager = new _uiGantt.GanttActionsManager(this);
    this._ganttTemplatesManager = new _uiGantt11.GanttTemplatesManager(this);
    this._sizeHelper = new _uiGantt10.GanttSizeHelper(this);
    this._dataProcessingHelper = new _uiGantt4.GanttDataChangesProcessingHelper();
  }
  _initGanttView() {
    var _this$_ganttTreeList, _this$_ganttTreeList2, _this$_ganttTreeList3, _this$_ganttTemplates, _this$_ganttTemplates2, _this$_ganttTemplates3, _this$_ganttTemplates4;
    if (this._ganttView) {
      return;
    }
    const {
      allowSelection,
      selectedRowKey,
      showResources,
      showDependencies,
      startDateRange,
      endDateRange,
      taskTitlePosition,
      firstDayOfWeek,
      showRowLines,
      scaleType,
      scaleTypeRange,
      editing,
      validation,
      stripLines,
      taskTooltipContentTemplate,
      taskProgressTooltipContentTemplate,
      taskTimeTooltipContentTemplate,
      taskContentTemplate
    } = this.option();
    this._ganttView = this._createComponent(this._$ganttView, _uiGantt13.GanttView, {
      width: '100%',
      height: (_this$_ganttTreeList = this._ganttTreeList) === null || _this$_ganttTreeList === void 0 ? void 0 : _this$_ganttTreeList.getOffsetHeight(),
      // @ts-expect-error ts-error
      rowHeight: (_this$_ganttTreeList2 = this._ganttTreeList) === null || _this$_ganttTreeList2 === void 0 ? void 0 : _this$_ganttTreeList2.getRowHeight(),
      headerHeight: (_this$_ganttTreeList3 = this._ganttTreeList) === null || _this$_ganttTreeList3 === void 0 ? void 0 : _this$_ganttTreeList3.getHeaderHeight(),
      tasks: this._tasks,
      dependencies: this._dependencies,
      resources: this._resources,
      resourceAssignments: this._resourceAssignments,
      allowSelection,
      selectedRowKey,
      showResources,
      showDependencies,
      startDateRange,
      endDateRange,
      taskTitlePosition,
      firstDayOfWeek,
      showRowLines,
      scaleType,
      scaleTypeRange,
      editing,
      validation,
      stripLines: stripLines === null || stripLines === void 0 ? void 0 : stripLines.map(item => _extends({}, item)),
      bars: this._bars,
      mainElement: this.$element(),
      onSelectionChanged: e => {
        var _this$_ganttTreeList4;
        (_this$_ganttTreeList4 = this._ganttTreeList) === null || _this$_ganttTreeList4 === void 0 || _this$_ganttTreeList4.selectRows(_uiGantt7.GanttHelper.getArrayFromOneElement(e.id));
      },
      onViewTypeChanged: e => {
        this._onViewTypeChanged(e.type);
      },
      onScroll: e => {
        var _this$_ganttTreeList5;
        (_this$_ganttTreeList5 = this._ganttTreeList) === null || _this$_ganttTreeList5 === void 0 || _this$_ganttTreeList5.scrollBy(e.scrollTop);
      },
      onDialogShowing: this._showDialog.bind(this),
      onPopupMenuShowing: this._showPopupMenu.bind(this),
      onPopupMenuHiding: this._hidePopupMenu.bind(this),
      onExpandAll: this._expandAll.bind(this),
      onCollapseAll: this._collapseAll.bind(this),
      modelChangesListener: _uiGantt9.ModelChangesListener.create(this),
      exportHelper: this._getExportHelper(),
      taskTooltipContentTemplate: (_this$_ganttTemplates = this._ganttTemplatesManager) === null || _this$_ganttTemplates === void 0 ? void 0 : _this$_ganttTemplates.getTaskTooltipContentTemplateFunc(taskTooltipContentTemplate),
      taskProgressTooltipContentTemplate: (_this$_ganttTemplates2 = this._ganttTemplatesManager) === null || _this$_ganttTemplates2 === void 0 ? void 0 : _this$_ganttTemplates2.getTaskProgressTooltipContentTemplateFunc(taskProgressTooltipContentTemplate),
      taskTimeTooltipContentTemplate: (_this$_ganttTemplates3 = this._ganttTemplatesManager) === null || _this$_ganttTemplates3 === void 0 ? void 0 : _this$_ganttTemplates3.getTaskTimeTooltipContentTemplateFunc(taskTimeTooltipContentTemplate),
      taskContentTemplate: (_this$_ganttTemplates4 = this._ganttTemplatesManager) === null || _this$_ganttTemplates4 === void 0 ? void 0 : _this$_ganttTemplates4.getTaskContentTemplateFunc(taskContentTemplate),
      onTaskClick: e => {
        var _this$_ganttTreeList6;
        (_this$_ganttTreeList6 = this._ganttTreeList) === null || _this$_ganttTreeList6 === void 0 || _this$_ganttTreeList6.onRowClick(e);
      },
      onTaskDblClick: e => {
        var _this$_ganttTreeList7;
        (_this$_ganttTreeList7 = this._ganttTreeList) === null || _this$_ganttTreeList7 === void 0 || _this$_ganttTreeList7.onRowDblClick(e);
      },
      onAdjustControl: () => {
        var _this$_sizeHelper2;
        (_this$_sizeHelper2 = this._sizeHelper) === null || _this$_sizeHelper2 === void 0 || _this$_sizeHelper2.onAdjustControl();
      },
      onContentReady: this._onGanttViewContentReady.bind(this),
      visualState: this._savedGanttViewState
    });
    delete this._savedGanttViewState;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onGanttViewContentReady(e) {
    if (!this._isParentAutoUpdateMode()) {
      this._fireContentReadyAction();
    }
  }
  _isParentAutoUpdateMode() {
    const {
      validation = {}
    } = this.option() ?? {};
    return validation === null || validation === void 0 ? void 0 : validation.autoUpdateParentTasks;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onTreeListContentReady(e) {
    var _this$_dataProcessing;
    if (this._isParentAutoUpdateMode() && this._treeListParentRecalculatedDataUpdating) {
      this._fireContentReadyAction();
    }
    delete this._treeListParentRecalculatedDataUpdating;
    (_this$_dataProcessing = this._dataProcessingHelper) === null || _this$_dataProcessing === void 0 || _this$_dataProcessing.onTreeListReady();
  }
  _onViewTypeChanged(type) {
    var _this$_actionsManager;
    this.option('scaleType', (_this$_actionsManager = this._actionsManager) === null || _this$_actionsManager === void 0 ? void 0 : _this$_actionsManager._getScaleType(type));
  }
  _refreshDataSource(name) {
    let dataOption = this[`_${name}Option`];
    if (dataOption) {
      dataOption.dispose();
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this[`_${name}Option`];
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this[`_${name}`];
    }
    dataOption = new _uiGanttData.default(name, this._getLoadPanel.bind(this), (resultName, resultData) => {
      this._dataSourceChanged(resultName, resultData);
    });
    dataOption.option('dataSource', this._getSpecificDataSourceOption(name));
    dataOption._refreshDataSource();
    this[`_${name}Option`] = dataOption;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getSpecificDataSourceOption(name) {
    const dataSource = this.option(`${name}.dataSource`);
    if (!dataSource || Array.isArray(dataSource)) {
      return {
        store: {
          type: 'array',
          data: dataSource ?? [],
          key: this.option(`${name}.keyExpr`)
        }
      };
    }
    return dataSource;
  }
  _dataSourceChanged(dataSourceName, data) {
    const getters = _uiGantt7.GanttHelper.compileGettersByOption(this.option(dataSourceName));
    const validatedData = this._validateSourceData(dataSourceName, data);
    const mappedData = validatedData.map(_uiGantt7.GanttHelper.prepareMapHandler(getters));
    this[`_${dataSourceName}`] = mappedData;
    this._setGanttViewOption(dataSourceName, mappedData);
    if (dataSourceName === GANTT_TASKS) {
      var _this$_ganttTreeList8, _this$_ganttTreeList9, _this$_ganttTreeList10;
      this._tasksRaw = validatedData;
      const forceUpdate = !((_this$_ganttTreeList8 = this._ganttTreeList) !== null && _this$_ganttTreeList8 !== void 0 && _this$_ganttTreeList8.getDataSource()) && !this._ganttView;
      (_this$_ganttTreeList9 = this._ganttTreeList) === null || _this$_ganttTreeList9 === void 0 || _this$_ganttTreeList9.saveExpandedKeys();
      (_this$_ganttTreeList10 = this._ganttTreeList) === null || _this$_ganttTreeList10 === void 0 || _this$_ganttTreeList10.updateDataSource(validatedData, forceUpdate);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _validateSourceData(dataSourceName, data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data && dataSourceName === GANTT_TASKS ? this._validateTaskData(data) : data;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _validateTaskData(data) {
    // @ts-expect-error ts-error
    const keyGetter = (0, _data.compileGetter)(this.option(`${GANTT_TASKS}.keyExpr`));
    const parentIdGetter = (0, _data.compileGetter)(
    // @ts-expect-error ts-error
    this.option(`${GANTT_TASKS}.parentIdExpr`));
    const rootValue = this.option('rootValue') ?? 'dx_dxt_gantt_default_root_value';
    const validationTree = {};
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      if (item) {
        // @ts-expect-error ts-error
        const key = keyGetter(item);
        const isRootTask = key === rootValue;
        // eslint-disable-next-line no-multi-assign
        const treeItem = validationTree[key] ?? (validationTree[key] = {
          key,
          children: []
        });
        if (!isRootTask) {
          // @ts-expect-error ts-error
          const parentId = parentIdGetter(item) ?? rootValue;
          // eslint-disable-next-line no-multi-assign
          const parentTreeItem = validationTree[parentId] ?? (validationTree[parentId] = {
            key: parentId,
            children: []
          });
          parentTreeItem.children.push(treeItem);
          treeItem.parent = parentTreeItem;
        }
      }
    }
    const validKeys = [rootValue];
    // @ts-expect-error ts-error
    this._appendChildKeys(validationTree[rootValue], validKeys);
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.filter(item => validKeys.includes(keyGetter(item)));
  }
  _appendChildKeys(treeItem, keys) {
    const children = treeItem === null || treeItem === void 0 ? void 0 : treeItem.children;
    for (let i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i += 1) {
      const child = children[i];
      keys.push(child.key);
      this._appendChildKeys(child, keys);
    }
  }
  _onRecordInserted(optionName, record, callback) {
    const dataOption = this[`_${optionName}Option`];
    if (dataOption) {
      const data = _uiGantt7.GanttHelper.getStoreObject(this.option(optionName), record);
      const isTaskInsert = optionName === GANTT_TASKS;
      if (isTaskInsert) {
        var _this$_customFieldsMa;
        (_this$_customFieldsMa = this._customFieldsManager) === null || _this$_customFieldsMa === void 0 || _this$_customFieldsMa.addCustomFieldsDataFromCache(GANTT_NEW_TASK_CACHE_KEY, data);
      }
      dataOption.insert(data, response => {
        var _this$_dataProcessing2, _this$_ganttTreeList11;
        // @ts-expect-error ts-error
        const keyGetter = (0, _data.compileGetter)(this.option(`${optionName}.keyExpr`));
        // @ts-expect-error ts-error
        const insertedId = keyGetter(response);
        callback(insertedId);
        this._executeFuncSetters(optionName, record, insertedId);
        (_this$_dataProcessing2 = this._dataProcessingHelper) === null || _this$_dataProcessing2 === void 0 || _this$_dataProcessing2.addCompletionAction(() => {
          var _this$_actionsManager2;
          (_this$_actionsManager2 = this._actionsManager) === null || _this$_actionsManager2 === void 0 || _this$_actionsManager2.raiseInsertedAction(optionName, data, insertedId);
        }, true, isTaskInsert);
        (_this$_ganttTreeList11 = this._ganttTreeList) === null || _this$_ganttTreeList11 === void 0 || _this$_ganttTreeList11.saveExpandedKeys();
        dataOption._reloadDataSource().done(() => {
          if (isTaskInsert) {
            var _this$_ganttTreeList12;
            (_this$_ganttTreeList12 = this._ganttTreeList) === null || _this$_ganttTreeList12 === void 0 || _this$_ganttTreeList12.onTaskInserted(insertedId, record.parentId);
          }
        });
      });
    }
  }
  _onRecordUpdated(optionName, key, values) {
    const dataOption = this[`_${optionName}Option`];
    const isTaskUpdated = optionName === GANTT_TASKS;
    if (dataOption) {
      var _this$_mappingHelper, _this$_customFieldsMa2;
      const data = (_this$_mappingHelper = this._mappingHelper) === null || _this$_mappingHelper === void 0 ? void 0 : _this$_mappingHelper.convertCoreToMappedData(optionName, values);
      const hasCustomFieldsData = isTaskUpdated && ((_this$_customFieldsMa2 = this._customFieldsManager) === null || _this$_customFieldsMa2 === void 0 ? void 0 : _this$_customFieldsMa2.cache.hasData(key));
      if (hasCustomFieldsData) {
        var _this$_customFieldsMa3;
        (_this$_customFieldsMa3 = this._customFieldsManager) === null || _this$_customFieldsMa3 === void 0 || _this$_customFieldsMa3.addCustomFieldsDataFromCache(key, data);
      }
      dataOption.update(key, data, () => {
        var _this$_ganttTreeList13, _this$_dataProcessing3;
        this._executeFuncSetters(optionName, values, key);
        (_this$_ganttTreeList13 = this._ganttTreeList) === null || _this$_ganttTreeList13 === void 0 || _this$_ganttTreeList13.saveExpandedKeys();
        (_this$_dataProcessing3 = this._dataProcessingHelper) === null || _this$_dataProcessing3 === void 0 || _this$_dataProcessing3.addCompletionAction(() => {
          var _this$_actionsManager3;
          (_this$_actionsManager3 = this._actionsManager) === null || _this$_actionsManager3 === void 0 || _this$_actionsManager3.raiseUpdatedAction(optionName, data, key);
        }, true, isTaskUpdated);
        dataOption._reloadDataSource();
      });
    }
  }
  _onRecordRemoved(optionName, key, data) {
    const dataOption = this[`_${optionName}Option`];
    if (dataOption) {
      dataOption.remove(key, () => {
        var _this$_ganttTreeList14, _this$_dataProcessing4;
        (_this$_ganttTreeList14 = this._ganttTreeList) === null || _this$_ganttTreeList14 === void 0 || _this$_ganttTreeList14.saveExpandedKeys();
        (_this$_dataProcessing4 = this._dataProcessingHelper) === null || _this$_dataProcessing4 === void 0 || _this$_dataProcessing4.addCompletionAction(() => {
          var _this$_actionsManager4, _this$_mappingHelper2;
          (_this$_actionsManager4 = this._actionsManager) === null || _this$_actionsManager4 === void 0 || _this$_actionsManager4.raiseDeletedAction(optionName, key, (_this$_mappingHelper2 = this._mappingHelper) === null || _this$_mappingHelper2 === void 0 ? void 0 : _this$_mappingHelper2.convertCoreToMappedData(optionName, data));
        }, true, optionName === GANTT_TASKS);
        dataOption._reloadDataSource();
      });
    }
  }
  _onParentTaskUpdated(data) {
    var _this$_actionsManager5;
    const mappedData = this.getTaskDataByCoreData(data);
    (_this$_actionsManager5 = this._actionsManager) === null || _this$_actionsManager5 === void 0 || _this$_actionsManager5.raiseUpdatedAction(GANTT_TASKS, mappedData, data.id);
  }
  _onParentTasksRecalculated(data) {
    if (!this.isSieving) {
      var _this$_customFieldsMa4;
      const setters = _uiGantt7.GanttHelper.compileSettersByOption(this.option(GANTT_TASKS));
      const treeDataSource = (_this$_customFieldsMa4 = this._customFieldsManager) === null || _this$_customFieldsMa4 === void 0 ? void 0 : _this$_customFieldsMa4.appendCustomFields(data.map(_uiGantt7.GanttHelper.prepareSetterMapHandler(setters)));
      // split threads for treelist filter|sort and datasource update (T1082108)
      // eslint-disable-next-line no-restricted-globals
      setTimeout(() => {
        var _this$_ganttTreeList15;
        this._treeListParentRecalculatedDataUpdating = true;
        (_this$_ganttTreeList15 = this._ganttTreeList) === null || _this$_ganttTreeList15 === void 0 || _this$_ganttTreeList15.setDataSource(treeDataSource);
      });
    }
    this.isSieving = false;
  }
  _onGanttViewCoreUpdated() {
    var _this$_dataProcessing5;
    (_this$_dataProcessing5 = this._dataProcessingHelper) === null || _this$_dataProcessing5 === void 0 || _this$_dataProcessing5.onGanttViewReady();
  }
  _executeFuncSetters(optionName, coreData, key) {
    const funcSetters = _uiGantt7.GanttHelper.compileFuncSettersByOption(this.option(optionName));
    const keysToUpdate = Object.keys(funcSetters).filter(k => (0, _type.isDefined)(coreData[k]));
    if (keysToUpdate.length > 0) {
      const dataObject = this._getDataSourceItem(optionName, key);
      keysToUpdate.forEach(k => {
        const setter = funcSetters[k];
        setter(dataObject, coreData[k]);
      });
    }
  }
  _sortAndFilter() {
    var _this$_savedSortFilte, _this$_savedSortFilte2, _this$_savedSortFilte3;
    const treeList = this._treeList;
    // @ts-expect-error ts-error
    const columns = treeList === null || treeList === void 0 ? void 0 : treeList.getColumns();
    const sortedColumns = columns.filter(c => c.sortIndex > -1);
    const sortedState = sortedColumns.map(c => ({
      sortIndex: c.sortIndex,
      sortOrder: c.sortOrder
    }));
    const sortedStateChanged = !this._compareSortedState((_this$_savedSortFilte = this._savedSortFilterState) === null || _this$_savedSortFilte === void 0 ? void 0 : _this$_savedSortFilte.sort, sortedState);
    const filterValue = treeList === null || treeList === void 0 ? void 0 : treeList.option('filterValue');
    const filterChanged = (treeList === null || treeList === void 0 ? void 0 : treeList.option('expandNodesOnFiltering')) && filterValue !== ((_this$_savedSortFilte2 = this._savedSortFilterState) === null || _this$_savedSortFilte2 === void 0 ? void 0 : _this$_savedSortFilte2.filter);
    const sieveColumn = sortedColumns[0] || columns.filter(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    c => {
      var _c$filterValues;
      return (0, _type.isDefined)(c.filterValue) || ((_c$filterValues = c.filterValues) === null || _c$filterValues === void 0 ? void 0 : _c$filterValues.length);
    })[0];
    const isClearSieving = ((_this$_savedSortFilte3 = this._savedSortFilterState) === null || _this$_savedSortFilte3 === void 0 ? void 0 : _this$_savedSortFilte3.sieveColumn) && !sieveColumn;
    if (sieveColumn || isClearSieving) {
      var _this$_ganttTreeList16;
      const sieveOptions = sieveColumn && {
        sievedItems: (_this$_ganttTreeList16 = this._ganttTreeList) === null || _this$_ganttTreeList16 === void 0 ? void 0 : _this$_ganttTreeList16.getSievedItems(),
        sieveColumn,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        expandTasks: filterChanged || filterValue && sortedStateChanged
      };
      this.isSieving = !isClearSieving;
      this._setGanttViewOption('sieve', sieveOptions);
    }
    this._savedSortFilterState = {
      sort: sortedState,
      filter: filterValue,
      sieveColumn
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _compareSortedState(state1, state2) {
    if (!state1 || !state2 || state1.length !== state2.length) {
      return false;
    }
    return state1.every((c, i) => c.sortIndex === state2[i].sortIndex && c.sortOrder === state2[i].sortOrder);
  }
  _getToolbarItems() {
    const {
      toolbar
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return (toolbar === null || toolbar === void 0 ? void 0 : toolbar.items) || [];
  }
  _updateToolbarContent() {
    var _this$_toolbar;
    const items = this._getToolbarItems();
    if (items !== null && items !== void 0 && items.length) {
      this._$toolbarWrapper.show();
    } else {
      this._$toolbarWrapper.hide();
    }
    (_this$_toolbar = this._toolbar) === null || _this$_toolbar === void 0 || _this$_toolbar.createItems(items);
    this._updateBarItemsState();
  }
  _updateContextMenu() {
    const {
      contextMenu
    } = this.option();
    if (contextMenu !== null && contextMenu !== void 0 && contextMenu.enabled && this._contextMenuBar) {
      this._contextMenuBar.createItems(contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.items);
      this._updateBarItemsState();
    }
  }
  _updateBarItemsState() {
    var _this$_ganttView4;
    (_this$_ganttView4 = this._ganttView) === null || _this$_ganttView4 === void 0 || _this$_ganttView4.updateBarItemsState();
  }
  _showDialog(e) {
    if (!this._dialogInstance) {
      this._dialogInstance = new _uiGantt5.GanttDialog(this, this._$dialog);
    }
    this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option('editing'));
  }
  _showPopupMenu(info) {
    if (this.option('contextMenu.enabled')) {
      var _this$_ganttView5, _this$_contextMenuBar, _this$_actionsManager6;
      (_this$_ganttView5 = this._ganttView) === null || _this$_ganttView5 === void 0 || _this$_ganttView5.getBarManager().updateContextMenu();
      const args = {
        cancel: false,
        event: info.event,
        targetType: info.type,
        targetKey: info.key,
        items: (0, _extend.extend)(true, [], (_this$_contextMenuBar = this._contextMenuBar) === null || _this$_contextMenuBar === void 0 ? void 0 : _this$_contextMenuBar._items),
        data: info.type === 'task' ? this.getTaskData(info.key) : this.getDependencyData(info.key)
      };
      (_this$_actionsManager6 = this._actionsManager) === null || _this$_actionsManager6 === void 0 || _this$_actionsManager6.raiseContextMenuPreparing(args);
      if (!args.cancel) {
        var _this$_contextMenuBar2;
        (_this$_contextMenuBar2 = this._contextMenuBar) === null || _this$_contextMenuBar2 === void 0 || _this$_contextMenuBar2.show(info.position, args.items);
      }
    }
  }
  _hidePopupMenu() {
    var _this$_contextMenuBar3;
    (_this$_contextMenuBar3 = this._contextMenuBar) === null || _this$_contextMenuBar3 === void 0 || _this$_contextMenuBar3.hide();
  }
  _getLoadPanel() {
    if (!this._loadPanel) {
      this._loadPanel = this._createComponent(this._$loadPanel, _load_panel.default, {
        position: {
          // @ts-expect-error ts-error
          of: this.$element()
        }
      });
    }
    return this._loadPanel;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskKeyGetter() {
    return this._getDataSourceItemKeyGetter(GANTT_TASKS);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _findTaskByKey(key) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getDataSourceItem(GANTT_TASKS, key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDataSourceItem(dataOptionName, key) {
    const dataOption = this[`_${dataOptionName}Option`];
    const keyGetter = this._getDataSourceItemKeyGetter(dataOptionName);
    const items = dataOption === null || dataOption === void 0 ? void 0 : dataOption._getItems();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items.find(t => keyGetter(t) === key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDataSourceItemKeyGetter(dataOptionName) {
    // @ts-expect-error ts-error
    return (0, _data.compileGetter)(this.option(`${dataOptionName}.keyExpr`));
  }
  _setGanttViewOption(optionName, value) {
    var _this$_ganttView6;
    (_this$_ganttView6 = this._ganttView) === null || _this$_ganttView6 === void 0 || _this$_ganttView6.option(optionName, value);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-unused-vars
  _getGanttViewOption(optionName, value) {
    var _this$_ganttView7;
    return (_this$_ganttView7 = this._ganttView) === null || _this$_ganttView7 === void 0 ? void 0 : _this$_ganttView7.option(optionName);
  }
  _getExportHelper() {
    this._exportHelper ?? (this._exportHelper = new _uiGantt6.GanttExportHelper(this));
    return this._exportHelper;
  }
  _executeCoreCommand(id) {
    var _this$_ganttView8;
    (_this$_ganttView8 = this._ganttView) === null || _this$_ganttView8 === void 0 || _this$_ganttView8.executeCoreCommand(id);
  }
  _expandAll() {
    // @ts-expect-error ts-error
    this._changeExpandAll(true);
  }
  _collapseAll() {
    // @ts-expect-error ts-error
    this._changeExpandAll(false);
  }
  _onTreeListRowExpandChanged(e, expanded) {
    if (!this._lockRowExpandEvent) {
      var _this$_ganttView9, _this$_sizeHelper3;
      (_this$_ganttView9 = this._ganttView) === null || _this$_ganttView9 === void 0 || _this$_ganttView9.changeTaskExpanded(e.key, expanded);
      (_this$_sizeHelper3 = this._sizeHelper) === null || _this$_sizeHelper3 === void 0 || _this$_sizeHelper3.adjustHeight();
    }
  }
  _changeExpandAll(expanded, level, rowKey) {
    var _this$_treeList, _promise;
    const allExpandableNodes = [];
    const nodesToExpand = [];
    // @ts-expect-error ts-error
    (_this$_treeList = this._treeList) === null || _this$_treeList === void 0 || _this$_treeList.forEachNode(node => {
      var _node$children;
      if ((_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length) {
        // @ts-expect-error ts-error
        allExpandableNodes.push(node);
      }
    });
    if (rowKey) {
      var _this$_treeList2;
      // @ts-expect-error ts-error
      const node = (_this$_treeList2 = this._treeList) === null || _this$_treeList2 === void 0 ? void 0 : _this$_treeList2.getNodeByKey(rowKey);
      _uiGantt7.GanttHelper.getAllParentNodesKeys(node, nodesToExpand);
    }
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let promise;
    this._lockRowExpandEvent = allExpandableNodes.length > 0;
    const state = allExpandableNodes.reduce((previous, node, index) => {
      var _this$_treeList3, _this$_treeList4;
      if (rowKey) {
        // @ts-expect-error ts-error
        // eslint-disable-next-line no-param-reassign
        expanded = nodesToExpand.includes(node.key);
      } else if (level) {
        // @ts-expect-error ts-error
        // eslint-disable-next-line no-param-reassign
        expanded = node.level < level;
      }
      // @ts-expect-error ts-error
      previous[node.key] = expanded;
      const action = expanded
      // @ts-expect-error ts-error
      ? (_this$_treeList3 = this._treeList) === null || _this$_treeList3 === void 0 ? void 0 : _this$_treeList3.expandRow // @ts-expect-error ts-error
      : (_this$_treeList4 = this._treeList) === null || _this$_treeList4 === void 0 ? void 0 : _this$_treeList4.collapseRow;
      const isLast = index === allExpandableNodes.length - 1;
      if (isLast) {
        // @ts-expect-error ts-error
        promise = action(node.key);
      } else {
        // @ts-expect-error ts-error
        action(node.key);
      }
      return previous;
    }, {});
    (_promise = promise) === null || _promise === void 0 || _promise.then(() => {
      var _this$_ganttView10, _this$_sizeHelper4;
      (_this$_ganttView10 = this._ganttView) === null || _this$_ganttView10 === void 0 || _this$_ganttView10.applyTasksExpandedState(state);
      (_this$_sizeHelper4 = this._sizeHelper) === null || _this$_sizeHelper4 === void 0 || _this$_sizeHelper4.adjustHeight();
      delete this._lockRowExpandEvent;
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTaskResources(key) {
    var _this$_ganttView11;
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    const coreData = (_this$_ganttView11 = this._ganttView) === null || _this$_ganttView11 === void 0 ? void 0 : _this$_ganttView11._ganttViewCore.getTaskResources(key);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return coreData.map(r => {
      var _this$_mappingHelper3;
      return (_this$_mappingHelper3 = this._mappingHelper) === null || _this$_mappingHelper3 === void 0 ? void 0 : _this$_mappingHelper3.convertCoreToMappedData(GANTT_RESOURCES, r);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getVisibleTaskKeys() {
    var _this$_ganttView12;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_ganttView12 = this._ganttView) === null || _this$_ganttView12 === void 0 ? void 0 : _this$_ganttView12._ganttViewCore.getVisibleTaskKeys();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getVisibleDependencyKeys() {
    var _this$_ganttView13;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_ganttView13 = this._ganttView) === null || _this$_ganttView13 === void 0 ? void 0 : _this$_ganttView13._ganttViewCore.getVisibleDependencyKeys();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getVisibleResourceKeys() {
    var _this$_ganttView14;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_ganttView14 = this._ganttView) === null || _this$_ganttView14 === void 0 ? void 0 : _this$_ganttView14._ganttViewCore.getVisibleResourceKeys();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getVisibleResourceAssignmentKeys() {
    var _this$_ganttView15;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_ganttView15 = this._ganttView) === null || _this$_ganttView15 === void 0 ? void 0 : _this$_ganttView15._ganttViewCore.getVisibleResourceAssignmentKeys();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTaskData(key) {
    var _this$_ganttView16;
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    const coreData = (_this$_ganttView16 = this._ganttView) === null || _this$_ganttView16 === void 0 ? void 0 : _this$_ganttView16._ganttViewCore.getTaskData(key);
    const mappedData = this.getTaskDataByCoreData(coreData);
    return mappedData;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTaskDataByCoreData(coreData) {
    var _this$_mappingHelper4, _this$_customFieldsMa5;
    const mappedData = coreData ? (_this$_mappingHelper4 = this._mappingHelper) === null || _this$_mappingHelper4 === void 0 ? void 0 : _this$_mappingHelper4.convertCoreToMappedData(GANTT_TASKS, coreData) : null;
    (_this$_customFieldsMa5 = this._customFieldsManager) === null || _this$_customFieldsMa5 === void 0 || _this$_customFieldsMa5.addCustomFieldsData(coreData === null || coreData === void 0 ? void 0 : coreData.id, mappedData);
    return mappedData;
  }
  insertTask(data) {
    var _this$_customFieldsMa6, _this$_ganttView17, _this$_mappingHelper5;
    (_this$_customFieldsMa6 = this._customFieldsManager) === null || _this$_customFieldsMa6 === void 0 || _this$_customFieldsMa6.saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, data);
    (_this$_ganttView17 = this._ganttView) === null || _this$_ganttView17 === void 0 || _this$_ganttView17._ganttViewCore.insertTask((_this$_mappingHelper5 = this._mappingHelper) === null || _this$_mappingHelper5 === void 0 ? void 0 : _this$_mappingHelper5.convertMappedToCoreData(GANTT_TASKS, data));
  }
  deleteTask(key) {
    var _this$_ganttView18;
    (_this$_ganttView18 = this._ganttView) === null || _this$_ganttView18 === void 0 || _this$_ganttView18._ganttViewCore.deleteTask(key);
  }
  updateTask(key, data) {
    var _this$_mappingHelper6, _this$_customFieldsMa7;
    const coreTaskData = (_this$_mappingHelper6 = this._mappingHelper) === null || _this$_mappingHelper6 === void 0 ? void 0 : _this$_mappingHelper6.convertMappedToCoreData(GANTT_TASKS, data);
    // @ts-expect-error ts-error
    const isCustomFieldsUpdateOnly = !Object.keys(coreTaskData).length;
    (_this$_customFieldsMa7 = this._customFieldsManager) === null || _this$_customFieldsMa7 === void 0 || _this$_customFieldsMa7.saveCustomFieldsDataToCache(key, data, true, isCustomFieldsUpdateOnly);
    if (isCustomFieldsUpdateOnly) {
      var _this$_customFieldsMa8;
      const customFieldsData = (_this$_customFieldsMa8 = this._customFieldsManager) === null || _this$_customFieldsMa8 === void 0 ? void 0 : _this$_customFieldsMa8._getCustomFieldsData(data);
      if (Object.keys(customFieldsData).length > 0) {
        var _this$_actionsManager7;
        (_this$_actionsManager7 = this._actionsManager) === null || _this$_actionsManager7 === void 0 || _this$_actionsManager7.raiseUpdatingAction(GANTT_TASKS, {
          cancel: false,
          key,
          newValues: {}
        });
      }
    } else {
      var _this$_ganttView19;
      (_this$_ganttView19 = this._ganttView) === null || _this$_ganttView19 === void 0 || _this$_ganttView19._ganttViewCore.updateTask(key, coreTaskData);
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDependencyData(key) {
    var _this$_ganttView20, _this$_mappingHelper7;
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    const coreData = (_this$_ganttView20 = this._ganttView) === null || _this$_ganttView20 === void 0 ? void 0 : _this$_ganttView20._ganttViewCore.getDependencyData(key);
    return coreData ? (_this$_mappingHelper7 = this._mappingHelper) === null || _this$_mappingHelper7 === void 0 ? void 0 : _this$_mappingHelper7.convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null;
  }
  insertDependency(data) {
    var _this$_ganttView21, _this$_mappingHelper8;
    (_this$_ganttView21 = this._ganttView) === null || _this$_ganttView21 === void 0 || _this$_ganttView21._ganttViewCore.insertDependency((_this$_mappingHelper8 = this._mappingHelper) === null || _this$_mappingHelper8 === void 0 ? void 0 : _this$_mappingHelper8.convertMappedToCoreData(GANTT_DEPENDENCIES, data));
  }
  deleteDependency(key) {
    var _this$_ganttView22;
    (_this$_ganttView22 = this._ganttView) === null || _this$_ganttView22 === void 0 || _this$_ganttView22._ganttViewCore.deleteDependency(key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getResourceData(key) {
    var _this$_ganttView23, _this$_mappingHelper9;
    const coreData = (_this$_ganttView23 = this._ganttView) === null || _this$_ganttView23 === void 0 ? void 0 : _this$_ganttView23._ganttViewCore.getResourceData(key);
    return coreData ? (_this$_mappingHelper9 = this._mappingHelper) === null || _this$_mappingHelper9 === void 0 ? void 0 : _this$_mappingHelper9.convertCoreToMappedData(GANTT_RESOURCES, coreData) : null;
  }
  deleteResource(key) {
    var _this$_ganttView24;
    (_this$_ganttView24 = this._ganttView) === null || _this$_ganttView24 === void 0 || _this$_ganttView24._ganttViewCore.deleteResource(key);
  }
  insertResource(data, taskKeys) {
    var _this$_ganttView25, _this$_mappingHelper10;
    (_this$_ganttView25 = this._ganttView) === null || _this$_ganttView25 === void 0 || _this$_ganttView25._ganttViewCore.insertResource((_this$_mappingHelper10 = this._mappingHelper) === null || _this$_mappingHelper10 === void 0 ? void 0 : _this$_mappingHelper10.convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getResourceAssignmentData(key) {
    var _this$_ganttView26, _this$_mappingHelper11;
    const coreData = (_this$_ganttView26 = this._ganttView) === null || _this$_ganttView26 === void 0 ? void 0 : _this$_ganttView26._ganttViewCore.getResourceAssignmentData(key);
    return coreData ? (_this$_mappingHelper11 = this._mappingHelper) === null || _this$_mappingHelper11 === void 0 ? void 0 : _this$_mappingHelper11.convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null;
  }
  assignResourceToTask(resourceKey, taskKey) {
    var _this$_ganttView27;
    (_this$_ganttView27 = this._ganttView) === null || _this$_ganttView27 === void 0 || _this$_ganttView27._ganttViewCore.assignResourceToTask(resourceKey, taskKey);
  }
  unassignResourceFromTask(resourceKey, taskKey) {
    var _this$_ganttView28;
    (_this$_ganttView28 = this._ganttView) === null || _this$_ganttView28 === void 0 || _this$_ganttView28._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey);
  }
  unassignAllResourcesFromTask(taskKey) {
    var _this$_ganttView29;
    (_this$_ganttView29 = this._ganttView) === null || _this$_ganttView29 === void 0 || _this$_ganttView29._ganttViewCore.unassignAllResourcesFromTask(taskKey);
  }
  updateDimensions() {
    var _this$_sizeHelper5;
    (_this$_sizeHelper5 = this._sizeHelper) === null || _this$_sizeHelper5 === void 0 || _this$_sizeHelper5.onAdjustControl();
  }
  scrollToDate(date) {
    var _this$_ganttView30;
    (_this$_ganttView30 = this._ganttView) === null || _this$_ganttView30 === void 0 || _this$_ganttView30._ganttViewCore.scrollToDate(date);
  }
  showResourceManagerDialog() {
    var _this$_ganttView31;
    (_this$_ganttView31 = this._ganttView) === null || _this$_ganttView31 === void 0 || _this$_ganttView31._ganttViewCore.showResourcesDialog();
  }
  showTaskDetailsDialog(taskKey) {
    var _this$_ganttView32;
    (_this$_ganttView32 = this._ganttView) === null || _this$_ganttView32 === void 0 || _this$_ganttView32._ganttViewCore.showTaskDetailsDialog(taskKey);
  }
  exportToPdf(options) {
    return this._exportToPdf(options);
  }
  _exportToPdf(options) {
    var _this$_exportHelper, _window$jspdf;
    (_this$_exportHelper = this._exportHelper) === null || _this$_exportHelper === void 0 || _this$_exportHelper.reset();
    const fullOptions = (0, _extend.extend)({}, options);
    if (fullOptions.createDocumentMethod) {
      fullOptions.docCreateMethod = fullOptions.createDocumentMethod;
    }
    fullOptions.pdfDocument ?? (fullOptions.pdfDocument = fullOptions.jsPDFDocument);
    fullOptions.docCreateMethod ?? (fullOptions.docCreateMethod = ((_window$jspdf = window.jspdf) === null || _window$jspdf === void 0 ? void 0 : _window$jspdf.jsPDF) ?? window.jsPDF);
    fullOptions.format ?? (fullOptions.format = 'a4');
    return new Promise(resolve => {
      var _this$_ganttView33;
      const doc = (_this$_ganttView33 = this._ganttView) === null || _this$_ganttView33 === void 0 ? void 0 : _this$_ganttView33._ganttViewCore.exportToPdf(fullOptions);
      resolve(doc);
    });
  }
  refresh() {
    return new Promise((resolve, reject) => {
      try {
        this._refreshGantt();
        // @ts-expect-error ts-error
        resolve();
      } catch (e) {
        // @ts-expect-error ts-error
        reject(e.message);
      }
    });
  }
  expandAll() {
    this._expandAll();
  }
  collapseAll() {
    this._collapseAll();
  }
  expandAllToLevel(level) {
    // @ts-expect-error ts-error
    this._changeExpandAll(false, level);
  }
  expandToTask(key) {
    var _this$_treeList5, _node$parent;
    // @ts-expect-error ts-error
    const node = (_this$_treeList5 = this._treeList) === null || _this$_treeList5 === void 0 ? void 0 : _this$_treeList5.getNodeByKey(key);
    this._changeExpandAll(false, 0, node === null || node === void 0 || (_node$parent = node.parent) === null || _node$parent === void 0 ? void 0 : _node$parent.key);
  }
  collapseTask(key) {
    var _this$_treeList6;
    // @ts-expect-error ts-error
    (_this$_treeList6 = this._treeList) === null || _this$_treeList6 === void 0 || _this$_treeList6.collapseRow(key);
  }
  expandTask(key) {
    var _this$_treeList7;
    // @ts-expect-error ts-error
    (_this$_treeList7 = this._treeList) === null || _this$_treeList7 === void 0 || _this$_treeList7.expandRow(key);
  }
  showResources(value) {
    this.option('showResources', value);
  }
  showDependencies(value) {
    this.option('showDependencies', value);
  }
  zoomIn() {
    var _this$_ganttView34;
    (_this$_ganttView34 = this._ganttView) === null || _this$_ganttView34 === void 0 || _this$_ganttView34._ganttViewCore.zoomIn();
  }
  zoomOut() {
    var _this$_ganttView35;
    (_this$_ganttView35 = this._ganttView) === null || _this$_ganttView35 === void 0 || _this$_ganttView35._ganttViewCore.zoomOut();
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getDefaultOptions(), _uiGantt7.GanttHelper.getDefaultOptions());
  }
  _optionChanged(args) {
    var _this$_ganttTreeList17, _this$_sizeHelper6, _this$_ganttTreeList18, _this$_actionsManager8, _this$_actionsManager9, _this$_actionsManager10, _this$_actionsManager11, _this$_actionsManager12, _this$_actionsManager13, _this$_actionsManager14, _this$_actionsManager15, _this$_actionsManager16, _this$_actionsManager17, _this$_actionsManager18, _this$_actionsManager19, _this$_actionsManager20, _this$_actionsManager21, _this$_actionsManager22, _this$_actionsManager23, _this$_actionsManager24, _this$_actionsManager25, _this$_actionsManager26, _this$_actionsManager27, _this$_actionsManager28, _this$_actionsManager29, _this$_actionsManager30, _this$_actionsManager31, _this$_actionsManager32, _this$_actionsManager33, _this$_actionsManager34, _this$_ganttTreeList19, _this$_ganttTreeList20, _this$_ganttTemplates5, _this$_ganttTemplates6, _this$_ganttTemplates7, _this$_ganttTemplates8, _this$_ganttTreeList21, _this$_sizeHelper7, _this$_sizeHelper8, _this$_ganttTreeList22, _this$_ganttTreeList23, _this$_ganttTreeList24;
    const {
      name,
      fullName,
      value
    } = args;
    switch (name) {
      case 'tasks':
        this._refreshDataSource(GANTT_TASKS);
        break;
      case 'dependencies':
        this._refreshDataSource(GANTT_DEPENDENCIES);
        break;
      case 'resources':
        this._refreshDataSource(GANTT_RESOURCES);
        break;
      case 'resourceAssignments':
        this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
        break;
      case 'columns':
        (_this$_ganttTreeList17 = this._ganttTreeList) === null || _this$_ganttTreeList17 === void 0 || _this$_ganttTreeList17.setOption('columns', this._ganttTreeList.getColumns());
        break;
      case 'taskListWidth':
        (_this$_sizeHelper6 = this._sizeHelper) === null || _this$_sizeHelper6 === void 0 || _this$_sizeHelper6.setInnerElementsWidth();
        break;
      case 'showResources':
        this._setGanttViewOption('showResources', value);
        break;
      case 'showDependencies':
        this._setGanttViewOption('showDependencies', value);
        break;
      case 'taskTitlePosition':
        this._setGanttViewOption('taskTitlePosition', value);
        break;
      case 'firstDayOfWeek':
        this._setGanttViewOption('firstDayOfWeek', value);
        break;
      case 'startDateRange':
        this._setGanttViewOption('startDateRange', value);
        break;
      case 'endDateRange':
        this._setGanttViewOption('endDateRange', value);
        break;
      case 'selectedRowKey':
        (_this$_ganttTreeList18 = this._ganttTreeList) === null || _this$_ganttTreeList18 === void 0 || _this$_ganttTreeList18.selectRows(_uiGantt7.GanttHelper.getArrayFromOneElement(value));
        break;
      case 'onSelectionChanged':
        (_this$_actionsManager8 = this._actionsManager) === null || _this$_actionsManager8 === void 0 || _this$_actionsManager8.createSelectionChangedAction();
        break;
      case 'onTaskClick':
        (_this$_actionsManager9 = this._actionsManager) === null || _this$_actionsManager9 === void 0 || _this$_actionsManager9.createTaskClickAction();
        break;
      case 'onTaskDblClick':
        (_this$_actionsManager10 = this._actionsManager) === null || _this$_actionsManager10 === void 0 || _this$_actionsManager10.createTaskDblClickAction();
        break;
      case 'onTaskInserting':
        (_this$_actionsManager11 = this._actionsManager) === null || _this$_actionsManager11 === void 0 || _this$_actionsManager11.createTaskInsertingAction();
        break;
      case 'onTaskInserted':
        (_this$_actionsManager12 = this._actionsManager) === null || _this$_actionsManager12 === void 0 || _this$_actionsManager12.createTaskInsertedAction();
        break;
      case 'onTaskDeleting':
        (_this$_actionsManager13 = this._actionsManager) === null || _this$_actionsManager13 === void 0 || _this$_actionsManager13.createTaskDeletingAction();
        break;
      case 'onTaskDeleted':
        (_this$_actionsManager14 = this._actionsManager) === null || _this$_actionsManager14 === void 0 || _this$_actionsManager14.createTaskDeletedAction();
        break;
      case 'onTaskUpdating':
        (_this$_actionsManager15 = this._actionsManager) === null || _this$_actionsManager15 === void 0 || _this$_actionsManager15.createTaskUpdatingAction();
        break;
      case 'onTaskUpdated':
        (_this$_actionsManager16 = this._actionsManager) === null || _this$_actionsManager16 === void 0 || _this$_actionsManager16.createTaskUpdatedAction();
        break;
      case 'onTaskMoving':
        (_this$_actionsManager17 = this._actionsManager) === null || _this$_actionsManager17 === void 0 || _this$_actionsManager17.createTaskMovingAction();
        break;
      case 'onTaskEditDialogShowing':
        (_this$_actionsManager18 = this._actionsManager) === null || _this$_actionsManager18 === void 0 || _this$_actionsManager18.createTaskEditDialogShowingAction();
        break;
      case 'onResourceManagerDialogShowing':
        (_this$_actionsManager19 = this._actionsManager) === null || _this$_actionsManager19 === void 0 || _this$_actionsManager19.createResourceManagerDialogShowingAction();
        break;
      case 'onDependencyInserting':
        (_this$_actionsManager20 = this._actionsManager) === null || _this$_actionsManager20 === void 0 || _this$_actionsManager20.createDependencyInsertingAction();
        break;
      case 'onDependencyInserted':
        (_this$_actionsManager21 = this._actionsManager) === null || _this$_actionsManager21 === void 0 || _this$_actionsManager21.createDependencyInsertedAction();
        break;
      case 'onDependencyDeleting':
        (_this$_actionsManager22 = this._actionsManager) === null || _this$_actionsManager22 === void 0 || _this$_actionsManager22.createDependencyDeletingAction();
        break;
      case 'onDependencyDeleted':
        (_this$_actionsManager23 = this._actionsManager) === null || _this$_actionsManager23 === void 0 || _this$_actionsManager23.createDependencyDeletedAction();
        break;
      case 'onResourceInserting':
        (_this$_actionsManager24 = this._actionsManager) === null || _this$_actionsManager24 === void 0 || _this$_actionsManager24.createResourceInsertingAction();
        break;
      case 'onResourceInserted':
        (_this$_actionsManager25 = this._actionsManager) === null || _this$_actionsManager25 === void 0 || _this$_actionsManager25.createResourceInsertedAction();
        break;
      case 'onResourceDeleting':
        (_this$_actionsManager26 = this._actionsManager) === null || _this$_actionsManager26 === void 0 || _this$_actionsManager26.createResourceDeletingAction();
        break;
      case 'onResourceDeleted':
        (_this$_actionsManager27 = this._actionsManager) === null || _this$_actionsManager27 === void 0 || _this$_actionsManager27.createResourceDeletedAction();
        break;
      case 'onResourceAssigning':
        (_this$_actionsManager28 = this._actionsManager) === null || _this$_actionsManager28 === void 0 || _this$_actionsManager28.createResourceAssigningAction();
        break;
      case 'onResourceAssigned':
        (_this$_actionsManager29 = this._actionsManager) === null || _this$_actionsManager29 === void 0 || _this$_actionsManager29.createResourceAssignedAction();
        break;
      case 'onResourceUnassigning':
        (_this$_actionsManager30 = this._actionsManager) === null || _this$_actionsManager30 === void 0 || _this$_actionsManager30.createResourceUnassigningAction();
        break;
      case 'onResourceUnassigned':
        (_this$_actionsManager31 = this._actionsManager) === null || _this$_actionsManager31 === void 0 || _this$_actionsManager31.createResourceUnassignedAction();
        break;
      case 'onCustomCommand':
        (_this$_actionsManager32 = this._actionsManager) === null || _this$_actionsManager32 === void 0 || _this$_actionsManager32.createCustomCommandAction();
        break;
      case 'onContextMenuPreparing':
        (_this$_actionsManager33 = this._actionsManager) === null || _this$_actionsManager33 === void 0 || _this$_actionsManager33.createContextMenuPreparingAction();
        break;
      case 'onScaleCellPrepared':
        (_this$_actionsManager34 = this._actionsManager) === null || _this$_actionsManager34 === void 0 || _this$_actionsManager34.createScaleCellPreparedAction();
        break;
      case 'allowSelection':
        (_this$_ganttTreeList19 = this._ganttTreeList) === null || _this$_ganttTreeList19 === void 0 || _this$_ganttTreeList19.setOption('selection.mode', _uiGantt7.GanttHelper.getSelectionMode(value));
        this._setGanttViewOption('allowSelection', value);
        break;
      case 'showRowLines':
        (_this$_ganttTreeList20 = this._ganttTreeList) === null || _this$_ganttTreeList20 === void 0 || _this$_ganttTreeList20.setOption('showRowLines', value);
        this._setGanttViewOption('showRowLines', value);
        break;
      case 'stripLines':
        this._setGanttViewOption(fullName, value);
        break;
      case 'scaleType':
        this._setGanttViewOption('scaleType', value);
        break;
      case 'scaleTypeRange':
        this._setGanttViewOption('scaleTypeRange', this.option(name));
        break;
      case 'editing':
        this._setGanttViewOption('editing', this.option(name));
        break;
      case 'validation':
        this._setGanttViewOption('validation', this.option(name));
        break;
      case 'toolbar':
        this._updateToolbarContent();
        break;
      case 'contextMenu':
        this._updateContextMenu();
        break;
      case 'taskTooltipContentTemplate':
        this._setGanttViewOption('taskTooltipContentTemplate', (_this$_ganttTemplates5 = this._ganttTemplatesManager) === null || _this$_ganttTemplates5 === void 0 ? void 0 : _this$_ganttTemplates5.getTaskTooltipContentTemplateFunc(value));
        break;
      case 'taskProgressTooltipContentTemplate':
        this._setGanttViewOption('taskProgressTooltipContentTemplate', (_this$_ganttTemplates6 = this._ganttTemplatesManager) === null || _this$_ganttTemplates6 === void 0 ? void 0 : _this$_ganttTemplates6.getTaskProgressTooltipContentTemplateFunc(value));
        break;
      case 'taskTimeTooltipContentTemplate':
        this._setGanttViewOption('taskTimeTooltipContentTemplate', (_this$_ganttTemplates7 = this._ganttTemplatesManager) === null || _this$_ganttTemplates7 === void 0 ? void 0 : _this$_ganttTemplates7.getTaskTimeTooltipContentTemplateFunc(value));
        break;
      case 'taskContentTemplate':
        this._setGanttViewOption('taskContentTemplate', (_this$_ganttTemplates8 = this._ganttTemplatesManager) === null || _this$_ganttTemplates8 === void 0 ? void 0 : _this$_ganttTemplates8.getTaskContentTemplateFunc(value));
        break;
      case 'rootValue':
        (_this$_ganttTreeList21 = this._ganttTreeList) === null || _this$_ganttTreeList21 === void 0 || _this$_ganttTreeList21.setOption('rootValue', value);
        break;
      case 'width':
        super._optionChanged(args);
        (_this$_sizeHelper7 = this._sizeHelper) === null || _this$_sizeHelper7 === void 0 || _this$_sizeHelper7.updateGanttWidth();
        break;
      case 'height':
        super._optionChanged(args);
        (_this$_sizeHelper8 = this._sizeHelper) === null || _this$_sizeHelper8 === void 0 || _this$_sizeHelper8.setGanttHeight((0, _size.getHeight)(this.$element()));
        break;
      case 'sorting':
        (_this$_ganttTreeList22 = this._ganttTreeList) === null || _this$_ganttTreeList22 === void 0 || _this$_ganttTreeList22.setOption('sorting', this.option(name));
        break;
      case 'filterRow':
        (_this$_ganttTreeList23 = this._ganttTreeList) === null || _this$_ganttTreeList23 === void 0 || _this$_ganttTreeList23.setOption('filterRow', this.option(name));
        break;
      case 'headerFilter':
        (_this$_ganttTreeList24 = this._ganttTreeList) === null || _this$_ganttTreeList24 === void 0 || _this$_ganttTreeList24.setOption('headerFilter', this.option(name));
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxGantt', Gantt);
var _default = exports.default = Gantt;