/**
* DevExtreme (cjs/core/utils/stubs.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.stubComponent = stubComponent;
function stubComponent(componentName) {
  return /*#__PURE__*/function () {
    function NoComponent() {
      // TODO: make correct exceptions here and in decorators
      throw new Error("Module '".concat(componentName, "' not found"));
    }
    NoComponent.getInstance = function getInstance() {};
    return NoComponent;
  }();
}
