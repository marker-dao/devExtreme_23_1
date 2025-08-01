/**
* DevExtreme (exporter/export_load_panel.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @type object
 * @namespace DevExpress
 */
export interface ExportLoadPanel {
  /**
   * @docid
   * @default true
   */
  enabled?: boolean;
  /**
   * @docid
   * @default "Exporting..."
   */
  text?: string;
  /**
   * @docid
   * @default 200
   */
  width?: number;
  /**
   * @docid
   * @default 90
   */
  height?: number;
  /**
   * @docid
   * @default true
   */
  showIndicator?: boolean;
  /**
   * @docid
   * @default ""
   */
  indicatorSrc?: string;
  /**
   * @docid
   * @default true
   */
  showPane?: boolean;
  /**
   * @docid
   * @default false
   */
  shading?: boolean;
  /**
   * @docid
   * @default ''
   */
  shadingColor?: string;
}
