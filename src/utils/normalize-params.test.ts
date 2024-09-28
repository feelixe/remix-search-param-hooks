import { describe, it, expect } from 'vitest';
import { normalizeSearchParamQuery } from './normalize-params.js';

describe('normalizeSearchParamQuery', () => {
  it('should return an array with a single string when input is a string', () => {
    const query = 'test';
    const result = normalizeSearchParamQuery(query);
    expect(result).toEqual(['test']);
  });

  it('should return the same array when input is already an array', () => {
    const query = ['test1', 'test2'];
    const result = normalizeSearchParamQuery(query);
    expect(result).toEqual(['test1', 'test2']);
  });

  it('should convert record to array of entries', () => {
    const query = { key1: 'value1', key2: 'value2' };
    const result = normalizeSearchParamQuery(query);
    expect(result).toEqual([['key1', 'value1'], ['key2', 'value2']]);
  });

  it('should exclude entries with undefined or null values', () => {
    const query = { key1: 'value1', key2: undefined, key3: null };
    const result = normalizeSearchParamQuery(query);
    expect(result).toEqual([['key1', 'value1']]);
  });
});