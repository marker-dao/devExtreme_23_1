/**
* DevExtreme (esm/__internal/grids/new/grid_core/columns_controller/columns_settings/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isObject } from '../../../../../../core/utils/type';
export const isAllowedColumnValue = value => isObject(value) || typeof value === 'string';
export const isCorrectColumnIdx = pathIdx => !isNaN(+pathIdx) && pathIdx !== null;
export const getColumnIdxFromPath = path => +path[1];
export const getColumnOptionPathStr = path => [...path].splice(2).join('.');
