/**
* DevExtreme (esm/__internal/grids/tree_list/module_core.js)
* Version: 23.1.1
* Build date: Mon May 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import modules from '../../../ui/grid_core/ui.grid_core.modules';
export default extend({}, modules, {
  modules: [],
  foreachNodes(nodes, callBack, ignoreHasChildren) {
    for (var i = 0; i < nodes.length; i++) {
      if (callBack(nodes[i]) !== false && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
        this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren);
      }
    }
  }
});
