/**
* DevExtreme (cjs/__internal/ui/list/list.edit.decorator.swipe.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _animation = require("../../../common/core/animation");
var _translator = require("../../../common/core/animation/translator");
var _deferred = require("../../../core/utils/deferred");
var _size = require("../../../core/utils/size");
var _listEdit = _interopRequireDefault(require("../../ui/list/list.edit.decorator"));
var _listEdit2 = require("../../ui/list/list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditDecoratorSwipe extends _listEdit.default {
  _shouldHandleSwipe() {
    return true;
  }
  _renderItemPosition($itemElement, offset, animate) {
    const deferred = (0, _deferred.Deferred)();
    const itemOffset = offset * this._itemElementWidth;
    if (animate) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _animation.fx.animate($itemElement.get(0), {
        to: {
          left: itemOffset
        },
        type: 'slide',
        complete() {
          deferred.resolve($itemElement, offset);
        }
      });
    } else {
      (0, _translator.move)($itemElement, {
        left: itemOffset
      });
      deferred.resolve();
    }
    return deferred.promise();
  }
  _swipeStartHandler($itemElement) {
    this._itemElementWidth = (0, _size.getWidth)($itemElement);
  }
  _swipeUpdateHandler($itemElement, e) {
    const {
      offset
    } = e;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._renderItemPosition($itemElement, offset);
  }
  _swipeEndHandler($itemElement, e) {
    const {
      targetOffset
    } = e;
    this._renderItemPosition($itemElement, targetOffset, true)
    // @ts-expect-error ts-error
    .done(($element, offset) => {
      if (Math.abs(offset)) {
        // @ts-expect-error ts-error
        this._list.deleteItem($element.get(0)).fail(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._renderItemPosition($element, 0, true);
        });
      }
    });
  }
}
(0, _listEdit2.register)('delete', 'swipe', EditDecoratorSwipe);
