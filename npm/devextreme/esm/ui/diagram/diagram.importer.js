/**
* DevExtreme (esm/ui/diagram/diagram.importer.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Errors from '../widget/ui.errors';
import DiagramDefault, * as Diagram from 'devexpress-diagram';
export function getDiagram() {
  if (!DiagramDefault) {
    throw Errors.Error('E1041', 'devexpress-diagram');
  }
  return Diagram;
}
