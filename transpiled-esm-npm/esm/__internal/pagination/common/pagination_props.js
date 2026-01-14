import { BasePaginationDefaultProps } from './base_pagination_props';
export const PaginationDefaultProps = Object.assign({}, BasePaginationDefaultProps, {
  pageSize: 5,
  pageIndex: 1,
  pageIndexChangedInternal: () => {},
  pageSizeChangedInternal: () => {}
});