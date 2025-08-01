/**
* DevExtreme (cjs/ui/diagram/diagram.toolbox_manager.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DiagramToolboxManager = {
  getDefaultGroups() {
    return this._groups || (this._groups = {
      general: {
        category: 'general',
        title: _message.default.format('dxDiagram-categoryGeneral')
      },
      flowchart: {
        category: 'flowchart',
        title: _message.default.format('dxDiagram-categoryFlowchart')
      },
      orgChart: {
        category: 'orgChart',
        title: _message.default.format('dxDiagram-categoryOrgChart')
      },
      containers: {
        category: 'containers',
        title: _message.default.format('dxDiagram-categoryContainers')
      },
      custom: {
        category: 'custom',
        title: _message.default.format('dxDiagram-categoryCustom')
      }
    });
  },
  getGroups: function (groups) {
    const defaultGroups = this.getDefaultGroups();
    if (groups) {
      return groups.map(function (g) {
        if (typeof g === 'string') {
          return {
            category: g,
            title: defaultGroups[g] && defaultGroups[g].title || g
          };
        }
        return g;
      }).filter(function (g) {
        return g;
      });
    }
    return [defaultGroups['general'], defaultGroups['flowchart'], defaultGroups['orgChart'], defaultGroups['containers']];
  }
};
var _default = exports.default = DiagramToolboxManager;
module.exports = exports.default;
module.exports.default = exports.default;
