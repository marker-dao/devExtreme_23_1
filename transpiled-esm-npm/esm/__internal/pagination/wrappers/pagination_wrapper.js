import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["pageSize", "pageIndex", "itemCount"];
import { ComponentWrapper } from '../../core/r1/component_wrapper';
import { validateOptions } from '../utils/validation_utils';
export class PaginationWrapper extends ComponentWrapper {
  _optionChanged(args) {
    switch (args.name) {
      case 'pageIndex':
        {
          const pageIndexChanged = this.option('pageIndexChanged');
          if (pageIndexChanged) {
            pageIndexChanged(args.value);
          }
          break;
        }
      case 'pageSize':
        {
          const pageSizeChanged = this.option('pageSizeChanged');
          if (pageSizeChanged) {
            pageSizeChanged(args.value);
          }
          break;
        }
      default:
        break;
    }
    super._optionChanged(args);
  }
  getPageCount() {
    return this.option('pageCount');
  }
  _validateOptions(options) {
    if (options._skipValidation || this.option('_skipValidation')) {
      return options;
    }
    const initialOptions = super._validateOptions(options);
    let {
        pageSize,
        pageIndex,
        itemCount
        // eslint-disable-next-line prefer-const
      } = initialOptions,
      rest = _objectWithoutPropertiesLoose(initialOptions, _excluded);
    if (pageSize === undefined) {
      pageSize = this.option('pageSize');
    }
    if (pageIndex === undefined) {
      pageIndex = this.option('pageIndex');
    }
    if (itemCount === undefined) {
      itemCount = this.option('itemCount');
    }
    const validatedOptions = validateOptions(pageSize, pageIndex, itemCount);
    return _extends({}, rest, validatedOptions);
  }
}