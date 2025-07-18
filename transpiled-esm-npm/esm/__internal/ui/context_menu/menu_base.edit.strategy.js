import $ from '../../../core/renderer';
import { map } from '../../../core/utils/iterator';
import PlainEditStrategy from '../../ui/collection/collection_widget.edit.strategy.plain';
class MenuBaseEditStrategy extends PlainEditStrategy {
  _getPlainItems() {
    const items = this._getItems();
    const result = map(items, function getMenuItems(item) {
      return item.items ? [item].concat(map(item.items, getMenuItems)) : item;
    });
    return result.flat();
  }
  static _stringifyItem(item) {
    return JSON.stringify(item, (key, value) => {
      if (key === 'template') {
        return MenuBaseEditStrategy._getTemplateString(value);
      }
      return value;
    });
  }
  static _getTemplateString(template) {
    if (typeof template === 'object' && template !== null) {
      // @ts-expect-error ts-error
      return $(template).text();
    }
    return String(template);
  }
}
export default MenuBaseEditStrategy;