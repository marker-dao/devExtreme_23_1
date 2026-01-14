import { createComponentVNode, normalizeProps } from "inferno";
import { getWindow } from '../../../../../core/utils/window';
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { CommonPropsContext } from '../core/common_props_context';
import { LoadPanel as LoadPanelBase } from '../inferno_wrappers/load_panel';
export class LoadPanel extends BaseInfernoComponent {
  calculatePosition(rootElement) {
    const window = getWindow();
    if (rootElement.offsetHeight > window.innerHeight) {
      return {
        of: window,
        boundary: rootElement,
        collision: 'fit'
      };
    }
    return {
      of: rootElement
    };
  }
  render() {
    const {
      rootElementRef
    } = this.context[CommonPropsContext.id];
    const loadPanelProperties = Object.assign({
      container: rootElementRef.current,
      position: this.calculatePosition(rootElementRef.current)
    }, this.props);
    return normalizeProps(createComponentVNode(2, LoadPanelBase, Object.assign({}, loadPanelProperties)));
  }
}