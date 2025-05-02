import devices from '../../../../core/devices';
import {
// @ts-expect-error
getCurrentScreenFactor, hasWindow } from '../../../../core/utils/window';
export const isSmallScreen = () => {
  const screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
  return devices.real().deviceType === 'phone' || screenFactor === 'xs';
};