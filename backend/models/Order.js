// PostgreSQL Order Table Definition Reference
export const ORDER_TABLE = 'orders';
export const ORDER_COLUMNS = [
  'id', 'order_number', 'customer', 'items', 'subtotal', 'shipping',
  'discount', 'total_amount', 'payment_method', 'payment_status',
  'order_status', 'created_at', 'updated_at'
];
