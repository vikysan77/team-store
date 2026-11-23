import './style.css';
import { createMenu } from './components/menu';
import { createAbout } from './pages/about';
import { createCart } from './pages/cart';
import { createCatalog } from './pages/catalog';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root element was not found');
}

function currentHash(): string {
  return location.hash === '#catalog' || location.hash === '#cart' ? location.hash : '#about';
}

function render(): void {
  const hash = currentHash();
  const page =
    hash === '#catalog' ? createCatalog() : hash === '#cart' ? createCart() : createAbout();
  app.replaceChildren(createMenu(hash), page);
}

window.addEventListener('hashchange', render);
render();