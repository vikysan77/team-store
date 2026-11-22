import { products } from '../data/products';
import { createProductCard } from '../components/productCard';

export function createCatalog(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'catalog';

  const heading = document.createElement('h1');
  heading.textContent = 'Product Catalog';

  const grid = document.createElement('div');
  grid.className = 'catalog__grid';

  products.forEach((product) => {
    const card = createProductCard(product);
    grid.append(card);
  });

  section.append(heading, grid);

  return section;
}
