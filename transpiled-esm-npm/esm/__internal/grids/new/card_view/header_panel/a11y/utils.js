import messageLocalization from '../../../../../../common/core/localization/message';
import { isDefined } from '../../../../../../core/utils/type';
import { I18N_KEYS, I18N_MESSAGE_SEPARATOR } from './const';
export const getCommonA11yLabel = columnName => messageLocalization.format(I18N_KEYS.common, columnName);
export const getHeaderFilterA11yLabel = hasHeaderFilterValue => hasHeaderFilterValue ? messageLocalization.format(I18N_KEYS.headerFilter) : null;
export const getSortingA11yLabel = sortOrder => {
  switch (sortOrder) {
    case 'asc':
      return messageLocalization.format(I18N_KEYS.sortingAsc);
    case 'desc':
      return messageLocalization.format(I18N_KEYS.sortingDesc);
    default:
      return null;
  }
};
export const getSortIndexA11yLabel = (sortOrder, sortIndex) => sortOrder && isDefined(sortIndex)
// @ts-expect-error bad i18n types
? messageLocalization.format(I18N_KEYS.sortIndex, sortIndex + 1) : null;
export const getHeaderItemA11yLabel = (columnName, _ref) => {
  let {
    sortOrder,
    sortIndex,
    hasHeaderFilterValue
  } = _ref;
  return [getCommonA11yLabel(columnName), getHeaderFilterA11yLabel(hasHeaderFilterValue), getSortingA11yLabel(sortOrder), getSortIndexA11yLabel(sortOrder, sortIndex)].filter(msg => !!msg).join(I18N_MESSAGE_SEPARATOR);
};