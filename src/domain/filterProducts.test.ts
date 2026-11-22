import { describe, expect, it } from 'vitest';
import { products } from '../data/products';
import { filterProducts } from './filterProducts';

describe('filterProducts', () => {
  it('returns all products by default', () => {
    expect(filterProducts(products)).toEqual(products);
  });

  it('searches by part of title ignoring case', () => {
    const result = filterProducts(products, { search: 'MACbook' });

    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('MacBook Air');
  });

  it('filters by category', () => {
    const result = filterProducts(products, {
      category: 'Headphones',
    });

    expect(result).toHaveLength(2);
  });

  it('includes minimum and maximum prices', () => {
    const result = filterProducts(products, {
      minPrice: 699.99,
      maxPrice: 749.98,
    });

    expect(result.map((product) => product.price)).toEqual([749.98, 699.99]);
  });

  it('sorts by price ascending', () => {
    const result = filterProducts(products, {
      sort: 'price-asc',
    });

    expect(result[0]?.price).toBe(249.99);
  });

  it('combines filters', () => {
    const result = filterProducts(products, {
      search: 'phone',
      category: 'Smartphones',
      maxPrice: 800,
    });

    expect(result.map((product) => product.title)).toEqual(['iPhone 16']);
  });

  it('does not mutate the original array', () => {
    const originalOrder = products.map((product) => product.id);

    filterProducts(products, { sort: 'price-desc' });

    expect(products.map((product) => product.id)).toEqual(originalOrder);
  });
});
