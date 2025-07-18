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