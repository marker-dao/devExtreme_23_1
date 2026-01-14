/**
* DevExtreme (esm/__internal/ui/html_editor/utils/small_screen.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../../core/devices';
import {
// @ts-expect-error
getCurrentScreenFactor, hasWindow } from '../../../../core/utils/window';
export const isSmallScreen = () => {
  const screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
  return devices.real().deviceType === 'phone' || screenFactor === 'xs';
};
