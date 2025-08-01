"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _item = _interopRequireDefault(require("../../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LIST_ITEM_BADGE_CONTAINER_CLASS = 'dx-list-item-badge-container';
const LIST_ITEM_BADGE_CLASS = 'dx-list-item-badge';
const BADGE_CLASS = 'dx-badge';
const LIST_ITEM_CHEVRON_CONTAINER_CLASS = 'dx-list-item-chevron-container';
const LIST_ITEM_CHEVRON_CLASS = 'dx-list-item-chevron';
class ListItem extends _item.default {
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
    const $badge = (0, _renderer.default)('<div>').addClass(LIST_ITEM_BADGE_CONTAINER_CLASS).append((0, _renderer.default)('<div>').addClass(LIST_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge));
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
    const $chevronContainer = (0, _renderer.default)('<div>').addClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS);
    const $chevron = (0, _renderer.default)('<div>').addClass(LIST_ITEM_CHEVRON_CLASS);
    $chevronContainer.append($chevron).appendTo(this._$element);
  }
}
var _default = exports.default = ListItem;