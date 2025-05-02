import { createFragment, createComponentVNode } from "inferno";
/* eslint-disable
  @typescript-eslint/no-non-null-assertion,
  spellcheck/spell-checker
*/
import { off, on } from '../../../../../common/core/events';
import { withKeyDownHandler } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { Component, createRef } from 'inferno';
import { Toolbar } from '../inferno_wrappers/toolbar';
const ToolbarComponent = withKeyDownHandler(Toolbar);
export class ToolbarView extends Component {
  constructor() {
    super(...arguments);
    this.containerRef = createRef();
    this.onContextMenu = event => {
      var _this$props$showConte, _this$props;
      (_this$props$showConte = (_this$props = this.props).showContextMenu) === null || _this$props$showConte === void 0 || _this$props$showConte.call(_this$props, event);
    };
  }
  componentDidMount() {
    on(this.containerRef.current, 'dxcontextmenu', this.onContextMenu);
  }
  componentWillUnmount() {
    off(this.containerRef.current, 'dxcontextmenu', this.onContextMenu);
  }
  render() {
    const {
      visible,
      items,
      disabled,
      multiline
    } = this.props;
    if (!visible) {
      return createFragment();
    }
    return createComponentVNode(2, ToolbarComponent, {
      "elementRef": this.containerRef,
      "visible": visible,
      "items": items,
      "disabled": disabled,
      "multiline": multiline,
      "keyDownConfig": {
        'F10+shift': event => {
          var _this$props$showConte2, _this$props2;
          (_this$props$showConte2 = (_this$props2 = this.props).showContextMenu) === null || _this$props$showConte2 === void 0 || _this$props$showConte2.call(_this$props2, event);
        }
      }
    });
  }
}