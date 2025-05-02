import { fx } from '../../../common/core/animation';
import { move } from '../../../common/core/animation/translator';
import { Deferred } from '../../../core/utils/deferred';
import { getWidth } from '../../../core/utils/size';
import EditDecorator from './m_list.edit.decorator';
import { register as registerDecorator } from './m_list.edit.decorator_registry';
class EditDecoratorSwipe extends EditDecorator {
  // eslint-disable-next-line class-methods-use-this
  _shouldHandleSwipe() {
    return true;
  }
  _renderItemPosition($itemElement, offset, animate) {
    const deferred = Deferred();
    const itemOffset = offset * this._itemElementWidth;
    if (animate) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fx.animate($itemElement, {
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
registerDecorator('delete', 'swipe', EditDecoratorSwipe);