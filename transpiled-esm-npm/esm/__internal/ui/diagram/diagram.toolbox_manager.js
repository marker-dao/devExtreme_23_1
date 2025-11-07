import messageLocalization from '../../../common/core/localization/message';
const DiagramToolboxManager = {
  getDefaultGroups() {
    if (!this._groups) {
      this._groups = {
        general: {
          category: 'general',
          title: messageLocalization.format('dxDiagram-categoryGeneral')
        },
        flowchart: {
          category: 'flowchart',
          title: messageLocalization.format('dxDiagram-categoryFlowchart')
        },
        orgChart: {
          category: 'orgChart',
          title: messageLocalization.format('dxDiagram-categoryOrgChart')
        },
        containers: {
          category: 'containers',
          title: messageLocalization.format('dxDiagram-categoryContainers')
        },
        custom: {
          category: 'custom',
          title: messageLocalization.format('dxDiagram-categoryCustom')
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
export default DiagramToolboxManager;