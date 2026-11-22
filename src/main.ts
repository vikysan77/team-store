import './style.css';
import { createCatalog } from './pages/catalog';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root element was not found');
}

app.replaceChildren(createCatalog());
