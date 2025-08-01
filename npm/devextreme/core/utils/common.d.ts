/**
* DevExtreme (core/utils/common.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DeferredObj } from './deferred';

export interface EqualByValueOptions {
  strict?: boolean;
  maxDepth?: number;
}

export function noop(): void;

export function getKeyHash(key: any): any;

export function deferRender<T>(func: () => T, deferred?: DeferredObj<T>): T | Promise<T> | DeferredObj<T>;

export function ensureDefined<T>(value: T, defaultValue: T): NonNullable<T>;

export function equalByValue(value1: unknown, value2: unknown, options?: EqualByValueOptions): boolean;

export function findBestMatches(targetFilter: any, items: unknown[], mapFn?: Function): any;

export function deferUpdate<T>(func: () => T, deferred?: DeferredObj<T>): T | Promise<T> | DeferredObj<T>;

export function escapeRegExp(string: string): string;
