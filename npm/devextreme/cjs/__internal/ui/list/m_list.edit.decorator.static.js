/**
* DevExtreme (cjs/__internal/ui/list/m_list.edit.decorator.static.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../ui/button"));
var _m_listEdit = _interopRequireDefault(require("./m_list.edit.decorator"));
var _m_listEdit2 = require("./m_list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const STATIC_DELETE_BUTTON_CONTAINER_CLASS = 'dx-list-static-delete-button-container';
const STATIC_DELETE_BUTTON_CLASS = 'dx-list-static-delete-button';
class EditDecoratorStatic extends _m_listEdit.default {
  afterBag(config) {
    const {
      $itemElement
    } = config;
    const {
      $container
    } = config;
    const $button = (0, _renderer.default)('<div>').addClass(STATIC_DELETE_BUTTON_CLASS);
    this._list._createComponent($button, _button.default, {
      icon: 'remove',
      onClick: function (args) {
        args.event.stopPropagation();
        this._deleteItem($itemElement);
      }.bind(this),
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
    this._list.deleteItem($itemElement);
  }
}
(0, _m_listEdit2.register)('delete', 'static', EditDecoratorStatic);
