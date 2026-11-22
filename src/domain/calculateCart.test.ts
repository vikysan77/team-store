import { describe, expect, it } from 'vitest';
import { calculateCart } from './calculateCart';

describe('calculateCart', () => {
  it('calculates multiple items and quantities', () => {
    const result = calculateCart([
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 },
    ]);

    expect(result).toEqual({
      subtotal: 350,
      discount: 0,
      total: 350,
    });
  });

  it('returns zeros for an empty cart', () => {
    expect(calculateCart([])).toEqual({
      subtotal: 0,
      discount: 0,
      total: 0,
    });
  });

  it('applies a 10% discount with SALE10', () => {
    const result = calculateCart([{ price: 200, quantity: 2 }], 'SALE10');

    expect(result).toEqual({
      subtotal: 400,
      discount: 40,
      total: 360,
    });
  });

  it('ignores an unknown promo code', () => {
    const result = calculateCart([{ price: 100, quantity: 1 }], 'INVALID');

    expect(result.discount).toBe(0);
    expect(result.total).toBe(100);
  });

  it('does not accumulate discounts on repeated calls', () => {
    const items = [{ price: 100, quantity: 2 }];

    const first = calculateCart(items, 'SALE10');
    const second = calculateCart(items, 'SALE10');

    expect(first).toEqual(second);
    expect(second.total).toBe(180);
  });
});
