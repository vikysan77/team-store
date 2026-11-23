const links = [
  { href: '#about', label: 'About' },
  { href: '#catalog', label: 'Catalog' },
  { href: '#cart', label: 'Cart' },
];

export function createMenu(currentHash: string): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'menu';

  links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.className = link.href === currentHash ? 'menu__link menu__link--active' : 'menu__link';
    nav.append(anchor);
  });

  return nav;
}