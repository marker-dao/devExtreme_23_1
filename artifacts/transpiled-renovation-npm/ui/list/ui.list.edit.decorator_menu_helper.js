"use strict";

exports.default = void 0;
const EditDecoratorMenuHelperMixin = {
  _menuEnabled: function () {
    return !!this._menuItems().length;
  },
  _menuItems: function () {
    return this._list.option('menuItems');
  },
  _deleteEnabled: function () {
    return this._list.option('allowItemDeleting');
  },
  _fireMenuAction: function ($itemElement, action) {
    this._list._itemEventHandlerByHandler($itemElement, action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
};
var _default = EditDecoratorMenuHelperMixin;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;