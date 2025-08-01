/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/popup/buttons.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { current, isFluent } from '../../../../../../ui/themes';
export function getSaveButtonConfig(props) {
  const config = {
    toolbar: 'bottom',
    location: 'after',
    widget: 'dxButton',
    options: {
      text: props.text,
      onClick: props.onSave
    }
  };
  if (isFluent(current())) {
    config.options.stylingMode = 'contained';
    config.options.type = 'default';
  }
  return config;
}
export function getCancelButtonConfig(props) {
  const config = {
    toolbar: 'bottom',
    location: 'after',
    widget: 'dxButton',
    options: {
      text: props.text,
      onClick: props.onCancel
    }
  };
  if (isFluent(current())) {
    config.options.stylingMode = 'outlined';
  }
  return config;
}
