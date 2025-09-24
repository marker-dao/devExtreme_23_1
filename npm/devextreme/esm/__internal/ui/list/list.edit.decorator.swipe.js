/**
* DevExtreme (esm/__internal/ui/list/list.edit.decorator.swipe.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fx } from '../../../common/core/animation';
import { move } from '../../../common/core/animation/translator';
import { Deferred } from '../../../core/utils/deferred';
import { getWidth } from '../../../core/utils/size';
import EditDecorator from '../../ui/list/list.edit.decorator';
import { register as registerDecorator } from '../../ui/list/list.edit.decorator_registry';
class EditDecoratorSwipe extends EditDecorator {
  _shouldHandleSwipe() {
    return true;
  }
  _renderItemPosition($itemElement, offset, animate) {
    const deferred = Deferred();
    const itemOffset = offset * this._itemElementWidth;
    if (animate) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fx.animate($itemElement.get(0), {
        to: {
          left: itemOffset
        },
        type: 'slide',
        complete() {
          deferred.resolve($itemElement, offset);
        }
      });
    } else {
      move($itemElement, {
        left: itemOffset
      });
      deferred.resolve();
    }
    return deferred.promise();
  }
  _swipeStartHandler($itemElement) {
    this._itemElementWidth = getWidth($itemElement);
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
registerDecorator('delete', 'swipe', EditDecoratorSwipe);
