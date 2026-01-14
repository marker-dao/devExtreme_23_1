import { createVNode } from "inferno";
import { Component } from 'inferno';
import { CLASSES as BASE_CLASSES } from '../const';
const CLASSES = Object.assign({}, BASE_CLASSES, {
  container: 'dx-gridbase-a11y-status-container'
});
export class A11yStatusContainer extends Component {
  render() {
    return createVNode(1, "div", `${CLASSES.container} ${CLASSES.excludeFlexBox}`, this.props.statusText ?? '', 0, {
      "role": 'status'
    });
  }
}