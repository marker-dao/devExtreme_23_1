/**
* DevExtreme (esm/__internal/viz/tree_map/colorizing.discrete.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { addColorizer } from '../../viz/tree_map/colorizing';
function discreteColorizer(options, themeManager, root) {
  const palette = themeManager.createPalette(options.palette, {
    useHighlight: true,
    extensionMode: options.paletteExtensionMode,
    count: options.colorizeGroups ? getNodesCount(root) : getLeafsCount(root)
  });
  return (options.colorizeGroups ? discreteGroupColorizer : discreteLeafColorizer)(palette, root);
}
function getLeafsCount(root) {
  const allNodes = root.nodes.slice();
  let i;
  const ii = allNodes.length;
  let count = 0;
  let node;
  for (i = 0; i < ii; ++i) {
    node = allNodes[i];
    if (node.isNode()) {
      count = Math.max(count, getLeafsCount(node));
    } else {
      count += 1;
    }
  }
  return count;
}
function discreteLeafColorizer(palette) {
  const colors = palette.generateColors();
  return function (node) {
    return colors[node.index];
  };
}
function getNodesCount(root) {
  const allNodes = root.nodes.slice();
  let i;
  const ii = allNodes.length;
  let count = 0;
  let node;
  for (i = 0; i < ii; ++i) {
    node = allNodes[i];
    if (node.isNode()) {
      count += getNodesCount(node) + 1;
    }
  }
  return count;
}
function prepareDiscreteGroupColors(palette, root) {
  const colors = {};
  let allNodes = root.nodes.slice();
  let i;
  let ii = allNodes.length;
  let node;
  for (i = 0; i < ii; ++i) {
    node = allNodes[i];
    if (node.isNode()) {
      allNodes = allNodes.concat(node.nodes);
      ii = allNodes.length;
    } else if (!colors[node.parent._id]) {
      colors[node.parent._id] = palette.getNextColor();
    }
  }
  return colors;
}
function discreteGroupColorizer(palette, root) {
  const colors = prepareDiscreteGroupColors(palette, root);
  return function (node) {
    return colors[node._id];
  };
}
addColorizer('discrete', discreteColorizer);
export default discreteColorizer;
