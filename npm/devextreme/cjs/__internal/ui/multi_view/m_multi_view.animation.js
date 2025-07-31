/**
* DevExtreme (cjs/__internal/ui/multi_view/m_multi_view.animation.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports._translator = void 0;
var _animation = require("../../../common/core/animation");
var _translator2 = require("../../../common/core/animation/translator");
// eslint-disable-next-line @typescript-eslint/naming-convention
const _translator = exports._translator = {
  move($element, position) {
    (0, _translator2.move)($element, {
      left: position
    });
  }
};
const animation = exports.animation = {
  moveTo($element, position, duration, completeAction) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element.get(0), {
      type: 'slide',
      to: {
        left: position
      },
      duration,
      complete: completeAction
    });
  },
  complete($element) {
    _animation.fx.stop($element.get(0), true);
  }
};
