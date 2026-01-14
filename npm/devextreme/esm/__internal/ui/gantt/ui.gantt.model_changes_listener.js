/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.model_changes_listener.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const GANTT_TASKS = 'tasks';
const GANTT_DEPENDENCIES = 'dependencies';
const GANTT_RESOURCES = 'resources';
const GANTT_RESOURCE_ASSIGNMENTS = 'resourceAssignments';
export const ModelChangesListener = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  create(gantt) {
    return {
      NotifyTaskCreated: (task, callback, errorCallback) => {
        gantt._onRecordInserted(GANTT_TASKS, task, callback);
      },
      NotifyTaskRemoved: (taskId, errorCallback, task) => {
        gantt._onRecordRemoved(GANTT_TASKS, taskId, task);
      },
      NotifyTaskUpdated: (taskId, newValues, errorCallback) => {
        gantt._onRecordUpdated(GANTT_TASKS, taskId, newValues);
      },
      NotifyParentTaskUpdated: (task, errorCallback) => {
        gantt._onParentTaskUpdated(task);
      },
      NotifyDependencyInserted: (dependency, callback, errorCallback) => {
        gantt._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback);
      },
      NotifyDependencyRemoved: (dependencyId, errorCallback, dependency) => {
        gantt._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId, dependency);
      },
      NotifyResourceCreated: (resource, callback, errorCallback) => {
        gantt._onRecordInserted(GANTT_RESOURCES, resource, callback);
      },
      NotifyResourceRemoved: (resourceId, errorCallback, resource) => {
        gantt._onRecordRemoved(GANTT_RESOURCES, resourceId, resource);
      },
      NotifyResourceAssigned: (assignment, callback, errorCallback) => {
        gantt._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback);
      },
      NotifyResourceUnassigned: (assignmentId, errorCallback, assignment) => {
        gantt._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId, assignment);
      },
      NotifyParentDataRecalculated: data => {
        gantt._onParentTasksRecalculated(data);
      },
      NotifyTaskCreating: args => {
        var _gantt$_actionsManage;
        (_gantt$_actionsManage = gantt._actionsManager) === null || _gantt$_actionsManage === void 0 || _gantt$_actionsManage.raiseInsertingAction(GANTT_TASKS, args);
      },
      NotifyTaskRemoving: args => {
        var _gantt$_actionsManage2;
        (_gantt$_actionsManage2 = gantt._actionsManager) === null || _gantt$_actionsManage2 === void 0 || _gantt$_actionsManage2.raiseDeletingAction(GANTT_TASKS, args);
      },
      NotifyTaskUpdating: args => {
        var _gantt$_actionsManage3;
        (_gantt$_actionsManage3 = gantt._actionsManager) === null || _gantt$_actionsManage3 === void 0 || _gantt$_actionsManage3.raiseUpdatingAction(GANTT_TASKS, args);
      },
      NotifyTaskMoving: args => {
        var _gantt$_actionsManage4, _gantt$_actionsManage5;
        (_gantt$_actionsManage4 = gantt._actionsManager) === null || _gantt$_actionsManage4 === void 0 || _gantt$_actionsManage4.raiseUpdatingAction(GANTT_TASKS, args, (_gantt$_actionsManage5 = gantt._actionsManager) === null || _gantt$_actionsManage5 === void 0 ? void 0 : _gantt$_actionsManage5.getTaskMovingAction());
      },
      NotifyTaskEditDialogShowing: args => {
        var _gantt$_actionsManage6;
        (_gantt$_actionsManage6 = gantt._actionsManager) === null || _gantt$_actionsManage6 === void 0 || _gantt$_actionsManage6.raiseTaskEditDialogShowingAction(args);
      },
      NotifyResourceManagerDialogShowing: args => {
        var _gantt$_actionsManage7;
        (_gantt$_actionsManage7 = gantt._actionsManager) === null || _gantt$_actionsManage7 === void 0 || _gantt$_actionsManage7.raiseResourceManagerDialogShowingAction(args);
      },
      NotifyDependencyInserting: args => {
        var _gantt$_actionsManage8;
        (_gantt$_actionsManage8 = gantt._actionsManager) === null || _gantt$_actionsManage8 === void 0 || _gantt$_actionsManage8.raiseInsertingAction(GANTT_DEPENDENCIES, args);
      },
      NotifyDependencyRemoving: args => {
        var _gantt$_actionsManage9;
        (_gantt$_actionsManage9 = gantt._actionsManager) === null || _gantt$_actionsManage9 === void 0 || _gantt$_actionsManage9.raiseDeletingAction(GANTT_DEPENDENCIES, args);
      },
      NotifyResourceCreating: args => {
        var _gantt$_actionsManage0;
        (_gantt$_actionsManage0 = gantt._actionsManager) === null || _gantt$_actionsManage0 === void 0 || _gantt$_actionsManage0.raiseInsertingAction(GANTT_RESOURCES, args);
      },
      NotifyResourceRemoving: args => {
        var _gantt$_actionsManage1;
        (_gantt$_actionsManage1 = gantt._actionsManager) === null || _gantt$_actionsManage1 === void 0 || _gantt$_actionsManage1.raiseDeletingAction(GANTT_RESOURCES, args);
      },
      NotifyResourceAssigning: args => {
        var _gantt$_actionsManage10;
        (_gantt$_actionsManage10 = gantt._actionsManager) === null || _gantt$_actionsManage10 === void 0 || _gantt$_actionsManage10.raiseInsertingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
      },
      NotifyResourceUnassigning: args => {
        var _gantt$_actionsManage11;
        (_gantt$_actionsManage11 = gantt._actionsManager) === null || _gantt$_actionsManage11 === void 0 || _gantt$_actionsManage11.raiseDeletingAction(GANTT_RESOURCE_ASSIGNMENTS, args);
      },
      NotifyScaleCellPrepared: args => {
        var _gantt$_actionsManage12;
        (_gantt$_actionsManage12 = gantt._actionsManager) === null || _gantt$_actionsManage12 === void 0 || _gantt$_actionsManage12.raiseScaleCellPreparedAction(args);
      },
      NotifyGanttViewUpdated: () => {
        gantt._onGanttViewCoreUpdated();
      }
    };
  }
};
