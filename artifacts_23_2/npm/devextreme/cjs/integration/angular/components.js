/**
* DevExtreme (cjs/integration/angular/components.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _module = _interopRequireDefault(require("./module"));
var _angular = _interopRequireDefault(require("angular"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

if (_angular.default) {
  _module.default.service('dxDigestCallbacks', ['$rootScope', function ($rootScope) {
    const begin = (0, _callbacks.default)();
    const prioritizedEnd = (0, _callbacks.default)();
    const end = (0, _callbacks.default)();
    let digestPhase = false;
    $rootScope.$watch(function () {
      if (digestPhase) {
        return;
      }
      digestPhase = true;
      begin.fire();
      $rootScope.$$postDigest(function () {
        digestPhase = false;
        prioritizedEnd.fire();
        end.fire();
      });
    });
    return {
      begin: {
        add: function (callback) {
          if (digestPhase) {
            callback();
          }
          begin.add(callback);
        },
        remove: begin.remove.bind(begin)
      },
      end: {
        add: end.add.bind(end),
        addPrioritized: prioritizedEnd.add.bind(prioritizedEnd),
        remove: end.remove.bind(end)
      }
    };
  }]);
}
