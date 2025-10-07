/**
* DevExtreme (esm/__internal/grids/new/grid_core/utils/common.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const getName = () => 'dxCardView';
export const addWidgetPrefix = className => `dx-${getName().slice(2).toLowerCase()}${className ? `-${className}` : ''}`;
