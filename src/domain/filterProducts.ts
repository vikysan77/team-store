import type { Product } from '../data/products';

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: 'default' | 'price-asc' | 'price-desc';
}

export function filterProducts(products: Product[], filters: ProductFilters = {}): Product[] {
  const {
    search = '',
    category = 'all',
    minPrice = null,
    maxPrice = null,
    sort = 'default',
  } = filters;

  const searchQuery = search.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery);

    const matchesCategory =
      category.toLowerCase() === 'all' || product.category.toLowerCase() === category.toLowerCase();

    const matchesMinPrice = minPrice === null || product.price >= minPrice;

    const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  if (sort === 'price-asc') {
    return filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    return filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}
