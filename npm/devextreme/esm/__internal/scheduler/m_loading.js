/**
* DevExtreme (esm/__internal/scheduler/m_loading.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { Deferred } from '../../core/utils/deferred';
import { value as viewPort } from '../../core/utils/view_port';
import LoadPanel from '../../ui/load_panel';
let loading = null;
const createLoadPanel = function (options) {
  return new LoadPanel($('<div>').appendTo(options && options.container || viewPort()), options);
};
const removeLoadPanel = function () {
  if (!loading) {
    return;
  }
  loading.$element().remove();
  loading = null;
};
export function show(options) {
  removeLoadPanel();
  loading = createLoadPanel(options);
  return loading.show();
}
export function hide() {
  // hot fix for case without viewport
  if (!loading) {
    // @ts-expect-error
    return new Deferred().resolve();
  }
  return loading.hide().done(removeLoadPanel).promise();
}
