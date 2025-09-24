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