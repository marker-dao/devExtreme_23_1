/**
* DevExtreme (esm/__internal/ui/diagram/diagram.importer.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../ui/widget/ui.errors';
import DiagramDefault, * as Diagram from 'devexpress-diagram';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDiagram() {
  if (!DiagramDefault) {
    throw errors.Error('E1041', 'devexpress-diagram');
  }
  return Diagram;
}
