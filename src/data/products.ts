export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

export const products: Product[] = [
  { id: 1, title: 'MacBook Air', category: 'Laptops', price: 1348 },
  { id: 2, title: 'Dell XPS 13', category: 'Laptops', price: 1199 },
  { id: 3, title: 'Lenovo ThinkPad', category: 'Laptops', price: 899.99 },
  { id: 4, title: 'HP Pavilion', category: 'Laptops', price: 749.98 },
  { id: 5, title: 'iPhone 16', category: 'Smartphones', price: 799.99 },
  { id: 6, title: 'Samsung Galaxy S25', category: 'Smartphones', price: 899.99 },
  { id: 7, title: 'Google Pixel 9', category: 'Smartphones', price: 699.99 },
  { id: 8, title: 'OnePlus 13', category: 'Smartphones', price: 799.99 },
  { id: 9, title: 'Sony WH-1000XM5', category: 'Headphones', price: 349.99 },
  { id: 10, title: 'AirPods Pro', category: 'Headphones', price: 249.99 },
];
