/**
* DevExtreme (esm/__internal/scheduler/view_model/filtering/utils/filter_array.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import query from '../../../../../common/data/query';
export const filterArray = (items, combinedFilter) => query(items).filter(combinedFilter).toArray();
