import { products } from '../data/products';
import type { Product } from '../data/products';
import { getCart, removeFromCart, updateQuantity } from '../domain/cartStore';
import { calculateCart } from '../domain/calculateCart';

interface CartLine {
  product: Product;
  quantity: number;
}

function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function getCartLines(): CartLine[] {
  return getCart().flatMap((entry) => {
    const product = products.find((item) => item.id === entry.productId);
    return product ? [{ product, quantity: entry.quantity }] : [];
  });
}

function createSummaryRow(label: string, value: string, isTotal = false): HTMLDivElement {
  const row = document.createElement('div');
  row.className = isTotal ? 'cart__summary-row cart__summary-row--total' : 'cart__summary-row';

  const term = document.createElement('dt');
  term.textContent = label;

  const description = document.createElement('dd');
  description.textContent = value;

  row.append(term, description);
  return row;
}

export function createCart(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'cart';

  const heading = document.createElement('h1');
  heading.className = 'cart__title';
  heading.textContent = 'Cart';

  const list = document.createElement('div');
  list.className = 'cart__list';

  const promoForm = document.createElement('form');
  promoForm.className = 'cart__promo';
  promoForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const promoLabel = document.createElement('label');
  promoLabel.className = 'cart__promo-label';
  promoLabel.textContent = 'Promo code';

  const promoInput = document.createElement('input');
  promoInput.className = 'cart__promo-input';
  promoInput.type = 'text';
  promoInput.placeholder = 'SALE10';
  promoInput.autocomplete = 'off';
  promoInput.spellcheck = false;

  const promoMessage = document.createElement('p');
  promoMessage.className = 'cart__promo-message';
  promoMessage.hidden = true;

  promoLabel.append(promoInput);
  promoForm.append(promoLabel, promoMessage);

  const summary = document.createElement('dl');
  summary.className = 'cart__summary';

  function render(): void {
    const lines = getCartLines();

    if (lines.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'cart__empty';
      empty.textContent = 'Your cart is empty.';
      list.replaceChildren(empty);
    } else {
      const items = document.createElement('ul');
      items.className = 'cart__items';
      lines.forEach((line) => {
        items.append(createCartRow(line, render));
      });
      list.replaceChildren(items);
    }

    const code = promoInput.value.trim();
    const result = calculateCart(
      lines.map((line) => ({ price: line.product.price, quantity: line.quantity })),
      code,
    );

    if (code === '') {
      promoMessage.textContent = '';
      promoMessage.hidden = true;
      delete promoMessage.dataset.state;
    } else if (code.toUpperCase() === 'SALE10') {
      promoMessage.textContent = 'Promo code applied.';
      promoMessage.hidden = false;
      promoMessage.dataset.state = 'success';
    } else {
      promoMessage.textContent = 'This promo code is not valid.';
      promoMessage.hidden = false;
      promoMessage.dataset.state = 'error';
    }

    summary.replaceChildren(
      createSummaryRow('Subtotal', formatMoney(result.subtotal)),
      createSummaryRow('Discount', formatMoney(result.discount)),
      createSummaryRow('Total', formatMoney(result.total), true),
    );
  }

  promoInput.addEventListener('input', render);
  section.append(heading, list, promoForm, summary);
  render();

  return section;
}

function createCartRow(line: CartLine, render: () => void): HTMLLIElement {
  const { product, quantity } = line;
  const item = document.createElement('li');
  item.className = 'cart__item';

  const image = document.createElement('img');
  image.className = 'cart__image';
  image.src = product.image;
  image.alt = '';

  const info = document.createElement('div');

  const name = document.createElement('h2');
  name.className = 'cart__name';
  name.textContent = product.title;

  const unitPrice = document.createElement('p');
  unitPrice.className = 'cart__unit';
  unitPrice.textContent = `${formatMoney(product.price)} each`;

  const lineTotal = document.createElement('p');
  lineTotal.className = 'cart__line';
  lineTotal.textContent = formatMoney(product.price * quantity);

  info.append(name, unitPrice, lineTotal);

  const controls = document.createElement('div');
  controls.className = 'cart__controls';

  const decrease = document.createElement('button');
  decrease.type = 'button';
  decrease.className = 'cart__button';
  decrease.textContent = '−';
  decrease.disabled = quantity === 1;
  decrease.setAttribute('aria-label', `Decrease quantity of ${product.title}`);
  decrease.addEventListener('click', () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
      render();
    }
  });

  const count = document.createElement('span');
  count.className = 'cart__quantity';
  count.textContent = String(quantity);

  const increase = document.createElement('button');
  increase.type = 'button';
  increase.className = 'cart__button';
  increase.textContent = '+';
  increase.setAttribute('aria-label', `Increase quantity of ${product.title}`);
  increase.addEventListener('click', () => {
    updateQuantity(product.id, quantity + 1);
    render();
  });

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'cart__button cart__remove';
  remove.textContent = 'Remove';
  remove.addEventListener('click', () => {
    removeFromCart(product.id);
    render();
  });

  controls.append(decrease, count, increase, remove);
  item.append(image, info, controls);
  return item;
}
