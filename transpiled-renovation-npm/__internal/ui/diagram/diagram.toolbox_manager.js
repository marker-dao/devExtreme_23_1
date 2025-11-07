"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DiagramToolboxManager = {
  getDefaultGroups() {
    if (!this._groups) {
      this._groups = {
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
      };
    }
    return this._groups;
  },
  getGroups(groups) {
    const defaultGroups = this.getDefaultGroups();
    if (groups) {
      return groups.map(g => {
        if (typeof g === 'string') {
          var _defaultGroups$g;
          return {
            category: g,
            title: ((_defaultGroups$g = defaultGroups[g]) === null || _defaultGroups$g === void 0 ? void 0 : _defaultGroups$g.title) || g
          };
        }
        return g;
      }).filter(g => g);
    }
    return [defaultGroups.general, defaultGroups.flowchart, defaultGroups.orgChart, defaultGroups.containers];
  }
};
var _default = exports.default = DiagramToolboxManager;