import { createVNode, createFragment } from "inferno";
import $ from '../../../../../../core/renderer';
import { Component, createRef } from 'inferno';
import { CLASSES } from '../../const';
export class FilterPanelComponent extends Component {
  constructor() {
    super(...arguments);
    this.filterPanelRef = createRef();
    this.filterBuilderRef = createRef();
  }
  render() {
    return createFragment([createVNode(1, "div", null, null, 1, null, null, this.filterPanelRef), createVNode(1, "div", CLASSES.excludeFlexBox, null, 1, null, null, this.filterBuilderRef)], 4);
  }
  componentDidMount() {
    this.props.oldFilterPanelView.render($(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render($(this.filterBuilderRef.current));
  }
  componentDidUpdate() {
    this.props.oldFilterPanelView.render($(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render($(this.filterBuilderRef.current));
  }
}