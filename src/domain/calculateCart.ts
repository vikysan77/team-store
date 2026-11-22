export interface CartItem {
  price: number;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  total: number;
}

export function calculateCart(items: CartItem[], promoCode = ''): CartSummary {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = promoCode.trim().toUpperCase() === 'SALE10' ? subtotal * 0.1 : 0;

  const total = subtotal - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
