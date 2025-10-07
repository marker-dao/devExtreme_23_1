/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/scrollable.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createFragment } from "inferno";
import dxScrollable from '../../../../../ui/scroll_view/ui.scrollable';
import { createPortal } from 'inferno';
import { InfernoWrapper } from './widget_wrapper';
export class Scrollable extends InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  render() {
    return createFragment([super.render(), this.contentRef.current && createPortal(this.props.children, this.contentRef.current)], 0);
  }
  getComponentFabric() {
    return dxScrollable;
  }
  updateScrollTop() {
    var _this$component;
    (_this$component = this.component) === null || _this$component === void 0 || _this$component.scrollTo(this.props.scrollTop);
  }
  componentDidMount() {
    if (this.props.useNative === undefined) {
      // @ts-expect-error
      delete this.props.useNative;
    }
    super.componentDidMount();
    // @ts-expect-error
    this.contentRef.current = this.component.$content().get(0);
    this.setState({});
    this.updateScrollTop();
  }
  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    this.updateScrollTop();
  }
  clientHeight() {
    return this.component.clientHeight();
  }
}
