const members = [
  { name: 'first-github-login', contribution: 'Catalog, product data, and cart calculation.' },
  { name: 'second-github-login', contribution: 'About page, filters, and cart page.' },
];

export function createAbout(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'about';

  const hero = document.createElement('div');
  hero.className = 'about__hero';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'about__eyebrow';
  eyebrow.textContent = 'Electronics store';

  const heading = document.createElement('h1');
  heading.className = 'about__title';
  heading.textContent = 'About';

  const description = document.createElement('p');
  description.className = 'about__lead';
  description.textContent =
    'An electronics store with laptops, smartphones, and headphones. Pick a product in the catalog and see the total in the cart.';

  hero.append(eyebrow, heading, description);

  const teamHeading = document.createElement('h2');
  teamHeading.className = 'about__team-title';
  teamHeading.textContent = 'Team';

  const list = document.createElement('ul');
  list.className = 'about__team';

  members.forEach((member) => {
    const item = document.createElement('li');
    item.className = 'about__member';

    const avatar = document.createElement('span');
    avatar.className = 'about__avatar';
    avatar.textContent = member.name.slice(0, 1).toUpperCase();
    avatar.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');

    const name = document.createElement('p');
    name.className = 'about__name';
    name.textContent = member.name;

    const contribution = document.createElement('p');
    contribution.className = 'about__role';
    contribution.textContent = member.contribution;

    body.append(name, contribution);
    item.append(avatar, body);
    list.append(item);
  });

  section.append(hero, teamHeading, list);
  return section;
}
