/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
const Actions = {
  onContextMenuPreparing: 'onContextMenuPreparing',
  onCustomCommand: 'onCustomCommand',
  onDependencyDeleted: 'onDependencyDeleted',
  onDependencyDeleting: 'onDependencyDeleting',
  onDependencyInserted: 'onDependencyInserted',
  onDependencyInserting: 'onDependencyInserting',
  onResourceAssigned: 'onResourceAssigned',
  onResourceAssigning: 'onResourceAssigning',
  onResourceDeleted: 'onResourceDeleted',
  onResourceDeleting: 'onResourceDeleting',
  onResourceInserted: 'onResourceInserted',
  onResourceInserting: 'onResourceInserting',
  onResourceManagerDialogShowing: 'onResourceManagerDialogShowing',
  onResourceUnassigned: 'onResourceUnassigned',
  onResourceUnassigning: 'onResourceUnassigning',
  onSelectionChanged: 'onSelectionChanged',
  onTaskClick: 'onTaskClick',
  onTaskDblClick: 'onTaskDblClick',
  onTaskDeleted: 'onTaskDeleted',
  onTaskDeleting: 'onTaskDeleting',
  onTaskEditDialogShowing: 'onTaskEditDialogShowing',
  onTaskInserted: 'onTaskInserted',
  onTaskInserting: 'onTaskInserting',
  onTaskMoving: 'onTaskMoving',
  onTaskUpdated: 'onTaskUpdated',
  onTaskUpdating: 'onTaskUpdating',
  onScaleCellPrepared: 'onScaleCellPrepared'
};
const GANTT_TASKS = 'tasks';
const GANTT_DEPENDENCIES = 'dependencies';
const GANTT_RESOURCES = 'resources';
const GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
const GANTT_NEW_TASK_CACHE_KEY = 'gantt_new_task_key';
export class GanttActionsManager {
  constructor(gantt) {
    this._gantt = gantt;
    this._mappingHelper = gantt._mappingHelper;
    this._customFieldsManager = gantt._customFieldsManager;
  }
  _createActionByOption(optionName) {
    var _this$_gantt;
    return (_this$_gantt = this._gantt) === null || _this$_gantt === void 0 ? void 0 : _this$_gantt._createActionByOption(optionName);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskData(key) {
    return this._gantt.getTaskData(key);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _convertCoreToMappedData(optionName, coreData) {
    var _this$_mappingHelper;
    return (_this$_mappingHelper = this._mappingHelper) === null || _this$_mappingHelper === void 0 ? void 0 : _this$_mappingHelper.convertCoreToMappedData(optionName, coreData);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _convertMappedToCoreData(optionName, mappedData) {
    var _this$_mappingHelper2;
    return (_this$_mappingHelper2 = this._mappingHelper) === null || _this$_mappingHelper2 === void 0 ? void 0 : _this$_mappingHelper2.convertMappedToCoreData(optionName, mappedData);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _convertMappedToCoreFields(optionName, fields) {
    var _this$_mappingHelper3;
    return (_this$_mappingHelper3 = this._mappingHelper) === null || _this$_mappingHelper3 === void 0 ? void 0 : _this$_mappingHelper3.convertMappedToCoreFields(optionName, fields);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _convertCoreToMappedFields(optionName, fields) {
    var _this$_mappingHelper4;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_mappingHelper4 = this._mappingHelper) === null || _this$_mappingHelper4 === void 0 ? void 0 : _this$_mappingHelper4.convertCoreToMappedFields(optionName, fields);
  }
  _saveCustomFieldsDataToCache(key, data) {
    var _this$_customFieldsMa;
    let forceUpdateOnKeyExpire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let isCustomFieldsUpdateOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    (_this$_customFieldsMa = this._customFieldsManager) === null || _this$_customFieldsMa === void 0 || _this$_customFieldsMa.saveCustomFieldsDataToCache(key, data, forceUpdateOnKeyExpire, isCustomFieldsUpdateOnly);
  }
  createTaskDblClickAction() {
    this._taskDblClickAction = this._createActionByOption(Actions.onTaskDblClick);
  }
  taskDblClickAction(args) {
    var _this$_taskDblClickAc;
    if (!this._taskDblClickAction) {
      this.createTaskDblClickAction();
    }
    (_this$_taskDblClickAc = this._taskDblClickAction) === null || _this$_taskDblClickAc === void 0 || _this$_taskDblClickAc.call(this, args);
  }
  raiseTaskDblClickAction(key, event) {
    const args = {
      cancel: false,
      data: this._getTaskData(key),
      event,
      key
    };
    this.taskDblClickAction(args);
    return !args.cancel;
  }
  createTaskClickAction() {
    this._taskClickAction = this._createActionByOption(Actions.onTaskClick);
  }
  taskClickAction(args) {
    var _this$_taskClickActio;
    if (!this._taskClickAction) {
      this.createTaskClickAction();
    }
    (_this$_taskClickActio = this._taskClickAction) === null || _this$_taskClickActio === void 0 || _this$_taskClickActio.call(this, args);
  }
  raiseTaskClickAction(key, event) {
    const args = {
      key,
      event,
      data: this._getTaskData(key)
    };
    this.taskClickAction(args);
  }
  createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption(Actions.onSelectionChanged);
  }
  selectionChangedAction(args) {
    var _this$_selectionChang;
    if (!this._selectionChangedAction) {
      this.createSelectionChangedAction();
    }
    (_this$_selectionChang = this._selectionChangedAction) === null || _this$_selectionChang === void 0 || _this$_selectionChang.call(this, args);
  }
  raiseSelectionChangedAction(selectedRowKey) {
    this.selectionChangedAction({
      selectedRowKey
    });
  }
  createCustomCommandAction() {
    this._customCommandAction = this._createActionByOption(Actions.onCustomCommand);
  }
  customCommandAction(args) {
    var _this$_customCommandA;
    if (!this._customCommandAction) {
      this.createCustomCommandAction();
    }
    (_this$_customCommandA = this._customCommandAction) === null || _this$_customCommandA === void 0 || _this$_customCommandA.call(this, args);
  }
  raiseCustomCommand(commandName) {
    this.customCommandAction({
      name: commandName
    });
  }
  createContextMenuPreparingAction() {
    this._contextMenuPreparingAction = this._createActionByOption(Actions.onContextMenuPreparing);
  }
  contextMenuPreparingAction(args) {
    var _this$_contextMenuPre;
    if (!this._contextMenuPreparingAction) {
      this.createContextMenuPreparingAction();
    }
    (_this$_contextMenuPre = this._contextMenuPreparingAction) === null || _this$_contextMenuPre === void 0 || _this$_contextMenuPre.call(this, args);
  }
  raiseContextMenuPreparing(options) {
    this.contextMenuPreparingAction(options);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getInsertingAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskInsertingAction();
      case GANTT_DEPENDENCIES:
        return this._getDependencyInsertingAction();
      case GANTT_RESOURCES:
        return this._getResourceInsertingAction();
      case GANTT_RESOURCE_ASSIGNMENTS:
        return this._getResourceAssigningAction();
      default:
        return () => {};
    }
  }
  raiseInsertingAction(optionName, coreArgs) {
    const action = this._getInsertingAction(optionName);
    if (action) {
      const args = {
        cancel: false,
        values: this._convertCoreToMappedData(optionName, coreArgs.values)
      };
      action(args);
      coreArgs.cancel = args.cancel;
      extend(coreArgs.values, this._convertMappedToCoreData(optionName, args.values));
      if (optionName === GANTT_TASKS) {
        this._saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, args.values);
      }
    }
  }
  createTaskInsertingAction() {
    this._taskInsertingAction = this._createActionByOption(Actions.onTaskInserting);
  }
  taskInsertingAction(args) {
    const action = this._getTaskInsertingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskInsertingAction() {
    if (!this._taskInsertingAction) {
      this.createTaskInsertingAction();
    }
    return this._taskInsertingAction;
  }
  createDependencyInsertingAction() {
    this._dependencyInsertingAction = this._createActionByOption(Actions.onDependencyInserting);
  }
  dependencyInsertingAction(args) {
    const action = this._getDependencyInsertingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDependencyInsertingAction() {
    if (!this._dependencyInsertingAction) {
      this.createDependencyInsertingAction();
    }
    return this._dependencyInsertingAction;
  }
  createResourceInsertingAction() {
    this._resourceInsertingAction = this._createActionByOption(Actions.onResourceInserting);
  }
  resourceInsertingAction(args) {
    const action = this._getResourceInsertingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceInsertingAction() {
    if (!this._resourceInsertingAction) {
      this.createResourceInsertingAction();
    }
    return this._resourceInsertingAction;
  }
  createResourceAssigningAction() {
    this._resourceAssigningAction = this._createActionByOption(Actions.onResourceAssigning);
  }
  resourceAssigningAction(args) {
    const action = this._getResourceAssigningAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceAssigningAction() {
    if (!this._resourceAssigningAction) {
      this.createResourceAssigningAction();
    }
    return this._resourceAssigningAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getInsertedAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskInsertedAction();
      case GANTT_DEPENDENCIES:
        return this._getDependencyInsertedAction();
      case GANTT_RESOURCES:
        return this._getResourceInsertedAction();
      case GANTT_RESOURCE_ASSIGNMENTS:
        return this._getResourceAssignedAction();
      default:
        return () => {};
    }
  }
  raiseInsertedAction(optionName, data, key) {
    const action = this._getInsertedAction(optionName);
    if (action) {
      const args = {
        values: data,
        key
      };
      action(args);
    }
  }
  createTaskInsertedAction() {
    this._taskInsertedAction = this._createActionByOption(Actions.onTaskInserted);
  }
  taskInsertedAction(args) {
    const action = this._getTaskInsertedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskInsertedAction() {
    if (!this._taskInsertedAction) {
      this.createTaskInsertedAction();
    }
    return this._taskInsertedAction;
  }
  createDependencyInsertedAction() {
    this._dependencyInsertedAction = this._createActionByOption(Actions.onDependencyInserted);
  }
  dependencyInsertedAction(args) {
    const action = this._getDependencyInsertedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDependencyInsertedAction() {
    if (!this._dependencyInsertedAction) {
      this.createDependencyInsertedAction();
    }
    return this._dependencyInsertedAction;
  }
  createResourceInsertedAction() {
    this._resourceInsertedAction = this._createActionByOption(Actions.onResourceInserted);
  }
  resourceInsertedAction(args) {
    const action = this._getResourceInsertedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceInsertedAction() {
    if (!this._resourceInsertedAction) {
      this.createResourceInsertedAction();
    }
    return this._resourceInsertedAction;
  }
  createResourceAssignedAction() {
    this._resourceAssignedAction = this._createActionByOption(Actions.onResourceAssigned);
  }
  resourceAssignedAction(args) {
    const action = this._getResourceAssignedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceAssignedAction() {
    if (!this._resourceAssignedAction) {
      this.createResourceAssignedAction();
    }
    return this._resourceAssignedAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDeletingAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskDeletingAction();
      case GANTT_DEPENDENCIES:
        return this._getDependencyDeletingAction();
      case GANTT_RESOURCES:
        return this._getResourceDeletingAction();
      case GANTT_RESOURCE_ASSIGNMENTS:
        return this._getResourceUnassigningAction();
      default:
        return () => {};
    }
  }
  raiseDeletingAction(optionName, coreArgs) {
    const action = this._getDeletingAction(optionName);
    if (action) {
      const args = {
        cancel: false,
        key: coreArgs.key,
        values: this._convertCoreToMappedData(optionName, coreArgs.values)
      };
      action(args);
      coreArgs.cancel = args.cancel;
    }
  }
  createTaskDeletingAction() {
    this._taskDeletingAction = this._createActionByOption(Actions.onTaskDeleting);
  }
  taskDeletingAction(args) {
    const action = this._getTaskDeletingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskDeletingAction() {
    if (!this._taskDeletingAction) {
      this.createTaskDeletingAction();
    }
    return this._taskDeletingAction;
  }
  createDependencyDeletingAction() {
    this._dependencyDeletingAction = this._createActionByOption(Actions.onDependencyDeleting);
  }
  dependencyDeletingAction(args) {
    const action = this._getDependencyDeletingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDependencyDeletingAction() {
    if (!this._dependencyDeletingAction) {
      this.createDependencyDeletingAction();
    }
    return this._dependencyDeletingAction;
  }
  createResourceDeletingAction() {
    this._resourceDeletingAction = this._createActionByOption(Actions.onResourceDeleting);
  }
  resourceDeletingAction(args) {
    const action = this._getResourceDeletingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceDeletingAction() {
    if (!this._resourceDeletingAction) {
      this.createResourceDeletingAction();
    }
    return this._resourceDeletingAction;
  }
  createResourceUnassigningAction() {
    this._resourceUnassigningAction = this._createActionByOption(Actions.onResourceUnassigning);
  }
  resourceUnassigningAction(args) {
    const action = this._getResourceUnassigningAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceUnassigningAction() {
    if (!this._resourceUnassigningAction) {
      this.createResourceUnassigningAction();
    }
    return this._resourceUnassigningAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDeletedAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskDeletedAction();
      case GANTT_DEPENDENCIES:
        return this._getDependencyDeletedAction();
      case GANTT_RESOURCES:
        return this._getResourceDeletedAction();
      case GANTT_RESOURCE_ASSIGNMENTS:
        return this._getResourceUnassignedAction();
      default:
        return () => {};
    }
  }
  raiseDeletedAction(optionName, key, data) {
    const action = this._getDeletedAction(optionName);
    if (action) {
      const args = {
        key,
        values: data
      };
      action(args);
    }
  }
  createTaskDeletedAction() {
    this._taskDeletedAction = this._createActionByOption(Actions.onTaskDeleted);
  }
  taskDeletedAction(args) {
    const action = this._getTaskDeletedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskDeletedAction() {
    if (!this._taskDeletedAction) {
      this.createTaskDeletedAction();
    }
    return this._taskDeletedAction;
  }
  createDependencyDeletedAction() {
    this._dependencyDeletedAction = this._createActionByOption(Actions.onDependencyDeleted);
  }
  dependencyDeletedAction(args) {
    const action = this._getDependencyDeletedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getDependencyDeletedAction() {
    if (!this._dependencyDeletedAction) {
      this.createDependencyDeletedAction();
    }
    return this._dependencyDeletedAction;
  }
  createResourceDeletedAction() {
    this._resourceDeletedAction = this._createActionByOption(Actions.onResourceDeleted);
  }
  resourceDeletedAction(args) {
    const action = this._getResourceDeletedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceDeletedAction() {
    if (!this._resourceDeletedAction) {
      this.createResourceDeletedAction();
    }
    return this._resourceDeletedAction;
  }
  createResourceUnassignedAction() {
    this._resourceUnassignedAction = this._createActionByOption(Actions.onResourceUnassigned);
  }
  resourceUnassignedAction(args) {
    const action = this._getResourceUnassignedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceUnassignedAction() {
    if (!this._resourceUnassignedAction) {
      this.createResourceUnassignedAction();
    }
    return this._resourceUnassignedAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getUpdatingAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskUpdatingAction();
      default:
        return () => {};
    }
  }
  raiseUpdatingAction(optionName, coreArgs, action) {
    // eslint-disable-next-line no-param-reassign
    action = action || this._getUpdatingAction(optionName);
    if (action) {
      var _this$_customFieldsMa2;
      const isTaskUpdating = optionName === GANTT_TASKS;
      const args = {
        cancel: false,
        key: coreArgs.key,
        newValues: this._convertCoreToMappedData(optionName, coreArgs.newValues),
        values: isTaskUpdating ? this._getTaskData(coreArgs.key) : this._convertCoreToMappedData(optionName, coreArgs.values)
      };
      if (isTaskUpdating && (_this$_customFieldsMa2 = this._customFieldsManager) !== null && _this$_customFieldsMa2 !== void 0 && _this$_customFieldsMa2.cache.hasData(args.key)) {
        var _this$_customFieldsMa3;
        (_this$_customFieldsMa3 = this._customFieldsManager) === null || _this$_customFieldsMa3 === void 0 || _this$_customFieldsMa3.addCustomFieldsDataFromCache(args.key, args.newValues);
      }
      action(args);
      coreArgs.cancel = args.cancel;
      extend(coreArgs.newValues, this._convertMappedToCoreData(optionName, args.newValues));
      if (isTaskUpdating) {
        if (args.cancel) {
          var _this$_customFieldsMa4;
          (_this$_customFieldsMa4 = this._customFieldsManager) === null || _this$_customFieldsMa4 === void 0 || _this$_customFieldsMa4.resetCustomFieldsDataCache(args.key);
        } else {
          const forceUpdateOnKeyExpire = !Object.keys(coreArgs.newValues).length;
          this._saveCustomFieldsDataToCache(args.key, args.newValues, forceUpdateOnKeyExpire);
        }
      }
    }
  }
  createTaskUpdatingAction() {
    this._taskUpdatingAction = this._createActionByOption(Actions.onTaskUpdating);
  }
  taskUpdatingAction(args) {
    const action = this._getTaskUpdatingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskUpdatingAction() {
    if (!this._taskUpdatingAction) {
      this.createTaskUpdatingAction();
    }
    return this._taskUpdatingAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getUpdatedAction(optionName) {
    switch (optionName) {
      case GANTT_TASKS:
        return this._getTaskUpdatedAction();
      default:
        return () => {};
    }
  }
  raiseUpdatedAction(optionName, data, key) {
    const action = this._getUpdatedAction(optionName);
    if (action) {
      const args = {
        values: data,
        key
      };
      action(args);
    }
  }
  createTaskUpdatedAction() {
    this._taskUpdatedAction = this._createActionByOption(Actions.onTaskUpdated);
  }
  taskUpdatedAction(args) {
    const action = this._getTaskUpdatedAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskUpdatedAction() {
    if (!this._taskUpdatedAction) {
      this.createTaskUpdatedAction();
    }
    return this._taskUpdatedAction;
  }
  createTaskEditDialogShowingAction() {
    this._taskEditDialogShowingAction = this._createActionByOption(Actions.onTaskEditDialogShowing);
  }
  taskEditDialogShowingAction(args) {
    const action = this._getTaskEditDialogShowingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskEditDialogShowingAction() {
    if (!this._taskEditDialogShowingAction) {
      this.createTaskEditDialogShowingAction();
    }
    return this._taskEditDialogShowingAction;
  }
  raiseTaskEditDialogShowingAction(coreArgs) {
    const action = this._getTaskEditDialogShowingAction();
    if (action) {
      const args = {
        cancel: false,
        key: coreArgs.key,
        values: this._convertCoreToMappedData(GANTT_TASKS, coreArgs.values),
        readOnlyFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.readOnlyFields),
        hiddenFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.hiddenFields)
      };
      action(args);
      coreArgs.cancel = args.cancel;
      extend(coreArgs.values, this._convertMappedToCoreData(GANTT_TASKS, args.values));
      coreArgs.readOnlyFields = this._convertMappedToCoreFields(GANTT_TASKS, args.readOnlyFields);
      coreArgs.hiddenFields = this._convertMappedToCoreFields(GANTT_TASKS, args.hiddenFields);
    }
  }
  createResourceManagerDialogShowingAction() {
    this._resourceManagerDialogShowingAction = this._createActionByOption(Actions.onResourceManagerDialogShowing);
  }
  resourceManagerDialogShowingAction(args) {
    const action = this._getResourceManagerDialogShowingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getResourceManagerDialogShowingAction() {
    if (!this._resourceManagerDialogShowingAction) {
      this.createResourceManagerDialogShowingAction();
    }
    return this._resourceManagerDialogShowingAction;
  }
  raiseResourceManagerDialogShowingAction(coreArgs) {
    const action = this._getResourceManagerDialogShowingAction();
    if (action) {
      const mappedResources = coreArgs.values.resources.items.map(r => this._convertMappedToCoreData(GANTT_RESOURCES, r));
      const args = {
        cancel: false,
        values: mappedResources
      };
      action(args);
      coreArgs.cancel = args.cancel;
    }
  }
  createTaskMovingAction() {
    this._taskMovingAction = this._createActionByOption(Actions.onTaskMoving);
  }
  taskMovingAction(args) {
    const action = this.getTaskMovingAction();
    action === null || action === void 0 || action(args);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getTaskMovingAction() {
    if (!this._taskMovingAction) {
      this.createTaskMovingAction();
    }
    return this._taskMovingAction;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getScaleCellPreparedAction() {
    if (!this._scaleCellPreparedAction) {
      this.createScaleCellPreparedAction();
    }
    return this._scaleCellPreparedAction;
  }
  createScaleCellPreparedAction() {
    this._scaleCellPreparedAction = this._createActionByOption(Actions.onScaleCellPrepared);
  }
  raiseScaleCellPreparedAction(data) {
    const action = this.getScaleCellPreparedAction();
    if (action) {
      const args = {
        scaleIndex: data.scaleIndex,
        scaleType: this._getScaleType(data.scaleType),
        scaleElement: getPublicElement($(data.scaleElement)),
        separatorElement: getPublicElement($(data.separatorElement)),
        startDate: new Date(data.start),
        endDate: new Date(data.end)
      };
      // @ts-expect-error ts-error
      action === null || action === void 0 || action(args);
    }
  }
  _getScaleType(viewType) {
    switch (viewType) {
      case 0:
        return 'minutes';
      case 1:
        return 'hours';
      case 2:
        return 'sixHours';
      case 3:
        return 'days';
      case 4:
        return 'weeks';
      case 5:
        return 'months';
      case 6:
        return 'quarters';
      case 7:
        return 'years';
      case 8:
        return 'fiveYears';
      default:
        return undefined;
    }
  }
}