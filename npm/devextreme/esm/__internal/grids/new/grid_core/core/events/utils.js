/**
* DevExtreme (esm/__internal/grids/new/grid_core/core/events/utils.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const markIgnored = event => {
  event.dxIgnore = true;
};
const markHandled = event => {
  event.dxHandled = true;
};
export const eventUtils = {
  markHandled,
  markIgnored
};
