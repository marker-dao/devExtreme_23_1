/**
* DevExtreme (cjs/__internal/ui/drawer/drawer.animation.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = void 0;
var _animation = require("../../../common/core/animation");
var _inflector = require("../../../core/utils/inflector");
const animation = exports.animation = {
  getMoveToConfig(direction, position) {
    switch (direction) {
      case 'right':
        return {
          transform: `translate(${position}px, 0px)`
        };
      case 'left':
        return {
          left: position
        };
      case 'top':
      case 'bottom':
        return {
          top: position
        };
      default:
        return undefined;
    }
  },
  moveTo(config) {
    const {
      $element,
      position,
      direction = 'left',
      duration,
      complete
    } = config;
    const toConfig = this.getMoveToConfig(direction, position);
    // @ts-expect-error ts-error
    const animationType = direction === 'right' ? 'custom' : 'slide';
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element.get(0), {
      type: animationType,
      to: toConfig,
      duration,
      complete
    });
  },
  margin(config) {
    const {
      $element,
      margin,
      direction = 'left',
      duration,
      complete
    } = config;
    const marginName = `margin${(0, _inflector.camelize)(direction, true)}`;
    const toConfig = {
      [marginName]: margin
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element.get(0), {
      to: toConfig,
      duration,
      complete
    });
  },
  fade($element, config, duration, completeAction) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element.get(0), {
      type: 'fade',
      to: config.to,
      from: config.from,
      duration,
      complete: completeAction
    });
  },
  size(config) {
    const {
      $element,
      size,
      direction = 'left',
      marginTop = 0,
      duration,
      complete
    } = config;
    const toConfig = {};
    if (direction === 'right' || direction === 'left') {
      // @ts-expect-error ts-error
      toConfig.width = size;
    } else {
      // @ts-expect-error ts-error
      toConfig.height = size;
    }
    if (direction === 'bottom') {
      // @ts-expect-error ts-error
      toConfig.marginTop = marginTop;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element.get(0), {
      to: toConfig,
      duration,
      complete
    });
  },
  complete($element) {
    _animation.fx.stop($element.get(0), true);
  }
};
