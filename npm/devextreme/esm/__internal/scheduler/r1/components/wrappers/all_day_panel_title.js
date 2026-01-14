/**
* DevExtreme (esm/__internal/scheduler/r1/components/wrappers/all_day_panel_title.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../../../core/component_registrator';
import { ComponentWrapper } from '../../../../core/r1/index';
import { AllDayPanelTitle } from '../base/all_day_panel_title';
export class AllDayPanelTitleComponent extends ComponentWrapper {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: []
    };
  }
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  // @ts-expect-error types error in R1
  get _viewComponent() {
    return AllDayPanelTitle;
  }
}
registerComponent('dxAllDayPanelTitle', AllDayPanelTitleComponent);
