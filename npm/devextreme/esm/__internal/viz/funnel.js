/**
* DevExtreme (esm/__internal/viz/funnel.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { plugin as pluginLegend } from '../viz/components/legend';
import { plugin as pluginExport } from '../viz/core/export';
import { plugin as pluginLoadingIndicator } from '../viz/core/loading_indicator';
import { plugin as pluginTitle } from '../viz/core/title';
import dxFunnel from '../viz/funnel/funnel';
import { plugin as pluginLabel } from '../viz/funnel/label';
import { plugin as pluginTooltip } from '../viz/funnel/tooltip';
import { plugin as pluginTracker } from '../viz/funnel/tracker';
dxFunnel.addPlugin(pluginLabel);
dxFunnel.addPlugin(pluginExport);
dxFunnel.addPlugin(pluginTitle);
dxFunnel.addPlugin(pluginLegend);
dxFunnel.addPlugin(pluginTracker);
dxFunnel.addPlugin(pluginTooltip);
dxFunnel.addPlugin(pluginLoadingIndicator);
export default dxFunnel;
