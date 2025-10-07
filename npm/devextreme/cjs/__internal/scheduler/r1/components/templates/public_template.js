/**
* DevExtreme (cjs/__internal/scheduler/r1/components/templates/public_template.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicTemplate = void 0;
var _inferno = require("inferno");
var _common = require("../../../../../core/utils/common");
var _index = require("../../../../core/r1/utils/index");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// eslint-disable-next-line @stylistic/comma-dangle
const PublicTemplate = _ref => {
  let {
    template,
    templateProps,
    renderOptions
  } = _ref;
  if (template === undefined) {
    return (0, _inferno.createFragment)();
  }
  const templateFn = (0, _index.getTemplate)(template);
  const templatePropsWithComparer = _extends({}, templateProps, {
    data: _extends({}, templateProps.data ?? {}, {
      // NOTE Fix for the T1251590
      // template_wrapper extract isEqual from props.data.isEqual
      // and use it on the shouldComponentUpdateHook
      isEqual: (renderOptions === null || renderOptions === void 0 ? void 0 : renderOptions.propsComparer) ?? _common.equalByValue
    })
  });
  return templateFn === null || templateFn === void 0 ? void 0 : templateFn(templatePropsWithComparer);
};
exports.PublicTemplate = PublicTemplate;
