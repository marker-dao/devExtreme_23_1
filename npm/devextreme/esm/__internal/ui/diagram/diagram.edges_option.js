/**
* DevExtreme (esm/__internal/ui/diagram/diagram.edges_option.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ItemsOption from '../../ui/diagram/diagram.items_option';
class EdgesOption extends ItemsOption {
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _getKeyExpr() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._diagramWidget._createOptionGetter('edges.keyExpr');
  }
}
export default EdgesOption;
