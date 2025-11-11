/**
* DevExtreme (esm/__internal/ui/gantt/gantt_importer.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../ui/widget/ui.errors';
import Gantt from 'devexpress-gantt';
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export function getGanttViewCore() {
  if (!Gantt) {
    throw errors.Error('E1041', 'devexpress-gantt');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Gantt;
}
