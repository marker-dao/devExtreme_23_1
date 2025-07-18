/**
* DevExtreme (esm/__internal/grids/new/grid_core/core/view.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-classes-per-file */
import { effect } from '@preact/signals-core';
import { infernoRenderer } from '../../../../core/m_inferno_renderer';
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/base_component';
import { hasWindow } from '../../../../core/utils/m_window';
export class View {
  constructor() {
    this.firstRender = true;
  }
  render(root) {
    this.root = root;
    const ViewComponent = this.component;
    const props = this.getProps();
    return effect(() => {
      this.props = props.value;
      const content = normalizeProps(createComponentVNode(2, ViewComponent, _extends({}, props.value)));
      infernoRenderer.renderIntoContainer(content, root, !this.firstRender);
      this.firstRender = false;
    });
  }
  asInferno() {
    // eslint-disable-next-line no-return-assign
    return this.inferno ?? (this.inferno = this._asInferno());
  }
  _asInferno() {
    const view = this;
    return class InfernoView extends BaseInfernoComponent {
      constructor() {
        super();
        const props = view.getProps();
        this.unsubscribe = effect(() => {
          view.props = props.value;
          this.state ?? (this.state = {
            props: props.value
          });
          if (this.state.props !== props.value && hasWindow()) {
            this.setState({
              props: props.value
            });
          }
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const ViewComponent = view.component;
        return normalizeProps(createComponentVNode(2, ViewComponent, _extends({}, this.state.props)));
      }
    };
  }
}
