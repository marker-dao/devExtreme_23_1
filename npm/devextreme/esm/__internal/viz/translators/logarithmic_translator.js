/**
* DevExtreme (esm/__internal/viz/translators/logarithmic_translator.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isDefined } from '../../../core/utils/type';
import { getLogExt as getLog, raiseToExt as raiseTo } from '../../viz/core/utils';
export default {
  fromValue(value) {
    return value !== null ? getLog(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
  },
  toValue(value) {
    return value !== null ? raiseTo(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
  },
  getMinBarSize(minBarSize) {
    const visibleArea = this.getCanvasVisibleArea();
    const minValue = this.from(visibleArea.min + minBarSize);
    const canvasOptions = this._canvasOptions;
    const startValue = this.fromValue(this.from(visibleArea.min));
    const endValue = this.fromValue(minValue ?? this.from(visibleArea.max));
    const value = Math.abs(startValue - endValue);
    return canvasOptions.base ** value;
  },
  checkMinBarSize(initialValue, minShownValue, stackValue) {
    const canvasOptions = this._canvasOptions;
    const prevValue = stackValue ? stackValue - initialValue : 0;
    const baseMethod = this.constructor.prototype.checkMinBarSize;
    let minBarSize;
    let updateValue;
    if (isDefined(minShownValue) && prevValue > 0) {
      minBarSize = baseMethod(this.fromValue(stackValue / prevValue), this.fromValue(minShownValue) - canvasOptions.rangeMinVisible);
      updateValue = canvasOptions.base ** (this.fromValue(prevValue) + minBarSize) - prevValue;
    } else {
      updateValue = baseMethod(initialValue, minShownValue);
    }
    return updateValue;
  }
};
