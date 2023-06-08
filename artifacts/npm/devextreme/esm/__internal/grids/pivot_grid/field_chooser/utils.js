/**
* DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/utils.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { SORT_ORDER } from './const';
export var reverseSortOrder = sortOrder => sortOrder === SORT_ORDER.descending ? SORT_ORDER.ascending : SORT_ORDER.descending;
