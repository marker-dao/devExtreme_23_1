/**
* DevExtreme (esm/__internal/grids/grid_core/views/a11y_status_container_component.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
const CLASSES = {
  container: 'dx-gridbase-a11y-status-container'
};
export const A11yStatusContainerComponent = _ref => {
  let {
    statusText
  } = _ref;
  return $('<div>').text(statusText ?? '').addClass(CLASSES.container).attr('role', 'status');
};
