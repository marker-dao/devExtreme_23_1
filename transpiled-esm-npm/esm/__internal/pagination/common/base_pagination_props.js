import { BaseWidgetDefaultProps } from '../../core/r1/base_props';
import messageLocalization from '../../../common/core/localization/message';
export const BasePaginationDefaultProps = Object.assign({}, BaseWidgetDefaultProps, {
  isGridCompatibilityMode: false,
  showInfo: false,
  displayMode: 'adaptive',
  maxPagesCount: 10,
  pageCount: 1,
  visible: true,
  hasKnownLastPage: true,
  pagesNavigatorVisible: 'auto',
  showPageSizeSelector: 'auto',
  allowedPageSizes: [5, 10],
  showNavigationButtons: false,
  itemCount: 1,
  label: messageLocalization.format('dxPagination-ariaLabel')
});