/**
* DevExtreme (esm/__internal/ui/form/m_form.utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import { isDefined } from '../../../core/utils/type';
export const createItemPathByIndex = (index, isTabs) => `${isTabs ? 'tabs' : 'items'}[${index}]`;
export const concatPaths = (path1, path2) => {
  if (isDefined(path1) && isDefined(path2)) {
    return `${path1}.${path2}`;
  }
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return path1 || path2;
};
export const getTextWithoutSpaces = text => text ? text.replace(/\s/g, '') : undefined;
export const isEqualToDataFieldOrNameOrTitleOrCaption = (item, fieldName) => {
  if (item) {
    return item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || item.itemType === 'group' && getTextWithoutSpaces(item.caption) === fieldName;
  }
  return false;
};
export const getFullOptionName = (path, optionName) => `${path}.${optionName}`;
export const getOptionNameFromFullName = fullName => {
  const parts = fullName.split('.');
  return parts[parts.length - 1].replace(/\[\d+]/, '');
};
export const isFullPathContainsTabs = fullPath => fullPath.includes('tabs');
export const tryGetTabPath = fullPath => {
  const pathParts = fullPath.split('.');
  const resultPathParts = [...pathParts];
  for (let i = pathParts.length - 1; i >= 0; i -= 1) {
    if (isFullPathContainsTabs(pathParts[i])) {
      return resultPathParts.join('.');
    }
    resultPathParts.splice(i, 1);
  }
  return '';
};
export const getItemPath = (items, item, isTabs) => {
  if (!item) {
    return '';
  }
  const index = items.indexOf(item);
  if (index > -1) {
    return createItemPathByIndex(index, isTabs);
  }
  for (let i = 0; i < items.length; i += 1) {
    const targetItem = items[i];
    const tabOrGroupItems = targetItem.tabs ?? targetItem.items;
    if (tabOrGroupItems) {
      const itemPath = getItemPath(tabOrGroupItems, item, !!targetItem.tabs);
      if (itemPath) {
        return concatPaths(createItemPathByIndex(i, isTabs), itemPath) ?? '';
      }
    }
  }
  return '';
};
export function convertToLayoutManagerOptions(_ref) {
  let {
    form,
    $formElement,
    formOptions,
    items,
    validationGroup,
    extendedLayoutManagerOptions,
    onFieldDataChanged,
    onContentReady,
    onDisposing,
    onFieldItemRendered
  } = _ref;
  const baseOptions = {
    form,
    items,
    $formElement,
    validationGroup,
    // @ts-expect-error ts-error
    onFieldDataChanged,
    onContentReady,
    onDisposing,
    onFieldItemRendered,
    validationBoundary: formOptions.scrollingEnabled ? $formElement : undefined,
    scrollingEnabled: formOptions.scrollingEnabled,
    showRequiredMark: formOptions.showRequiredMark,
    showOptionalMark: formOptions.showOptionalMark,
    requiredMark: formOptions.requiredMark,
    optionalMark: formOptions.optionalMark,
    requiredMessage: formOptions.requiredMessage,
    screenByWidth: formOptions.screenByWidth,
    layoutData: formOptions.formData,
    labelLocation: formOptions.labelLocation,
    customizeItem: formOptions.customizeItem,
    minColWidth: formOptions.minColWidth,
    showColonAfterLabel: formOptions.showColonAfterLabel,
    onEditorEnterKey: formOptions.onEditorEnterKey,
    labelMode: formOptions.labelMode
  };
  // cannot use '=' because 'extend' makes special assingment
  const result = extend(baseOptions, {
    isRoot: extendedLayoutManagerOptions.isRoot,
    colCount: extendedLayoutManagerOptions.colCount,
    alignItemLabels: extendedLayoutManagerOptions.alignItemLabels,
    cssItemClass: extendedLayoutManagerOptions.cssItemClass,
    colCountByScreen: extendedLayoutManagerOptions.colCountByScreen,
    onLayoutChanged: extendedLayoutManagerOptions.onLayoutChanged,
    width: extendedLayoutManagerOptions.width
  });
  return result;
}
