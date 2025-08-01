/**
* DevExtreme (cjs/__internal/core/di/index.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _index = require("./index");
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

(0, _globals.describe)('basic', () => {
  (0, _globals.describe)('register', () => {
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    (0, _globals.it)('should return registered class', () => {
      const ctx = new _index.DIContext();
      ctx.register(MyClass);
      (0, _globals.expect)(ctx.get(MyClass)).toBeInstanceOf(MyClass);
      (0, _globals.expect)(ctx.get(MyClass).getNumber()).toBe(1);
    });
    (0, _globals.it)('should return registered class with tryGet', () => {
      var _ctx$tryGet;
      const ctx = new _index.DIContext();
      ctx.register(MyClass);
      (0, _globals.expect)(ctx.tryGet(MyClass)).toBeInstanceOf(MyClass);
      (0, _globals.expect)((_ctx$tryGet = ctx.tryGet(MyClass)) === null || _ctx$tryGet === void 0 ? void 0 : _ctx$tryGet.getNumber()).toBe(1);
    });
    (0, _globals.it)('should return same instance each time', () => {
      const ctx = new _index.DIContext();
      ctx.register(MyClass);
      (0, _globals.expect)(ctx.get(MyClass)).toBe(ctx.get(MyClass));
    });
  });
  (0, _globals.describe)('registerInstance', () => {
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    const ctx = new _index.DIContext();
    const instance = new MyClass();
    ctx.registerInstance(MyClass, instance);
    (0, _globals.it)('should work', () => {
      (0, _globals.expect)(ctx.get(MyClass)).toBe(instance);
    });
  });
  (0, _globals.describe)('non registered items', () => {
    const ctx = new _index.DIContext();
    class MyClass {
      getNumber() {
        return 1;
      }
    }
    MyClass.dependencies = [];
    (0, _globals.it)('should throw', () => {
      (0, _globals.expect)(() => ctx.get(MyClass)).toThrow();
    });
    (0, _globals.it)('should not throw if tryGet', () => {
      (0, _globals.expect)(ctx.tryGet(MyClass)).toBe(null);
    });
  });
});
(0, _globals.describe)('dependencies', () => {
  class MyUtilityClass {
    getNumber() {
      return 2;
    }
  }
  MyUtilityClass.dependencies = [];
  class MyClass {
    constructor(utility) {
      this.utility = utility;
    }
    getSuperNumber() {
      return this.utility.getNumber() * 2;
    }
  }
  MyClass.dependencies = [MyUtilityClass];
  const ctx = new _index.DIContext();
  ctx.register(MyUtilityClass);
  ctx.register(MyClass);
  (0, _globals.it)('should return registered class', () => {
    (0, _globals.expect)(ctx.get(MyClass)).toBeInstanceOf(MyClass);
    (0, _globals.expect)(ctx.get(MyUtilityClass)).toBeInstanceOf(MyUtilityClass);
  });
  (0, _globals.it)('dependecies should work', () => {
    (0, _globals.expect)(ctx.get(MyClass).getSuperNumber()).toBe(4);
  });
});
(0, _globals.describe)('mocks', () => {
  class MyClass {
    getNumber() {
      return 1;
    }
  }
  MyClass.dependencies = [];
  class MyClassMock {
    getNumber() {
      return 2;
    }
  }
  MyClassMock.dependencies = [];
  const ctx = new _index.DIContext();
  ctx.register(MyClass, MyClassMock);
  (0, _globals.it)('should return mock class when they are registered', () => {
    (0, _globals.expect)(ctx.get(MyClass)).toBeInstanceOf(MyClassMock);
    (0, _globals.expect)(ctx.get(MyClass).getNumber()).toBe(2);
  });
});
(0, _globals.it)('should work regardless of registration order', () => {
  class MyClass {
    getNumber() {
      return 1;
    }
  }
  MyClass.dependencies = [];
  class MyDependentClass {
    constructor(myClass) {
      this.myClass = myClass;
    }
    getSuperNumber() {
      return this.myClass.getNumber() * 2;
    }
  }
  MyDependentClass.dependencies = [MyClass];
  const ctx = new _index.DIContext();
  ctx.register(MyDependentClass);
  ctx.register(MyClass);
  (0, _globals.expect)(ctx.get(MyDependentClass).getSuperNumber()).toBe(2);
});
(0, _globals.describe)('dependency cycle', () => {
  class MyClass1 {
    constructor(myClass2) {
      this.myClass2 = myClass2;
    }
  }
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  MyClass1.dependencies = [MyClass2];
  class MyClass2 {
    constructor(myClass1) {
      this.myClass1 = myClass1;
    }
  }
  MyClass2.dependencies = [MyClass1];
  const ctx = new _index.DIContext();
  ctx.register(MyClass1);
  ctx.register(MyClass2);
  (0, _globals.it)('should throw', () => {
    (0, _globals.expect)(() => ctx.get(MyClass1)).toThrow();
    (0, _globals.expect)(() => ctx.get(MyClass2)).toThrow();
  });
});
