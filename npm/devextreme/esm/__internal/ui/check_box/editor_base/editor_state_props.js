/**
* DevExtreme (esm/__internal/ui/check_box/editor_base/editor_state_props.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../../core/devices';
export const defaultEditorStateProps = {
  hoverStateEnabled: true,
  activeStateEnabled: true,
  focusStateEnabled: devices.real().deviceType === 'desktop' && !devices.isSimulator()
};
