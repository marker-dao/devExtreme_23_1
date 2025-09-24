/**
* DevExtreme (esm/__internal/scheduler/utils/is_agenda_workpace_component.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const workspaceAgendaComponentName = 'dxSchedulerAgenda';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isAgendaWorkspaceComponent(component) {
  return component.NAME === workspaceAgendaComponentName;
}
