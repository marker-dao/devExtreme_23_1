/**
* DevExtreme (data/data.types.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type KeySelector<T> = string | ((source: T) => string | number | Date | Object);

export type SelectionDescriptor<T> = {
    selector: KeySelector<T>;
};

export type OrderingDescriptor<T> = SelectionDescriptor<T> & {
    desc?: boolean;
};
