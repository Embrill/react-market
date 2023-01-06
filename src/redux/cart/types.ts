export type CartItemType = {
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  sizes: number;
  type: string;
  id: string;
};

// interface типизирует только объект - это одно и тоже, что и type
// interface может иметь вложенности типов, как "items: CartItem[]"
export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
