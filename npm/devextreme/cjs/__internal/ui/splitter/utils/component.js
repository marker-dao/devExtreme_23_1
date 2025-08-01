/**
* DevExtreme (cjs/__internal/ui/splitter/utils/component.js)
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
exports.getComponentInstance = getComponentInstance;
function getComponentInstance($element) {
  var _$element$data, _$element$data2;
  const componentName = (_$element$data = $element.data) === null || _$element$data === void 0 ? void 0 : _$element$data.call($element, 'dxComponents')[0];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return componentName && ((_$element$data2 = $element.data) === null || _$element$data2 === void 0 ? void 0 : _$element$data2.call($element, `${componentName}`));
}
