export function createCart(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'cart';

  const heading = document.createElement('h1');
  heading.textContent = 'Cart';

  const note = document.createElement('p');
  note.textContent = 'This section is in progress.';

  section.append(heading, note);
  return section;
}