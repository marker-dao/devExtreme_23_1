/**
* DevExtreme (esm/__internal/scheduler/r1/components/base/all_day_panel_title.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import messageLocalization from '../../../../../common/core/localization/message';
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
export class AllDayPanelTitle extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const text = messageLocalization.format('dxScheduler-allDay');
    return createVNode(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
AllDayPanelTitle.defaultProps = {};
