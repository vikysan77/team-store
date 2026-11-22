import { describe, expect, it } from 'vitest';
import { sum } from './sum';

describe('sum function', () => {
  it('adds two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('works with negative numbers', () => {
    expect(sum(-2, 1)).toBe(-1);
  });
});
