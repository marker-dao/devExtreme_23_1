/**
* DevExtreme (esm/data/query.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { queryImpl } from './query_implementation';
var query = function query() {
  var impl = Array.isArray(arguments[0]) ? 'array' : 'remote';
  return queryImpl[impl].apply(this, arguments);
};
export default query;
