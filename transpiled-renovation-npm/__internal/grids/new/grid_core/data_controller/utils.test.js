"use strict";

var _globals = require("@jest/globals");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @stylistic/object-curly-newline */

(0, _globals.describe)('normalizeRemoteOption', () => {
  (0, _globals.describe)('with non-object arg', () => {
    (0, _jestEach.default)`
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
      const result = (0, _utils.normalizeRemoteOptions)(remoteOperations, isLocalStore, isCustomStore);
      (0, _globals.expect)(result).toEqual(expectedOperationOptions);
    });
  });
  (0, _globals.describe)('with object arg', () => {
    (0, _jestEach.default)`
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
      const result = (0, _utils.normalizeRemoteOptions)(remoteOperations, isLocalStore, isCustomStore);
      (0, _globals.expect)(result).toEqual(expectedOperationOptions);
    });
  });
});
(0, _globals.describe)('normalizeLocalOption', () => {
  (0, _jestEach.default)`
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
    const result = (0, _utils.normalizeLocalOptions)(remoteOperations);
    (0, _globals.expect)(result).toEqual(expectedOperationOptions);
  });
});
(0, _globals.describe)('getLocalLoadOptions', () => {
  (0, _jestEach.default)`
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
    const result = (0, _utils.getLocalLoadOptions)(originOptions, localOperations);
    (0, _globals.expect)(result).toEqual(expectedLoadOptions);
  });
});
(0, _globals.describe)('getStoreLoadOptions', () => {
  (0, _jestEach.default)`
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
    const result = (0, _utils.getStoreLoadOptions)(originOptions, localOperations);
    (0, _globals.expect)(result).toEqual(expectedLoadOptions);
  });
});