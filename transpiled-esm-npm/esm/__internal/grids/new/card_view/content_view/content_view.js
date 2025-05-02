import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
import { ContentView as ContentViewBase } from '../../../../grids/new/grid_core/content_view/content_view';
import { Component } from 'inferno';
import { Content } from './content/content';
export class ContentView extends Component {
  render() {
    return normalizeProps(createComponentVNode(2, ContentViewBase, _extends({}, this.props, {
      children: normalizeProps(createComponentVNode(2, Content, _extends({}, this.props.contentProps)))
    })));
  }
}