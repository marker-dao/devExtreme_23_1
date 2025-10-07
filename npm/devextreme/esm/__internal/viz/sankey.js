/**
* DevExtreme (esm/__internal/viz/sankey.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { plugin as pluginExport } from '../viz/core/export';
import { plugin as pluginLoadingIndicator } from '../viz/core/loading_indicator';
import { plugin as pluginTitle } from '../viz/core/title';
import { plugin as pluginTooltip } from '../viz/core/tooltip';
import dxSankey from '../viz/sankey/sankey';
import { setTooltipCustomOptions } from '../viz/sankey/tooltip';
import { plugin as pluginTracker } from '../viz/sankey/tracker';
dxSankey.addPlugin(pluginExport);
dxSankey.addPlugin(pluginTitle);
dxSankey.addPlugin(pluginTracker);
dxSankey.addPlugin(pluginLoadingIndicator);
dxSankey.addPlugin(pluginTooltip);
setTooltipCustomOptions(dxSankey);
export default dxSankey;
