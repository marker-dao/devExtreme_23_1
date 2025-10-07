/**
* DevExtreme (esm/__internal/viz/tree_map/tree_map.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../../viz/tree_map/tiling.squarified';
import '../../viz/tree_map/tiling.strip';
import '../../viz/tree_map/tiling.slice_and_dice';
import '../../viz/tree_map/tiling.rotated_slice_and_dice';
import '../../viz/tree_map/colorizing.discrete';
import '../../viz/tree_map/colorizing.gradient';
import '../../viz/tree_map/colorizing.range';
import '../../viz/tree_map/api';
import '../../viz/tree_map/hover';
import '../../viz/tree_map/selection';
import '../../viz/tree_map/tooltip';
import '../../viz/tree_map/tracker';
import '../../viz/tree_map/drilldown';
import '../../viz/tree_map/plain_data_source';
// PLUGINS_SECTION
import { plugin as pluginExport } from '../../viz/core/export';
import { plugin as pluginLoadIndicator } from '../../viz/core/loading_indicator';
import { plugin as pluginTitle } from '../../viz/core/title';
import dxTreeMap from '../../viz/tree_map/tree_map.base';
export default dxTreeMap;
dxTreeMap.addPlugin(pluginExport);
dxTreeMap.addPlugin(pluginTitle);
dxTreeMap.addPlugin(pluginLoadIndicator);
