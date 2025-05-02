"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _public_component = require("../../../core/utils/public_component");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const ITEM_CONTENT_PLACEHOLDER_CLASS = 'dx-item-content-placeholder';
const forcibleWatcher = (watchMethod, fn, callback) => {
  const filteredCallback = (() => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let oldValue;
    return value => {
      if (oldValue !== value) {
        callback(value, oldValue);
        oldValue = value;
      }
    };
  })();
  return {
    dispose: watchMethod(fn, filteredCallback),
    force() {
      filteredCallback(fn());
    }
  };
};
class CollectionItem extends _class.default.inherit({}) {
  ctor($element, options, rawData) {
    this._$element = $element;
    this._options = options;
    this._rawData = rawData;
    (0, _public_component.attachInstanceToElement)($element, this, this._dispose);
    this._render();
  }
  _render() {
    const $placeholder = (0, _renderer.default)('<div>').addClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
    this._$element.append($placeholder);
    this._watchers = [];
    this._renderWatchers();
  }
  _renderWatchers() {
    this._startWatcher('disabled', this._renderDisabled.bind(this));
    this._startWatcher('visible', this._renderVisible.bind(this));
  }
  _startWatcher(field, render) {
    const rawData = this._rawData;
    const exprGetter = this._options.fieldGetter(field);
    const watcher = forcibleWatcher(this._options.watchMethod(), () => exprGetter(rawData), (value, oldValue) => {
      this._dirty = true;
      render(value, oldValue);
    });
    this._watchers.push(watcher);
  }
  setDataField() {
    this._dirty = false;
    (0, _iterator.each)(this._watchers, (_, watcher) => {
      watcher.force();
    });
    return this._dirty;
  }
  _renderDisabled(value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  oldValue) {
    this._$element.toggleClass(DISABLED_STATE_CLASS, !!value);
    this._$element.attr('aria-disabled', !!value);
    this._updateOwnerFocus(value);
  }
  _updateOwnerFocus(isDisabled) {
    const ownerComponent = this._options.owner;
    if (ownerComponent && isDisabled) {
      // @ts-expect-error ts-error
      ownerComponent._resetItemFocus(this._$element);
    }
  }
  _renderVisible(value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  oldValue) {
    this._$element.toggleClass(INVISIBLE_STATE_CLASS, value !== undefined && !value);
  }
  _dispose() {
    (0, _iterator.each)(this._watchers, (_, watcher) => {
      watcher.dispose();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getInstance($element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _public_component.getInstanceByElement)($element, this);
  }
}
var _default = exports.default = CollectionItem;