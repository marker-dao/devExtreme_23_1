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