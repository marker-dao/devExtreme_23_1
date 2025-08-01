/**
* DevExtreme (esm/__internal/grids/new/grid_core/data_controller/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @stylistic/object-curly-newline */
import { describe, expect } from '@jest/globals';
import each from 'jest-each';
import { getLocalLoadOptions, getStoreLoadOptions, normalizeLocalOptions, normalizeRemoteOptions } from './utils';
describe('normalizeRemoteOption', () => {
  describe('with non-object arg', () => {
    each`
            remoteOperations | isLocalStore | isCustomStore | expectedOperationOptions
            ${'auto'}        | ${true}      | ${true}       | ${{
      filtering: false,
      sorting: false,
      paging: false,
      grouping: false
    }}
            ${'auto'}        | ${false}     | ${true}       | ${{
      filtering: false,
      sorting: false,
      paging: false,
      grouping: false
    }}
            ${'auto'}        | ${true}      | ${false}      | ${{
      filtering: false,
      sorting: false,
      paging: false,
      grouping: false
    }}
            ${false}         | ${false}     | ${false}      | ${{
      filtering: false,
      sorting: false,
      paging: false,
      grouping: false
    }}
            ${true}          | ${false}     | ${false}      | ${{
      filtering: true,
      sorting: true,
      paging: true,
      grouping: true
    }}
    `.it('should calculate the operation options', _ref => {
      let {
        remoteOperations,
        isLocalStore,
        isCustomStore,
        expectedOperationOptions
      } = _ref;
      const result = normalizeRemoteOptions(remoteOperations, isLocalStore, isCustomStore);
      expect(result).toEqual(expectedOperationOptions);
    });
  });
  describe('with object arg', () => {
    each`
            remoteOperations                                      | isLocalStore | isCustomStore | expectedOperationOptions
            ${{
      filtering: true,
      sorting: false,
      paging: false
    }} | ${true}      | ${true}       | ${{
      filtering: true,
      sorting: false,
      paging: false
    }}
            ${{
      filtering: false,
      sorting: true,
      paging: false
    }} | ${true}      | ${true}       | ${{
      filtering: false,
      sorting: true,
      paging: false
    }}
            ${{
      filtering: false,
      sorting: false,
      paging: true
    }} | ${true}      | ${true}       | ${{
      filtering: false,
      sorting: false,
      paging: true
    }}
            ${{
      filtering: false,
      sorting: false,
      paging: false
    }}| ${true}      | ${true}       | ${{
      filtering: false,
      sorting: false,
      paging: false
    }}
    `.it('should leave the arg as is', _ref2 => {
      let {
        remoteOperations,
        isLocalStore,
        isCustomStore,
        expectedOperationOptions
      } = _ref2;
      const result = normalizeRemoteOptions(remoteOperations, isLocalStore, isCustomStore);
      expect(result).toEqual(expectedOperationOptions);
    });
  });
});
describe('normalizeLocalOption', () => {
  each`
          remoteOperations                                      | expectedOperationOptions
          ${{
    filtering: true,
    sorting: false,
    paging: false
  }} | ${{
    filtering: false,
    sorting: true,
    paging: true,
    grouping: true
  }}
          ${{
    filtering: false,
    sorting: true,
    paging: false
  }} | ${{
    filtering: true,
    sorting: false,
    paging: true,
    grouping: true
  }}
          ${{
    filtering: false,
    sorting: false,
    paging: true
  }} | ${{
    filtering: true,
    sorting: true,
    paging: false,
    grouping: true
  }}

          ${{
    filtering: true,
    sorting: true,
    paging: true
  }}   | ${{
    filtering: false,
    sorting: false,
    paging: false,
    grouping: true
  }}
          ${{
    filtering: false,
    sorting: false,
    paging: false
  }}| ${{
    filtering: true,
    sorting: true,
    paging: true,
    grouping: true
  }}
  `.it('should invert remoteOperations', _ref3 => {
    let {
      remoteOperations,
      expectedOperationOptions
    } = _ref3;
    const result = normalizeLocalOptions(remoteOperations);
    expect(result).toEqual(expectedOperationOptions);
  });
});
describe('getLocalLoadOptions', () => {
  each`
          originOptions                                         | localOperations        | expectedLoadOptions
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    filtering: true
  }} | ${{
    filter: 'test'
  }}
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    sorting: true
  }}   | ${{
    sort: 'asc'
  }}
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    paging: true
  }}    | ${{
    skip: 0,
    take: 20
  }}
  `.it('should convert local operation to load options', _ref4 => {
    let {
      originOptions,
      localOperations,
      expectedLoadOptions
    } = _ref4;
    const result = getLocalLoadOptions(originOptions, localOperations);
    expect(result).toEqual(expectedLoadOptions);
  });
});
describe('getStoreLoadOptions', () => {
  each`
          originOptions                                         | localOperations        | expectedLoadOptions
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    filtering: true
  }} | ${{
    sort: 'asc',
    skip: 0,
    take: 20
  }}
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    sorting: true
  }}   | ${{
    filter: 'test',
    skip: 0,
    take: 20
  }}
          ${{
    filter: 'test',
    sort: 'asc',
    skip: 0,
    take: 20
  }} | ${{
    paging: true
  }}    | ${{
    filter: 'test',
    sort: 'asc'
  }}
  `.it('should clear local operations from load options', _ref5 => {
    let {
      originOptions,
      localOperations,
      expectedLoadOptions
    } = _ref5;
    const result = getStoreLoadOptions(originOptions, localOperations);
    expect(result).toEqual(expectedLoadOptions);
  });
});
