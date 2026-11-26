import verPhoto from '../assets/ver.jpg';
import vikPhoto from '../assets/vik.jpg';

const members = [
  {
    name: 'Vesselredrex',
    tasks: [
      'Project setup',
      'Product data',
      'Catalog and product cards',
      'Search, filters, and sorting',
      'Cart calculation',
      'Cart page',
    ],
    photo: verPhoto,
    github: 'https://github.com/Vesselredrex',
  },
  {
    name: 'Vikysan77',
    tasks: [
      'About page and menu',
      'Automated checks',
      'Product filter function',
      'Saving the cart',
      'Deploy',
      'Improvements',
    ],
    photo: vikPhoto,
    github: 'https://github.com/vikysan77',
  },
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

    const card = document.createElement('a');
    card.className = 'about__member';
    card.href = member.github;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const header = document.createElement('div');
    header.className = 'about__header';

    const avatar = document.createElement('img');
    avatar.className = 'about__avatar';
    avatar.src = member.photo;
    avatar.alt = '';
    header.append(avatar);

    const body = document.createElement('div');
    body.className = 'about__body';

    const name = document.createElement('p');
    name.className = 'about__name';
    name.textContent = member.name;

    const tasks = document.createElement('ul');
    tasks.className = 'about__tasks';

    member.tasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task;
      tasks.append(taskItem);
    });

    body.append(name, tasks);
    card.append(header, body);
    item.append(card);
    list.append(item);
  });

  section.append(hero, teamHeading, list);
  return section;
}
