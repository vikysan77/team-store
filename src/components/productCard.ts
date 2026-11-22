import type { Product } from '../data/products';

export function createProductCard(product: Product): HTMLElement {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = document.createElement('img');
  image.className = 'product-card__image';
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';

  const title = document.createElement('h2');
  title.className = 'product-card__title';
  title.textContent = product.title;

  const category = document.createElement('p');
  category.className = 'product-card__category';
  category.textContent = product.category;

  const price = document.createElement('p');
  price.className = 'product-card__price';
  price.textContent = `$${product.price.toFixed(2)}`;

  const button = document.createElement('button');
  button.className = 'product-card__button';
  button.type = 'button';
  button.textContent = 'Add to cart';

  card.append(image, title, category, price, button);

  return card;
}
