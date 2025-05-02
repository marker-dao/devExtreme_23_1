import { normalizeColumns, preNormalizeColumns } from './utils';
export function normalizeColumn(column) {
  return normalizeColumns(preNormalizeColumns([column]),
  // @ts-expect-error
  v => v)[0];
}