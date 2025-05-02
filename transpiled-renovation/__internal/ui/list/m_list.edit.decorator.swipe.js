"use strict";

var _animation = require("../../../common/core/animation");
var _translator = require("../../../common/core/animation/translator");
var _deferred = require("../../../core/utils/deferred");
var _size = require("../../../core/utils/size");
var _m_listEdit = _interopRequireDefault(require("./m_list.edit.decorator"));
var _m_listEdit2 = require("./m_list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditDecoratorSwipe extends _m_listEdit.default {
  // eslint-disable-next-line class-methods-use-this
  _shouldHandleSwipe() {
    return true;
  }
  _renderItemPosition($itemElement, offset, animate) {
    const deferred = (0, _deferred.Deferred)();
    const itemOffset = offset * this._itemElementWidth;
    if (animate) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _animation.fx.animate($itemElement, {
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
    return true;
  }
  _swipeUpdateHandler($itemElement, args) {
    this._renderItemPosition($itemElement, args.offset);
    return true;
  }
  _swipeEndHandler($itemElement, args) {
    const offset = args.targetOffset;
    this._renderItemPosition($itemElement, offset, true)
    // @ts-expect-error ts-error
    .done(($itemElement, offset) => {
      if (Math.abs(offset)) {
        this._list.deleteItem($itemElement).fail(() => {
          this._renderItemPosition($itemElement, 0, true);
        });
      }
    });
    return true;
  }
}
(0, _m_listEdit2.register)('delete', 'swipe', EditDecoratorSwipe);