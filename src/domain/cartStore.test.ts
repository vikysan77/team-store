import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addToCart, clearCart, getCart, removeFromCart, updateQuantity } from './cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    clearCart();
  });

  it('adds a product to the cart', () => {
    addToCart(1);

    expect(getCart()).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it('increases quantity when adding the same product', () => {
    addToCart(1);
    addToCart(1);

    expect(getCart()).toEqual([{ productId: 1, quantity: 2 }]);
  });

  it('adds different products', () => {
    addToCart(1);
    addToCart(2);

    expect(getCart()).toHaveLength(2);
  });

  it('updates product quantity', () => {
    addToCart(1);
    updateQuantity(1, 3);

    expect(getCart()[0]?.quantity).toBe(3);
  });

  it('removes a product', () => {
    addToCart(1);
    removeFromCart(1);

    expect(getCart()).toEqual([]);
  });

  it('removes a product when quantity becomes zero', () => {
    addToCart(1);
    updateQuantity(1, 0);

    expect(getCart()).toEqual([]);
  });

  it('clears the cart', () => {
    addToCart(1);
    addToCart(2);
    clearCart();

    expect(getCart()).toEqual([]);
  });

  it('does not expose mutable cart entries', () => {
    addToCart(1);

    const copy = getCart();
    copy[0]!.quantity = 99;

    expect(getCart()[0]?.quantity).toBe(1);
  });

  it('restores the cart and promo code from localStorage', async () => {
    const memory = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
      removeItem: (key: string) => {
        memory.delete(key);
      },
    });

    try {
      vi.resetModules();
      const first = await import('./cartStore');
      first.addToCart(4);
      first.addToCart(4);
      first.setPromoCode('SALE10');

      vi.resetModules();
      const second = await import('./cartStore');

      expect(second.getCart()).toEqual([{ productId: 4, quantity: 2 }]);
      expect(second.getPromoCode()).toBe('SALE10');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('ignores a broken saved cart', async () => {
    const memory = new Map<string, string>([['team-store-cart', '{']]);
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
      removeItem: (key: string) => {
        memory.delete(key);
      },
    });

    try {
      vi.resetModules();
      const store = await import('./cartStore');

      expect(store.getCart()).toEqual([]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
