/**
* DevExtreme (cjs/__internal/common/core/animation/transition_executor/transition_executor.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionExecutor = void 0;
var _fx = _interopRequireDefault(require("../../../../../common/core/animation/fx"));
var _class = _interopRequireDefault(require("../../../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _deferred = require("../../../../../core/utils/deferred");
var _extend = require("../../../../../core/utils/extend");
var _iterator = require("../../../../../core/utils/iterator");
var _type = require("../../../../../core/utils/type");
var _m_presets = require("../../../../common/core/animation/presets/m_presets");
var _m_common = _interopRequireDefault(require("../../../../core/utils/m_common"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const directionPostfixes = {
  forward: ' dx-forward',
  backward: ' dx-backward',
  none: ' dx-no-direction',
  undefined: ' dx-no-direction'
};
const DX_ANIMATING_CLASS = 'dx-animating';
const TransitionExecutor = exports.TransitionExecutor = _class.default.inherit({
  ctor() {
    this._accumulatedDelays = {
      enter: 0,
      leave: 0
    };
    this._animations = [];
    this.reset();
  },
  _createAnimations($elements, initialConfig, configModifier, type) {
    // eslint-disable-next-line no-param-reassign
    $elements = (0, _renderer.default)($elements);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const result = [];
    // eslint-disable-next-line no-param-reassign
    configModifier = configModifier || {};
    const animationConfig = this._prepareElementAnimationConfig(initialConfig, configModifier, type);
    if (animationConfig) {
      $elements.each(function () {
        const animation = that._createAnimation((0, _renderer.default)(this), animationConfig, configModifier);
        if (animation) {
          animation.element.addClass(DX_ANIMATING_CLASS);
          animation.setup();
          result.push(animation);
        }
      });
    }
    return result;
  },
  _prepareElementAnimationConfig(config, configModifier, type) {
    // eslint-disable-next-line no-undef-init, @typescript-eslint/no-explicit-any
    let result = undefined;
    if (typeof config === 'string') {
      const presetName = config;
      // eslint-disable-next-line no-param-reassign
      config = _m_presets.presets.getPreset(presetName);
    }
    if (!config) {
      result = undefined;
    } else if ((0, _type.isFunction)(config[type])) {
      result = config[type];
    } else {
      result = (0, _extend.extend)({
        skipElementInitialStyles: true,
        cleanupWhen: this._completePromise
      }, config, configModifier);
      if (!result.type || result.type === 'css') {
        const cssClass = `dx-${type}`;
        const extraCssClasses = (result.extraCssClasses ? ` ${result.extraCssClasses}` : '') + directionPostfixes[result.direction];
        result.type = 'css';
        result.from = (result.from || cssClass) + extraCssClasses;
        result.to = result.to || `${cssClass}-active`;
      }
      result.staggerDelay = result.staggerDelay || 0;
      result.delay = result.delay || 0;
      if (result.staggerDelay) {
        result.delay += this._accumulatedDelays[type];
        this._accumulatedDelays[type] += result.staggerDelay;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  },
  _createAnimation($element, animationConfig, configModifier) {
    // eslint-disable-next-line no-undef-init
    let result = undefined;
    if ((0, _type.isPlainObject)(animationConfig)) {
      result = _fx.default.createAnimation($element, animationConfig);
    } else if ((0, _type.isFunction)(animationConfig)) {
      result = animationConfig($element, configModifier);
    }
    return result;
  },
  _startAnimations() {
    const animations = this._animations;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < animations.length; i += 1) {
      animations[i].start();
    }
  },
  _stopAnimations(jumpToEnd) {
    const animations = this._animations;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < animations.length; i += 1) {
      animations[i].stop(jumpToEnd);
    }
  },
  _clearAnimations() {
    const animations = this._animations;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < animations.length; i += 1) {
      animations[i].element.removeClass(DX_ANIMATING_CLASS);
    }
    this._animations.length = 0;
  },
  reset() {
    this._accumulatedDelays.enter = 0;
    this._accumulatedDelays.leave = 0;
    this._clearAnimations();
    // @ts-expect-error
    this._completeDeferred = new _deferred.Deferred();
    this._completePromise = this._completeDeferred.promise();
  },
  enter($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, 'enter');
    // eslint-disable-next-line prefer-spread
    this._animations.push.apply(this._animations, animations);
  },
  leave($elements, animationConfig, configModifier) {
    const animations = this._createAnimations($elements, animationConfig, configModifier, 'leave');
    // eslint-disable-next-line prefer-spread
    this._animations.push.apply(this._animations, animations);
  },
  start() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // eslint-disable-next-line no-undef-init
    let result = undefined;
    if (!this._animations.length) {
      that.reset();
      // @ts-expect-error
      result = new _deferred.Deferred().resolve().promise();
    } else {
      const animationDeferreds = (0, _iterator.map)(this._animations, animation => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const result = new _deferred.Deferred();
        animation.deferred.always(() => {
          result.resolve();
        });
        return result.promise();
      });
      result = _deferred.when.apply(_renderer.default, animationDeferreds).always(() => {
        that._completeDeferred.resolve();
        that.reset();
      });
      _m_common.default.executeAsync(() => {
        that._startAnimations();
      });
    }
    return result;
  },
  stop(jumpToEnd) {
    this._stopAnimations(jumpToEnd);
  }
});
