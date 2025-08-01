/**
* DevExtreme (common/core/events/utils/index.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type eventTypes = 'dx' | 'other' | 'pointer' | 'mouse' | 'dxmousewheel' | 'touch' | 'keyboard';
export function eventSource(arg: { type: string }): eventTypes;
export function isPointerEvent(arg: { type: string }): boolean;
export function isMouseEvent(arg: { type: string }): boolean;
export function isDxMouseWheelEvent(arg: { type: string }): boolean;
export function isTouchEvent(arg: { type: string }): boolean;
export function isKeyboardEvent(arg: { type: string }): boolean;
export function isFakeClickEvent(arg: { screenX: number; offsetX: number; pageX: number }): boolean;
export function eventData(arg: { pageX: number; pageY: number; timeStamp: number }): { x: number; y: number; time: number };
export function eventDelta(from: number, to: number): { x: number; y: number; time: number };
export function hasTouches(e: { type: string; pointers?: ArrayLike<any>; originalEvent: { touches?: ArrayLike<any> } }): number;
export function forceSkipEvents(): boolean;
export function stopEventsSkipping(): boolean;
export function needSkipEvent(e: { target?: any; type: string }): boolean;
export function setEventFixMethod(func: any): void;
export function createEvent(originalEvent: any, args?: any): any;
export function fireEvent(arg: { originalEvent: any; delegateTarget?: any; type?: any; target?: any }): any;
export function normalizeKeyName(arg: { key?: string; which?: string | number }): string | undefined;
export function getChar(arg: { key?: string; which: string | number }): string;
export function addNamespace(eventNames: Array<string> | string, namespace: string): string;
export function isCommandKeyPressed(arg: { ctrlKey: boolean; metaKey: boolean }): boolean;
