/**
* DevExtreme (esm/__internal/ui/speed_dial_action/m_speed_dial_action.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import Guid from '../../../core/guid';
import { extend } from '../../../core/utils/extend';
import readyCallbacks from '../../../core/utils/ready_callbacks';
import swatchContainer from '../../../ui/widget/swatch_container';
import Widget from '../../core/widget/widget';
import { disposeAction, initAction } from './m_speed_dial_main_item';
const {
  getSwatchContainer
} = swatchContainer;
const ready = readyCallbacks.add;
class SpeedDialAction extends Widget {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      icon: '',
      onClick: null,
      label: '',
      visible: true,
      index: 0,
      onContentReady: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      animation: {
        show: {
          type: 'pop',
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          from: {
            scale: 0,
            opacity: 0
          },
          to: {
            scale: 1,
            opacity: 1
          }
        },
        hide: {
          type: 'pop',
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          from: {
            scale: 1,
            opacity: 1
          },
          to: {
            scale: 0,
            opacity: 0
          }
        }
      },
      id: new Guid()
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onClick':
      case 'icon':
      case 'label':
      case 'visible':
      case 'index':
      case 'onInitializing':
        initAction(this);
        break;
      case 'animation':
      case 'id':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _render() {
    this._toggleVisibility(false);
    if (!getSwatchContainer(this.$element())) {
      ready(() => initAction(this));
    } else {
      initAction(this);
    }
  }
  _dispose() {
    disposeAction(this._options.silent('id'));
    super._dispose();
  }
}
registerComponent('dxSpeedDialAction', SpeedDialAction);
export default SpeedDialAction;
