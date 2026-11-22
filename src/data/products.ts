export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'MacBook Air',
    category: 'Laptops',
    price: 1348,
    image: '/products/macbook-air.webp',
  },
  {
    id: 2,
    title: 'Dell XPS 13',
    category: 'Laptops',
    price: 1199,
    image: '/products/dell-xps.webp',
  },
  {
    id: 3,
    title: 'Lenovo ThinkPad',
    category: 'Laptops',
    price: 899.99,
    image: '/products/thinkpad.webp',
  },
  {
    id: 4,
    title: 'HP Pavilion',
    category: 'Laptops',
    price: 749.98,
    image: '/products/hp-pavilion.webp',
  },
  {
    id: 5,
    title: 'iPhone 16',
    category: 'Smartphones',
    price: 799.99,
    image: '/products/iphone-16.webp',
  },
  {
    id: 6,
    title: 'Samsung Galaxy S25',
    category: 'Smartphones',
    price: 899.99,
    image: '/products/galaxy-s25.webp',
  },
  {
    id: 7,
    title: 'Google Pixel 9',
    category: 'Smartphones',
    price: 699.99,
    image: '/products/pixel-9.webp',
  },
  {
    id: 8,
    title: 'OnePlus 13',
    category: 'Smartphones',
    price: 799.99,
    image: '/products/oneplus-13.webp',
  },
  {
    id: 9,
    title: 'Sony WH-1000XM5',
    category: 'Headphones',
    price: 349.99,
    image: '/products/sony-headphones.webp',
  },
  {
    id: 10,
    title: 'AirPods Pro',
    category: 'Headphones',
    price: 249.99,
    image: '/products/airpods-pro.webp',
  },
];
