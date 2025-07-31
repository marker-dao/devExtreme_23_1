/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_day.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import { VIEWS } from '../utils/options/constants_view';
import SchedulerWorkSpaceVertical from './m_work_space_vertical';
const DAY_CLASS = 'dx-scheduler-work-space-day';
class SchedulerWorkSpaceDay extends SchedulerWorkSpaceVertical {
  get type() {
    return VIEWS.DAY;
  }
  _getElementClass() {
    return DAY_CLASS;
  }
  _renderDateHeader() {
    return this.option('intervalCount') === 1 ? null : super._renderDateHeader();
  }
  renderRHeaderPanel() {
    if (this.option('intervalCount') === 1) {
      super.renderRHeaderPanel(false);
    } else {
      super.renderRHeaderPanel(true);
    }
  }
}
registerComponent('dxSchedulerWorkSpaceDay', SchedulerWorkSpaceDay);
export default SchedulerWorkSpaceDay;
