/**
* DevExtreme (esm/ui/diagram/diagram.edges_option.js)
* Version: 23.2.0
* Build date: Thu Aug 17 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ItemsOption from './diagram.items_option';
class EdgesOption extends ItemsOption {
  _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('edges.keyExpr');
  }
}
export default EdgesOption;