"use strict";

var _globals = require("@jest/globals");
var _m_data_source = require("../../data/data_source/m_data_source");
var _m_custom_store = _interopRequireDefault(require("../../data/m_custom_store"));
var _resource_processor = require("./resource_processor");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const rooms = [{
  text: 'Room 1',
  id: 1,
  color: '#00af2c'
}, {
  text: 'Room 2',
  id: 2,
  color: '#56ca85'
}, {
  text: 'Room 3',
  id: 3,
  color: '#8ecd3c'
}];
const roomResource = {
  fieldExpr: 'roomId',
  dataSource: rooms,
  label: 'Room'
};
const owners = [{
  text: 'Samantha Bright',
  id: 1,
  color: '#727bd2'
}, {
  text: 'John Heart',
  id: 2,
  color: '#32c9ed'
}, {
  text: 'Todd Hoffman',
  id: 3,
  color: '#2a7ee4'
}, {
  text: 'Sandra Johnson',
  id: 4,
  color: '#7b49d3'
}];
const ownerResource = {
  fieldExpr: 'ownerId',
  allowMultiple: true,
  dataSource: owners,
  label: 'Owner'
};
const appointment = {
  text: 'Website Re-Design Plan',
  startDate: new Date(2021, 6, 6),
  endDate: new Date(2021, 6, 7)
};
(0, _globals.describe)('ResourceProcessor', () => {
  (0, _globals.describe)('Array', () => {
    (0, _globals.it)('should process empty resources with empty appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(appointment)).toEqual([]);
    });
    (0, _globals.it)('should process resource with empty text', async () => {
      const processor = new _resource_processor.ResourceProcessor([_extends({}, roomResource, {
        label: undefined
      })]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 1
      }))).toEqual([{
        label: undefined,
        values: ['Room 1']
      }]);
    });
    (0, _globals.it)('should process two resources with empty appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([roomResource, ownerResource]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(appointment)).toEqual([]);
    });
    (0, _globals.it)('should process single id resource with appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([roomResource, ownerResource]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 1
      }))).toEqual([{
        label: 'Room',
        values: ['Room 1']
      }]);
    });
    (0, _globals.it)('should process multiple id resource with appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([roomResource, ownerResource]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: [1, 2]
      }))).toEqual([{
        label: 'Room',
        values: ['Room 1', 'Room 2']
      }]);
    });
    (0, _globals.it)('should process resources with appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([roomResource, ownerResource]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: [1, 2],
        ownerId: 2
      }))).toEqual([{
        label: 'Room',
        values: ['Room 1', 'Room 2']
      }, {
        label: 'Owner',
        values: ['John Heart']
      }]);
    });
    (0, _globals.it)('should process resources with several appointments', async () => {
      const processor = new _resource_processor.ResourceProcessor([roomResource, ownerResource]);
      (0, _globals.expect)(await Promise.all([processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: [1, 2],
        ownerId: 2
      })), processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: [2, 3],
        ownerId: 1
      }))])).toEqual([[{
        label: 'Room',
        values: ['Room 1', 'Room 2']
      }, {
        label: 'Owner',
        values: ['John Heart']
      }], [{
        label: 'Room',
        values: ['Room 2', 'Room 3']
      }, {
        label: 'Owner',
        values: ['Samantha Bright']
      }]]);
    });
    (0, _globals.it)('should process field expressions of resources with appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([{
        fieldExpr: 'OwnerId',
        valueExpr: 'Id',
        displayExpr: 'Text',
        label: 'Owner',
        dataSource: [{
          Text: 'Samantha Bright',
          Id: 1
        }, {
          Text: 'John Heart',
          Id: 2
        }, {
          Text: 'Todd Hoffman',
          Id: 3
        }, {
          Text: 'Sandra Johnson',
          Id: 4
        }]
      }]);
      (0, _globals.expect)(await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        OwnerId: [1, 3]
      }))).toEqual([{
        label: 'Owner',
        values: ['Samantha Bright', 'Todd Hoffman']
      }]);
    });
  });
  (0, _globals.describe)('DataSource', () => {
    (0, _globals.it)('should load resources once', async () => {
      let loadCount = 0;
      const processor = new _resource_processor.ResourceProcessor([{
        fieldExpr: 'roomId',
        dataSource: new _m_data_source.DataSource({
          store: new _m_custom_store.default({
            load: () => {
              loadCount += 1;
              return rooms;
            }
          })
        }),
        label: 'Room'
      }]);
      await Promise.all([processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 1
      })), processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 2
      }))]);
      await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 3
      }));
      await processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 4
      }));
      (0, _globals.expect)(loadCount).toBe(1);
    });
    (0, _globals.it)('should process resources with appointment', async () => {
      const processor = new _resource_processor.ResourceProcessor([{
        fieldExpr: 'roomId',
        dataSource: new _m_data_source.DataSource({
          store: new _m_custom_store.default({
            load: () => rooms
          })
        }),
        label: 'Room'
      }]);
      (0, _globals.expect)(await Promise.all([processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 1
      })), processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: [2, 3]
      })), processor.getAppointmentResourcesValues(_extends({}, appointment, {
        roomId: 3
      }))])).toEqual([[{
        label: 'Room',
        values: ['Room 1']
      }], [{
        label: 'Room',
        values: ['Room 2', 'Room 3']
      }], [{
        label: 'Room',
        values: ['Room 3']
      }]]);
    });
  });
});