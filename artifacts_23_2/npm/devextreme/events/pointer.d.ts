/**
* DevExtreme (events/pointer.d.ts)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type Pointer = {
    down: 'dxpointerdown';
    up: 'dxpointerup';
    move: 'dxpointermove';
    cancel: 'dxpointercancel';
    enter: 'dxpointerenter';
    leave: 'dxpointerleave';
    over: 'dxpointerover';
    out: 'dxpointerout';
};
declare const pointer: Pointer;
export default pointer;
