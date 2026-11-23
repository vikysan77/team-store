import { products } from '../data/products';
import type { Product } from '../data/products';
import { createProductCard } from '../components/productCard';
import { filterProducts } from '../domain/filterProducts';
import type { ProductFilters } from '../domain/filterProducts';

function uniqueCategories(items: Product[]): string[] {
  return [...new Set(items.map((product) => product.category))];
}

function readPrice(value: string): number | null {
  if (value.trim() === '') {
    return null;
  }

  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

function readSort(value: string): ProductFilters['sort'] {
  if (value === 'price-asc' || value === 'price-desc') {
    return value;
  }

  return 'default';
}

function createField(labelText: string, control: HTMLElement): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = 'catalog__field';

  const caption = document.createElement('span');
  caption.className = 'catalog__label';
  caption.textContent = labelText;

  label.append(caption, control);
  return label;
}

export function createCatalog(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'catalog';

  const heading = document.createElement('h1');
  heading.textContent = 'Product Catalog';

  const filters = document.createElement('form');
  filters.className = 'catalog__filters';
  filters.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const search = document.createElement('input');
  search.type = 'search';
  search.className = 'catalog__control';
  search.placeholder = 'Product name';

  const category = document.createElement('select');
  category.className = 'catalog__control';

  const allCategories = document.createElement('option');
  allCategories.value = 'all';
  allCategories.textContent = 'All categories';
  category.append(allCategories);

  uniqueCategories(products).forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    category.append(option);
  });

  const minPrice = document.createElement('input');
  minPrice.type = 'number';
  minPrice.min = '0';
  minPrice.step = '0.01';
  minPrice.className = 'catalog__control';

  const maxPrice = document.createElement('input');
  maxPrice.type = 'number';
  maxPrice.min = '0';
  maxPrice.step = '0.01';
  maxPrice.className = 'catalog__control';

  const sort = document.createElement('select');
  sort.className = 'catalog__control';

  const sortOptions: Array<{ value: NonNullable<ProductFilters['sort']>; label: string }> = [
    { value: 'default', label: 'Original order' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
  ];

  sortOptions.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.value;
    option.textContent = item.label;
    sort.append(option);
  });

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'catalog__reset';
  reset.textContent = 'Reset';

  const results = document.createElement('div');
  results.className = 'catalog__results';

  function renderProducts(): void {
    const visible = filterProducts(products, {
      search: search.value,
      category: category.value,
      minPrice: readPrice(minPrice.value),
      maxPrice: readPrice(maxPrice.value),
      sort: readSort(sort.value),
    });

    if (visible.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'catalog__empty';
      empty.textContent = 'No products found.';
      results.replaceChildren(empty);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'catalog__grid';
    visible.forEach((product) => {
      grid.append(createProductCard(product));
    });
    results.replaceChildren(grid);
  }

  function resetFilters(): void {
    search.value = '';
    category.value = 'all';
    minPrice.value = '';
    maxPrice.value = '';
    sort.value = 'default';
    renderProducts();
  }

  search.addEventListener('input', renderProducts);
  category.addEventListener('change', renderProducts);
  minPrice.addEventListener('input', renderProducts);
  maxPrice.addEventListener('input', renderProducts);
  sort.addEventListener('change', renderProducts);
  reset.addEventListener('click', resetFilters);

  filters.append(
    createField('Search', search),
    createField('Category', category),
    createField('From', minPrice),
    createField('To', maxPrice),
    createField('Sort', sort),
    reset,
  );
  section.append(heading, filters, results);
  renderProducts();

  return section;
}
