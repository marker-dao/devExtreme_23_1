/**
* DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { SORT_ORDER } from './const';
export const reverseSortOrder = sortOrder => sortOrder === SORT_ORDER.descending ? SORT_ORDER.ascending : SORT_ORDER.descending;
