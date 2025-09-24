/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.static.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _wrapper = _interopRequireDefault(require("../../ui/button/wrapper"));
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
var _listEdit2 = require("../../ui/list/list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const STATIC_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-static-delete-button-container';
const STATIC_DELETE_BUTTON_CLASS = 'dx-list-static-delete-button';
class EditDecoratorStatic extends _listEdit.default {
  afterBag(config) {
    const {
      $itemElement,
      $container
    } = config;
    const $button = (0, _renderer.default)('<div>').addClass(STATIC_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, _wrapper.default, {
      icon: 'remove',
      onClick: args => {
        const {
          event
        } = args;
        event === null || event === void 0 || event.stopPropagation();
        this._deleteItem($itemElement);
      },
      // @ts-expect-error
      integrationOptions: {},
      elementAttr: {
        role: null,
        'aria-label': null
      },
      tabIndex: -1
    });
    $container.addClass(STATIC_DELETE_BUTTON_CONTAINER_CLASS).append($button);
  }
  _deleteItem($itemElement) {
    if ($itemElement.is('.dx-state-disabled, .dx-state-disabled *')) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._list.deleteItem($itemElement.get(0));
  }
}
(0, _listEdit2.register)('delete', 'static', EditDecoratorStatic);
