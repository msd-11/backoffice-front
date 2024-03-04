export type OrderListResponse = {
  statusCode: number;
  data: Order[];
};

export type Order = {
  id: number;
  customer: number;
  items: {
    id: number;
    product: number;
    quantity: number;
    price: number;
  }[];
  status: string;
  created_at: string;
  payment_id: number | null;
};

export type OrderResponse = {
  statusCode: number;
  data: Order;
};
