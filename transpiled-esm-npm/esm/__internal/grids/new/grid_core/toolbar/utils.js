import _extends from "@babel/runtime/helpers/esm/extends";
import { extend } from '../../../../../core/utils/extend';
import { isDefined, isString } from '../../../../../core/utils/type';
export function isVisible(visibleConfig, items) {
  if (visibleConfig === undefined) {
    return items.length > 0;
  }
  return visibleConfig;
}
function normalizeToolbarItem(item, defaultButtonsMap, defaultItemNames) {
  let button = item;
  const defaultProps = {
    location: 'after'
  };
  if (isString(button)) {
    button = {
      name: button
    };
  }
  if (isDefined(button.name)) {
    if (isDefined(defaultButtonsMap[button.name])) {
      button = extend(true, {}, defaultButtonsMap[button.name], button);
    } else if (defaultItemNames.includes(button.name)) {
      button = _extends({}, button, {
        visible: false
      });
    }
  }
  return extend(true, {}, defaultProps, button);
}
export function normalizeToolbarItems(defaultItems, userItems, defaultItemNames) {
  if (!isDefined(userItems)) {
    return defaultItems;
  }
  const defaultButtonsMap = {};
  defaultItems.forEach(button => {
    defaultButtonsMap[button.name] = button;
  });
  return userItems.map(item => normalizeToolbarItem(item, defaultButtonsMap, defaultItemNames));
}