/**
* DevExtreme (esm/__internal/ui/list/item.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import CollectionWidgetItem from '../../ui/collection/item';
const LIST_ITEM_BADGE_CONTAINER_CLASS = 'dx-list-item-badge-container';
const LIST_ITEM_BADGE_CLASS = 'dx-list-item-badge';
const BADGE_CLASS = 'dx-badge';
const LIST_ITEM_CHEVRON_CONTAINER_CLASS = 'dx-list-item-chevron-container';
const LIST_ITEM_CHEVRON_CLASS = 'dx-list-item-chevron';
class ListItem extends CollectionWidgetItem {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher('badge', this._renderBadge.bind(this));
    this._startWatcher('showChevron', this._renderShowChevron.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(`.${LIST_ITEM_BADGE_CONTAINER_CLASS}`).remove();
    if (!badge) {
      return;
    }
    const $badge = $('<div>').addClass(LIST_ITEM_BADGE_CONTAINER_CLASS).append($('<div>').addClass(LIST_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge));
    const $chevron = this._$element.children(`.${LIST_ITEM_CHEVRON_CONTAINER_CLASS}`).first();
    if ($chevron.length > 0) {
      $badge.insertBefore($chevron);
    } else {
      $badge.appendTo(this._$element);
    }
  }
  _renderShowChevron(showChevron) {
    this._$element.children(`.${LIST_ITEM_CHEVRON_CONTAINER_CLASS}`).remove();
    if (!showChevron) {
      return;
    }
    const $chevronContainer = $('<div>').addClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS);
    const $chevron = $('<div>').addClass(LIST_ITEM_CHEVRON_CLASS);
    $chevronContainer.append($chevron).appendTo(this._$element);
  }
}
export default ListItem;
