/**
* DevExtreme (cjs/ui/gantt/ui.gantt.data_changes_processing_helper.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttDataChangesProcessingHelper = void 0;
class GanttDataChangesProcessingHelper {
  constructor() {
    this._waitingForGanttViewReady = false;
    this._waitingForTreeListReady = false;
    this._completionActions = [];
  }
  onGanttViewReady() {
    this._stopWaitForGanttViewReady();
    this.executeActionsIfPossible();
  }
  onTreeListReady() {
    this._stopWaitForTreeListReady();
    this.executeActionsIfPossible();
  }
  addCompletionAction(action, waitGanttViewReady, waitTreeListReady) {
    if (action) {
      if (waitGanttViewReady) {
        this._startWaitForGanttViewReady();
      }
      if (waitTreeListReady) {
        this._startWaitForTreeListReady();
      }
      this._completionActions.push(action);
    }
  }
  executeActionsIfPossible() {
    if (this._canExecuteActions()) {
      this._completionActions.forEach(act => act());
      this._completionActions = [];
    }
  }
  _startWaitForGanttViewReady() {
    this._waitingForGanttViewReady = true;
  }
  _stopWaitForGanttViewReady() {
    this._waitingForGanttViewReady = false;
  }
  _startWaitForTreeListReady() {
    this._waitingForTreeListReady = true;
  }
  _stopWaitForTreeListReady() {
    this._waitingForTreeListReady = false;
  }
  _canExecuteActions() {
    return !(this._waitingForGanttViewReady || this._waitingForTreeListReady);
  }
}
exports.GanttDataChangesProcessingHelper = GanttDataChangesProcessingHelper;
