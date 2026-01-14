/**
* DevExtreme (esm/__internal/ui/multi_view/multi_view.animation.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fx } from '../../../common/core/animation';
import { move } from '../../../common/core/animation/translator';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const _translator = {
  move($element, position) {
    move($element, {
      left: position
    });
  }
};
export const animation = {
  moveTo($element, position, duration, completeAction) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fx.animate($element.get(0), {
      type: 'slide',
      to: {
        left: position
      },
      duration,
      complete: completeAction
    });
  },
  complete($element) {
    fx.stop($element.get(0), true);
  }
};
