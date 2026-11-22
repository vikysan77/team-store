export interface CartEntry {
  productId: number;
  quantity: number;
}

let cart: CartEntry[] = [];

export function getCart(): CartEntry[] {
  return cart.map((item) => ({ ...item }));
}

export function addToCart(productId: number): void {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
}

export function updateQuantity(productId: number, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  cart = cart.map((item) => (item.productId === productId ? { ...item, quantity } : item));
}

export function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.productId !== productId);
}

export function clearCart(): void {
  cart = [];
}
