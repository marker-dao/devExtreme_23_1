import { createVNode } from "inferno";
import $ from '../../../../../core/renderer';
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/base_component';
import { createRef } from 'inferno';
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function TemplateWrapper(template) {
  return class Template extends BaseInfernoComponent {
    constructor() {
      super(...arguments);
      this.ref = createRef();
    }
    renderTemplate() {
      $(this.ref.current).empty();
      template.render({
        container: $(this.ref.current),
        model: this.props
      });
    }
    render() {
      return createVNode(1, "div", null, null, 1, null, null, this.ref);
    }
    componentDidUpdate() {
      this.renderTemplate();
    }
    componentDidMount() {
      this.renderTemplate();
    }
  };
}