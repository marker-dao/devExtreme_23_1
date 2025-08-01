/**
* DevExtreme (esm/ui/gantt/gantt_importer.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Errors from '../widget/ui.errors';
import Gantt from 'devexpress-gantt';
export function getGanttViewCore() {
  if (!Gantt) {
    throw Errors.Error('E1041', 'devexpress-gantt');
  }
  return Gantt;
}
