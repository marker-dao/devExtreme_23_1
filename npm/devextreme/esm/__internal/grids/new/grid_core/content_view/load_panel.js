/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/load_panel.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
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
    const loadPanelProperties = _extends({
      container: rootElementRef.current,
      position: this.calculatePosition(rootElementRef.current)
    }, this.props);
    return normalizeProps(createComponentVNode(2, LoadPanelBase, _extends({}, loadPanelProperties)));
  }
}
