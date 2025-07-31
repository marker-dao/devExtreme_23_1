/**
* DevExtreme (esm/__internal/ui/tab_panel/item.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { noop } from '../../../core/utils/common';
import CollectionWidgetItem from '../../ui/collection/item';
export default class TabPanelItem extends CollectionWidgetItem {
  _renderWatchers() {
    this._startWatcher('badge', noop);
    super._renderWatchers();
  }
}
