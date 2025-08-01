/**
* DevExtreme (esm/common/data.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import applyChanges from './data/apply_changes';
import ArrayStore from './data/array_store';
import { CustomStore, isGroupItemsArray, isItemsArray, isLoadResultObject } from './data/custom_store';
import DataSource from './data/data_source';
import EndpointSelector from './data/endpoint_selector';
import { errorHandler, setErrorHandler } from './data/errors';
import LocalStore from './data/local_store';
import query from './data/query';
import { base64_encode, compileGetter, compileSetter } from './data/utils';
import DataHelperMixin from '../__internal/data/m_data_helper';
import ODataContext from './data/odata/context';
import ODataStore from './data/odata/store';
import { EdmLiteral, keyConverters } from './data/odata/utils';
export { applyChanges, ArrayStore, CustomStore, isGroupItemsArray, isItemsArray, isLoadResultObject, DataSource, EndpointSelector, errorHandler, setErrorHandler, LocalStore, query, base64_encode, compileGetter, compileSetter, DataHelperMixin, ODataContext, ODataStore, EdmLiteral, keyConverters };
