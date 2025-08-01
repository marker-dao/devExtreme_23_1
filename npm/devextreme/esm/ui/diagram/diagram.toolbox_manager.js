/**
* DevExtreme (esm/ui/diagram/diagram.toolbox_manager.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../common/core/localization/message';
const DiagramToolboxManager = {
  getDefaultGroups() {
    return this._groups || (this._groups = {
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
export default DiagramToolboxManager;
