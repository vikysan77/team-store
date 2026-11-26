export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

const productImage = (file: string): string => `${import.meta.env.BASE_URL}products/${file}`;

export const products: Product[] = [
  {
    id: 1,
    title: 'MacBook Air',
    category: 'Laptops',
    price: 1348,
    image: productImage('macbook-air.webp'),
  },
  {
    id: 2,
    title: 'Dell XPS 13',
    category: 'Laptops',
    price: 1199,
    image: productImage('dell-xps.webp'),
  },
  {
    id: 3,
    title: 'Lenovo ThinkPad',
    category: 'Laptops',
    price: 899.99,
    image: productImage('thinkpad.webp'),
  },
  {
    id: 4,
    title: 'HP Pavilion',
    category: 'Laptops',
    price: 749.98,
    image: productImage('hp-pavilion.webp'),
  },
  {
    id: 5,
    title: 'iPhone 16',
    category: 'Smartphones',
    price: 799.99,
    image: productImage('iphone-16.webp'),
  },
  {
    id: 6,
    title: 'Samsung Galaxy S25',
    category: 'Smartphones',
    price: 899.99,
    image: productImage('galaxy-s25.webp'),
  },
  {
    id: 7,
    title: 'Google Pixel 9',
    category: 'Smartphones',
    price: 699.99,
    image: productImage('pixel-9.webp'),
  },
  {
    id: 8,
    title: 'OnePlus 13',
    category: 'Smartphones',
    price: 799.99,
    image: productImage('oneplus-13.webp'),
  },
  {
    id: 9,
    title: 'Sony WH-1000XM5',
    category: 'Headphones',
    price: 349.99,
    image: productImage('sony-headphones.webp'),
  },
  {
    id: 10,
    title: 'AirPods Pro',
    category: 'Headphones',
    price: 249.99,
    image: productImage('airpods-pro.webp'),
  },
];
