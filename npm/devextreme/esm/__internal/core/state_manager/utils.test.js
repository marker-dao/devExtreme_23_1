/**
* DevExtreme (esm/__internal/core/state_manager/utils.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { deepCopy } from './dev/utils';
describe('deepCopy', () => {
  it('should create a deep copy of an object', () => {
    const original = {
      a: 1,
      b: {
        c: 2
      }
    };
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.b).not.toBe(original.b);
  });
  it('should create a deep copy of an array', () => {
    const original = [1, 2, [3, 4]];
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy[2]).not.toBe(original[2]);
  });
  it('should handle Date objects', () => {
    const original = new Date('2023-01-01');
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.getTime()).toBe(original.getTime());
  });
  it('should handle RegExp objects', () => {
    const original = /test/gi;
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.source).toBe(original.source);
    expect(copy.flags).toBe(original.flags);
  });
  it('should handle nested objects and arrays', () => {
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
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.a).not.toBe(original.a);
    expect(copy.a[2]).not.toBe(original.a[2]);
    expect(copy.c).not.toBe(original.c);
    expect(copy.c.d).not.toBe(original.c.d);
    expect(copy.c.e).not.toBe(original.c.e);
  });
  it('should handle circular references', () => {
    var _copy$b, _copy$d;
    const original = {
      a: 1
    };
    original.self = original;
    original.b = {
      c: original
    };
    original.d = [original];
    const copy = deepCopy(original);
    expect(copy).not.toBe(original);
    expect(copy.a).toBe(1);
    expect(copy.self).toBe(copy);
    expect((_copy$b = copy.b) === null || _copy$b === void 0 ? void 0 : _copy$b.c).toBe(copy);
    expect((_copy$d = copy.d) === null || _copy$d === void 0 ? void 0 : _copy$d[0]).toBe(copy);
  });
  it('should handle circular references in arrays', () => {
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
    const copy = deepCopy(original);
    expect(copy).not.toBe(original);
    expect(copy.id).toBe(1);
    expect(copy.items).not.toBe(original.items);
    expect((_copy$items = copy.items) === null || _copy$items === void 0 ? void 0 : _copy$items[0]).not.toBe(original.items[0]);
    expect((_copy$items2 = copy.items) === null || _copy$items2 === void 0 ? void 0 : _copy$items2[0].id).toBe(2);
    expect((_copy$items3 = copy.items) === null || _copy$items3 === void 0 || (_copy$items3 = _copy$items3[0].items) === null || _copy$items3 === void 0 ? void 0 : _copy$items3[0]).toBe(copy); // Circular reference preserved
  });
  it('should handle complex nested circular references with arrays and objects', () => {
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
    const copy = deepCopy(original);
    expect(copy).not.toBe(original);
    expect(copy.name).toBe('root');
    expect(copy.children).not.toBe(original.children);
    expect(copy.children.length).toBe(2);
    // Check first child
    expect(copy.children[0]).not.toBe(original.children[0]);
    expect(copy.children[0].name).toBe('child1');
    expect(copy.children[0].parent).toBe(copy);
    // Check second child
    expect(copy.children[1]).not.toBe(original.children[1]);
    expect(copy.children[1].name).toBe('child2');
    expect(copy.children[1].parent).toBe(copy);
    // Check sibling references
    expect(copy.children[0].siblings[0]).toBe(copy.children[1]);
    expect(copy.children[1].siblings[0]).toBe(copy.children[0]);
  });
});
