/**
* DevExtreme (cjs/__internal/core/state_manager/utils.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _utils = require("./dev/utils");
(0, _globals.describe)('deepCopy', () => {
  (0, _globals.it)('should create a deep copy of an object', () => {
    const original = {
      a: 1,
      b: {
        c: 2
      }
    };
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).toEqual(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.b).not.toBe(original.b);
  });
  (0, _globals.it)('should create a deep copy of an array', () => {
    const original = [1, 2, [3, 4]];
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).toEqual(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy[2]).not.toBe(original[2]);
  });
  (0, _globals.it)('should handle Date objects', () => {
    const original = new Date('2023-01-01');
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).toEqual(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.getTime()).toBe(original.getTime());
  });
  (0, _globals.it)('should handle RegExp objects', () => {
    const original = /test/gi;
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).toEqual(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.source).toBe(original.source);
    (0, _globals.expect)(copy.flags).toBe(original.flags);
  });
  (0, _globals.it)('should handle nested objects and arrays', () => {
    const original = {
      a: [1, 2, {
        b: 3
      }],
      c: {
        d: [4, 5],
        e: {
          f: 6
        }
      }
    };
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).toEqual(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.a).not.toBe(original.a);
    (0, _globals.expect)(copy.a[2]).not.toBe(original.a[2]);
    (0, _globals.expect)(copy.c).not.toBe(original.c);
    (0, _globals.expect)(copy.c.d).not.toBe(original.c.d);
    (0, _globals.expect)(copy.c.e).not.toBe(original.c.e);
  });
  (0, _globals.it)('should handle circular references', () => {
    var _copy$b, _copy$d;
    const original = {
      a: 1
    };
    original.self = original;
    original.b = {
      c: original
    };
    original.d = [original];
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.a).toBe(1);
    (0, _globals.expect)(copy.self).toBe(copy);
    (0, _globals.expect)((_copy$b = copy.b) === null || _copy$b === void 0 ? void 0 : _copy$b.c).toBe(copy);
    (0, _globals.expect)((_copy$d = copy.d) === null || _copy$d === void 0 ? void 0 : _copy$d[0]).toBe(copy);
  });
  (0, _globals.it)('should handle circular references in arrays', () => {
    var _copy$items, _copy$items2, _copy$items3;
    const original = {
      id: 1
    };
    const child = {
      id: 2
    };
    // Create circular reference: parent -> child -> parent
    original.items = [child];
    child.items = [original];
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.id).toBe(1);
    (0, _globals.expect)(copy.items).not.toBe(original.items);
    (0, _globals.expect)((_copy$items = copy.items) === null || _copy$items === void 0 ? void 0 : _copy$items[0]).not.toBe(original.items[0]);
    (0, _globals.expect)((_copy$items2 = copy.items) === null || _copy$items2 === void 0 ? void 0 : _copy$items2[0].id).toBe(2);
    (0, _globals.expect)((_copy$items3 = copy.items) === null || _copy$items3 === void 0 || (_copy$items3 = _copy$items3[0].items) === null || _copy$items3 === void 0 ? void 0 : _copy$items3[0]).toBe(copy); // Circular reference preserved
  });
  (0, _globals.it)('should handle complex nested circular references with arrays and objects', () => {
    const original = {
      name: 'root',
      children: [],
      parent: null
    };
    const child1 = {
      name: 'child1',
      parent: original,
      siblings: []
    };
    const child2 = {
      name: 'child2',
      parent: original,
      siblings: [child1]
    };
    child1.siblings = [child2];
    original.children = [child1, child2];
    const copy = (0, _utils.deepCopy)(original);
    (0, _globals.expect)(copy).not.toBe(original);
    (0, _globals.expect)(copy.name).toBe('root');
    (0, _globals.expect)(copy.children).not.toBe(original.children);
    (0, _globals.expect)(copy.children.length).toBe(2);
    // Check first child
    (0, _globals.expect)(copy.children[0]).not.toBe(original.children[0]);
    (0, _globals.expect)(copy.children[0].name).toBe('child1');
    (0, _globals.expect)(copy.children[0].parent).toBe(copy);
    // Check second child
    (0, _globals.expect)(copy.children[1]).not.toBe(original.children[1]);
    (0, _globals.expect)(copy.children[1].name).toBe('child2');
    (0, _globals.expect)(copy.children[1].parent).toBe(copy);
    // Check sibling references
    (0, _globals.expect)(copy.children[0].siblings[0]).toBe(copy.children[1]);
    (0, _globals.expect)(copy.children[1].siblings[0]).toBe(copy.children[0]);
  });
});
