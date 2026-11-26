export interface CartEntry {
  productId: number;
  quantity: number;
}

const CART_KEY = 'team-store-cart';
const PROMO_KEY = 'team-store-promo';

let cart: CartEntry[] | null = null;

function getStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage;
  } catch {
    return null;
  }
}

function isCartEntry(value: unknown): value is CartEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('productId' in value) || !('quantity' in value)) {
    return false;
  }

  const entry = value as { productId: unknown; quantity: unknown };

  return (
    typeof entry.productId === 'number' &&
    Number.isInteger(entry.productId) &&
    typeof entry.quantity === 'number' &&
    Number.isInteger(entry.quantity) &&
    entry.quantity > 0
  );
}

function readStoredCart(): CartEntry[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  try {
    const raw = storage.getItem(CART_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartEntry) : [];
  } catch {
    return [];
  }
}

function persistCart(): void {
  const storage = getStorage();
  if (!storage || cart === null) {
    return;
  }

  try {
    storage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    return;
  }
}

function ensureCart(): CartEntry[] {
  cart ??= readStoredCart();
  return cart;
}

export function getCart(): CartEntry[] {
  return ensureCart().map((item) => ({ ...item }));
}

export function getPromoCode(): string {
  const storage = getStorage();
  if (!storage) {
    return '';
  }

  try {
    return storage.getItem(PROMO_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setPromoCode(code: string): void {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(PROMO_KEY, code);
  } catch {
    return;
  }
}

export function addToCart(productId: number): void {
  const items = ensureCart();
  const existingItem = items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ productId, quantity: 1 });
  }

  persistCart();
}

export function updateQuantity(productId: number, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  cart = ensureCart().map((item) => (item.productId === productId ? { ...item, quantity } : item));
  persistCart();
}

export function removeFromCart(productId: number): void {
  cart = ensureCart().filter((item) => item.productId !== productId);
  persistCart();
}

export function clearCart(): void {
  cart = [];
  persistCart();
}
