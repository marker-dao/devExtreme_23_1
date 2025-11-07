/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/virtual_screen_crop.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _virtual_screen_crop = require("./virtual_screen_crop");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const options = {
  isVirtualScrolling: true,
  getVirtualScreen: () => ({
    left: 500,
    right: 1000,
    top: 500,
    bottom: 1000
  })
};
(0, _globals.describe)('cropByVirtualScreen', () => {
  (0, _globals.it)('should do nothing for isVirtualScrolling=false', () => {
    const entities = [1, 2, 3];
    (0, _globals.expect)((0, _virtual_screen_crop.cropByVirtualScreen)(entities, _extends({}, options, {
      isVirtualScrolling: false
    }))).toEqual(entities);
  });
  (0, _globals.it)('should filter out items out of the bounds', () => {
    const entities = [{
      groupIndex: 0,
      left: 0,
      top: 0,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 0,
      top: 100000,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 100000,
      top: 0,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 100000,
      top: 100000,
      width: 200,
      height: 200
    }];
    (0, _globals.expect)((0, _virtual_screen_crop.cropByVirtualScreen)(entities, options)).toEqual([]);
  });
  (0, _globals.it)('should crop items cross the bounds', () => {
    const entities = [{
      groupIndex: 0,
      left: 400,
      top: 450,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 400,
      top: 950,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 900,
      top: 450,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 900,
      top: 950,
      width: 200,
      height: 200
    }];
    (0, _globals.expect)((0, _virtual_screen_crop.cropByVirtualScreen)(entities, options)).toEqual([{
      groupIndex: 0,
      left: 500,
      top: 500,
      width: 100,
      height: 150
    }, {
      groupIndex: 0,
      left: 500,
      top: 950,
      width: 100,
      height: 50
    }, {
      groupIndex: 0,
      left: 900,
      top: 500,
      width: 100,
      height: 150
    }, {
      groupIndex: 0,
      left: 900,
      top: 950,
      width: 100,
      height: 50
    }]);
  });
  (0, _globals.it)('should not crop items inside of the bounds', () => {
    const entities = [{
      groupIndex: 0,
      left: 500,
      top: 600,
      width: 200,
      height: 200
    }, {
      groupIndex: 0,
      left: 700,
      top: 800,
      width: 200,
      height: 200
    }];
    (0, _globals.expect)((0, _virtual_screen_crop.cropByVirtualScreen)(entities, options)).toEqual(entities);
  });
});
