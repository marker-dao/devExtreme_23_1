/**
* DevExtreme (cjs/__internal/scheduler/utils/is_agenda_workpace_component.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAgendaWorkspaceComponent = isAgendaWorkspaceComponent;
const workspaceAgendaComponentName = 'dxSchedulerAgenda';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function isAgendaWorkspaceComponent(component) {
  return component.NAME === workspaceAgendaComponentName;
}
