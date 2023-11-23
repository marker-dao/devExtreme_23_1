/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_device_pixel_ratio.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow, hasWindow } from '../../../../core/utils/window';
export function getDevicePixelRatio() {
  return hasWindow() ? getWindow().devicePixelRatio : 1;
}
