/**
* DevExtreme (esm/__internal/data/data_converter/grouped.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isGroupItemsArray } from '../../../common/data';
import { isObject } from '../../../core/utils/type';
const groupKey = 'key';
export function getDataSourceOptions(dataSource) {
  if (!isGroupItemsArray(dataSource)) {
    return dataSource;
  }
  let hasSimpleItems = false;
  const data = dataSource.reduce((accumulator, item) => {
    var _item$items;
    const items = ((_item$items = item.items) === null || _item$items === void 0 ? void 0 : _item$items.map(value => {
      let innerItem = value;
      if (!isObject(innerItem)) {
        // @ts-expect-error
        innerItem = {
          text: innerItem
        };
        hasSimpleItems = true;
      }
      const objectItem = innerItem;
      if (!(groupKey in objectItem)) {
        objectItem[groupKey] = item.key;
      }
      return objectItem;
    })) ?? [];
    return accumulator.concat(items);
  }, []);
  return {
    store: {
      type: 'array',
      data
    },
    group: {
      selector: groupKey,
      // @ts-expect-error
      keepInitialKeyOrder: true
    },
    searchExpr: hasSimpleItems ? 'text' : undefined
  };
}
