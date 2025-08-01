/**
* DevExtreme (esm/ui/widget/utils.ink_ripple.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getOuterWidth, getOuterHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
const INKRIPPLE_CLASS = 'dx-inkripple';
const INKRIPPLE_WAVE_CLASS = 'dx-inkripple-wave';
const INKRIPPLE_SHOWING_CLASS = 'dx-inkripple-showing';
const INKRIPPLE_HIDING_CLASS = 'dx-inkripple-hiding';
const DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
const MAX_WAVE_SIZE = 4000; // NOTE: incorrect scaling of ink with big size (T310238)
const ANIMATION_DURATION = 300;
const HOLD_ANIMATION_DURATION = 1000;
const DEFAULT_WAVE_INDEX = 0;
export const initConfig = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    useHoldAnimation,
    waveSizeCoefficient,
    isCentered,
    wavesNumber
  } = config;
  return {
    waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
    isCentered: isCentered || false,
    wavesNumber: wavesNumber || 1,
    durations: getDurations(useHoldAnimation ?? true)
  };
};
export const render = function (args) {
  const config = initConfig(args);
  return {
    showWave: showWave.bind(this, config),
    hideWave: hideWave.bind(this, config)
  };
};
const getInkRipple = function (element) {
  let result = element.children('.' + INKRIPPLE_CLASS);
  if (result.length === 0) {
    result = $('<div>').addClass(INKRIPPLE_CLASS).appendTo(element);
  }
  return result;
};
const getWaves = function (element, wavesNumber) {
  const inkRipple = getInkRipple($(element));
  const result = inkRipple.children('.' + INKRIPPLE_WAVE_CLASS).toArray();
  for (let i = result.length; i < wavesNumber; i++) {
    const $currentWave = $('<div>').appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
    result.push($currentWave[0]);
  }
  return $(result);
};
const getWaveStyleConfig = function (args, config) {
  const element = $(config.element);
  const elementWidth = getOuterWidth(element);
  const elementHeight = getOuterHeight(element);
  const elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
  const waveSize = Math.min(MAX_WAVE_SIZE, parseInt(elementDiagonal * args.waveSizeCoefficient));
  let left;
  let top;
  if (args.isCentered) {
    left = (elementWidth - waveSize) / 2;
    top = (elementHeight - waveSize) / 2;
  } else {
    const event = config.event;
    const position = element.offset();
    const x = event.pageX - position.left;
    const y = event.pageY - position.top;
    left = x - waveSize / 2;
    top = y - waveSize / 2;
  }
  return {
    left,
    top,
    height: waveSize,
    width: waveSize
  };
};
export function showWave(args, config) {
  const $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
  args.hidingTimeout && clearTimeout(args.hidingTimeout);
  hideSelectedWave($wave);
  $wave.css(getWaveStyleConfig(args, config));
  args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0);
}
function showingWaveHandler(args, $wave) {
  const durationCss = args.durations.showingScale + 'ms';
  $wave.addClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
}
function getDurations(useHoldAnimation) {
  return {
    showingScale: useHoldAnimation ? HOLD_ANIMATION_DURATION : ANIMATION_DURATION,
    hidingScale: ANIMATION_DURATION,
    hidingOpacity: ANIMATION_DURATION
  };
}
function hideSelectedWave($wave) {
  $wave.removeClass(INKRIPPLE_HIDING_CLASS).css('transitionDuration', '');
}
export function hideWave(args, config) {
  args.showingTimeout && clearTimeout(args.showingTimeout);
  const $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
  const durations = args.durations;
  const durationCss = durations.hidingScale + 'ms, ' + durations.hidingOpacity + 'ms';
  $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css('transitionDuration', durationCss);
  const animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
  args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration);
}
