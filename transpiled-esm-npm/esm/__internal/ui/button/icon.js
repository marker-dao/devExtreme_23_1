import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment } from "inferno";
import { getImageSourceType } from '../../../core/utils/icon';
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index'; // with short path tests cant run
import { getTemplate } from '../../core/r1/utils/index';
import { combineClasses } from '../../core/utils/combine_classes';
export const defaultIconProps = {
  position: 'left',
  source: ''
};
export class Icon extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get sourceType() {
    return getImageSourceType(this.props.source);
  }
  get cssClass() {
    return this.props.position !== 'left' ? 'dx-icon-right' : '';
  }
  get iconClassName() {
    const generalClasses = {
      'dx-icon': true,
      [this.cssClass]: !!this.cssClass
    };
    const {
      source
    } = this.props;
    if (this.sourceType === 'dxIcon') {
      return combineClasses(_extends({}, generalClasses, {
        [`dx-icon-${source}`]: true
      }));
    }
    if (this.sourceType === 'fontIcon') {
      return combineClasses(_extends({}, generalClasses, {
        [String(source)]: !!source
      }));
    }
    if (this.sourceType === 'image') {
      return combineClasses(generalClasses);
    }
    if (this.sourceType === 'svg') {
      return combineClasses(_extends({}, generalClasses, {
        'dx-svg-icon': true
      }));
    }
    return '';
  }
  render() {
    const {
      iconClassName,
      props,
      sourceType
    } = this;
    const IconTemplate = getTemplate(props.iconTemplate);
    return createFragment([sourceType === 'dxIcon' && createVNode(1, "i", iconClassName), sourceType === 'fontIcon' && createVNode(1, "i", iconClassName), sourceType === 'image' && createVNode(1, "img", iconClassName, null, 1, {
      "alt": "",
      "src": props.source
    }), IconTemplate && createVNode(1, "i", iconClassName, IconTemplate({}), 0)], 0);
  }
}
Icon.defaultProps = defaultIconProps;