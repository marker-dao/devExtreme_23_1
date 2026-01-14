/**
* DevExtreme (esm/__internal/ui/diagram/diagram.nodes_option.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ItemsOption from '../../ui/diagram/diagram.items_option';
class NodesOption extends ItemsOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('nodes.keyExpr');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItemsExpr() {
    return this._diagramWidget._createOptionGetter('nodes.itemsExpr');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getContainerChildrenExpr() {
    return this._diagramWidget._createOptionGetter('nodes.containerChildrenExpr');
  }
}
export default NodesOption;
