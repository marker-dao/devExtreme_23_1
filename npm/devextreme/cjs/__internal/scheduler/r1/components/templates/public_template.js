/**
* DevExtreme (cjs/__internal/scheduler/r1/components/templates/public_template.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
  const templatePropsWithComparer = Object.assign({}, templateProps, {
    data: Object.assign({}, templateProps.data ?? {}, {
      // NOTE Fix for the T1251590
      // template_wrapper extract isEqual from props.data.isEqual
      // and use it on the shouldComponentUpdateHook
      isEqual: (renderOptions === null || renderOptions === void 0 ? void 0 : renderOptions.propsComparer) ?? _common.equalByValue
    })
  });
  return templateFn === null || templateFn === void 0 ? void 0 : templateFn(templatePropsWithComparer);
};
exports.PublicTemplate = PublicTemplate;
