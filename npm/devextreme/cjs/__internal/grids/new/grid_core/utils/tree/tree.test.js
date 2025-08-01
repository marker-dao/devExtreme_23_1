/**
* DevExtreme (cjs/__internal/grids/new/grid_core/utils/tree/tree.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _tree = require("./tree");
(0, _globals.describe)('OptionsController', () => {
  (0, _globals.describe)('TreeUtils', () => {
    (0, _globals.describe)('shallowCopyTree', () => {
      (0, _globals.it)('should shallow copy array', () => {
        const data = ['A', 'B', {
          a: 1,
          b: 2
        }, 3, () => {}];
        const result = (0, _tree.shallowCopyTree)(data);
        (0, _globals.expect)(result).not.toBe(data);
        (0, _globals.expect)(result).toStrictEqual(data);
      });
      (0, _globals.it)('should shallow copy object', () => {
        const data = {
          A: 1,
          ref: {
            a: 1,
            b: 2
          },
          fn: () => {}
        };
        const result = (0, _tree.shallowCopyTree)(data);
        (0, _globals.expect)(result).not.toBe(data);
        (0, _globals.expect)(result).toStrictEqual(data);
      });
    });
    (0, _globals.describe)('deepCopyTreeNode', () => {
      (0, _globals.it)('should deep copy array', () => {
        const data = [{
          a: {
            b: 'value'
          }
        }];
        const result = (0, _tree.deepCopyTreeNode)(data);
        (0, _globals.expect)(result).not.toBe(data);
        (0, _globals.expect)(result[0].a).not.toBe(data[0].a);
        (0, _globals.expect)(result).toStrictEqual(data);
      });
      (0, _globals.it)('should shallow copy object', () => {
        const data = {
          ref: {
            a: {
              b: 'value'
            }
          }
        };
        const result = (0, _tree.deepCopyTreeNode)(data);
        (0, _globals.expect)(result).not.toBe(data);
        (0, _globals.expect)(result.ref.a).not.toBe(data.ref.a);
        (0, _globals.expect)(result).toStrictEqual(data);
      });
      _globals.it.each(['string', 100, true, undefined])('should return value = %s as is', data => {
        const result = (0, _tree.deepCopyTreeNode)(data);
        (0, _globals.expect)(result).toBe(data);
      });
    });
    (0, _globals.describe)('shallowCopySubtreePath', () => {
      (0, _globals.it)('should shallow copy root if path is empty', () => {
        const tree = {
          a: {
            b: {
              c: 3
            }
          },
          d: {
            e: 2
          }
        };
        const result = (0, _tree.shallowCopySubtreePath)(tree, []);
        (0, _globals.expect)(result).toStrictEqual(tree);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).toBe(tree.a);
      });
      (0, _globals.it)('should shallow copy root if path has length 1', () => {
        const tree = {
          a: {
            b: {
              c: 3
            }
          },
          d: {
            e: 2
          }
        };
        const result = (0, _tree.shallowCopySubtreePath)(tree, ['a']);
        (0, _globals.expect)(result).toStrictEqual(tree);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).toBe(tree.a);
      });
      (0, _globals.it)('should shallow copy passed path', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const result = (0, _tree.shallowCopySubtreePath)(tree, ['a', 'b', 'c']);
        (0, _globals.expect)(result).toStrictEqual(tree);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).not.toBe(tree.a);
        (0, _globals.expect)(result.a.b).not.toBe(tree.a.b);
        (0, _globals.expect)(result.a.b.c).toBe(tree.a.b.c);
      });
      (0, _globals.it)('should not touch subtree outside the passed path', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: {
              extra: 'extra_node'
            }
          }
        };
        const result = (0, _tree.shallowCopySubtreePath)(tree, ['a', 'b', 'c']);
        (0, _globals.expect)(result.d).toBe(tree.d);
        (0, _globals.expect)(result.d.e).toBe(tree.d.e);
      });
      (0, _globals.it)('should stop if path contains wrong values', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const result = (0, _tree.shallowCopySubtreePath)(tree, ['a', 'wrong_path', 'c']);
        (0, _globals.expect)(result).toStrictEqual(tree);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).not.toBe(tree.a);
        (0, _globals.expect)(result.a.b).toBe(tree.a.b);
        (0, _globals.expect)(result.a.b.c).toBe(tree.a.b.c);
      });
    });
    (0, _globals.describe)('mergeOptionTrees', () => {
      (0, _globals.it)('should create absent nodes if path contains error at first place', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: {
              c: {
                extra: 'update'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['wrong_path', 'c']);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).toBe(tree.a);
        (0, _globals.expect)(result.a.b).toBe(tree.a.b);
        (0, _globals.expect)(result.a.b.c).toBe(tree.a.b.c);
        (0, _globals.expect)(result.a.b.c.extra).toBe(tree.a.b.c.extra);
        (0, _globals.expect)(result.wrong_path).toStrictEqual({
          c: undefined
        });
      });
      (0, _globals.it)('should shallow copy subtree path and create absent nodes if faced the wrong node path', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: {
              c: {
                extra: 'update'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'wrong_path', 'extra']);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).not.toBe(tree.a);
        (0, _globals.expect)(result.a.b).not.toBe(tree.a.b);
        (0, _globals.expect)(result.a.b.c).toBe(tree.a.b.c);
        (0, _globals.expect)(result.a.b.c.extra).toBe(tree.a.b.c.extra);
        (0, _globals.expect)(result.a.b.wrong_path).toStrictEqual({
          extra: undefined
        });
      });
      (0, _globals.it)('should correctly create absent last nodes and sync their values', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: {
              c: {
                newProperty: 'test'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'c', 'newProperty']);
        (0, _globals.expect)(result).not.toBe(tree);
        (0, _globals.expect)(result.a).not.toBe(tree.a);
        (0, _globals.expect)(result.a.b).not.toBe(tree.a.b);
        (0, _globals.expect)(result.a.b.c).not.toBe(tree.a.b.c);
        (0, _globals.expect)(result.a.b.c.newProperty).toBe(updatedTree.a.b.c.newProperty);
      });
      (0, _globals.it)('should correctly create absent middle nodes and sync their values', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            newB: {
              c: {
                newProperty: 'test'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'newB', 'c', 'newProperty']);
        (0, _globals.expect)(result.a.newB.c.newProperty).toBe(updatedTree.a.newB.c.newProperty);
      });
      (0, _globals.it)('should deep copy applied value from updated tree', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: {
              c: {
                extra: 'updated'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'c']);
        (0, _globals.expect)(result.a.b.c).not.toBe(updatedTree.a.b.c);
        (0, _globals.expect)(result.a.b.c).toStrictEqual(updatedTree.a.b.c);
      });
      (0, _globals.it)('should apply default value if not found same path in updated tree', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: undefined
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'c']);
        (0, _globals.expect)(result.a).toStrictEqual(defaultTree.a);
      });
      (0, _globals.it)('should deep copy applied value from default tree', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: undefined
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'c']);
        (0, _globals.expect)(result.a.b.c).not.toBe(defaultTree.a.b.c);
        (0, _globals.expect)(result.a.b.c).toStrictEqual(defaultTree.a.b.c);
      });
      (0, _globals.it)('should not touch nodes outside the path', () => {
        const tree = {
          a: {
            b: {
              c: {
                extra: 'extra_node'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const updatedTree = {
          a: {
            b: {
              c: {
                extra: 'updated'
              }
            }
          },
          d: {
            e: 2
          }
        };
        const defaultTree = {
          a: {
            b: {
              c: {
                extra: 'default'
              }
            }
          }
        };
        const result = (0, _tree.mergeOptionTrees)(tree, updatedTree, defaultTree, ['a', 'b', 'c']);
        (0, _globals.expect)(result.d).toBe(tree.d);
      });
    });
  });
});
