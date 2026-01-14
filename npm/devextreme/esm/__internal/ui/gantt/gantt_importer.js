/**
* DevExtreme (esm/__internal/ui/gantt/gantt_importer.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
