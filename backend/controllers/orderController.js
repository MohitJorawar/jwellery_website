import { store } from '../data/store.js';
import { isPostgresConnected, pool } from '../config/db.js';

// Format PostgreSQL row to frontend camelCase
const formatOrder = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    orderNumber: row.order_number,
    customer: typeof row.customer === 'string' ? JSON.parse(row.customer) : row.customer,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    discount: Number(row.discount || 0),
    totalAmount: Number(row.total_amount),
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    orderStatus: row.order_status,
    createdAt: row.created_at
  };
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customer, items, subtotal, shipping, discount, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Shopping bag is empty' });
    }

    const orderNumber = `JJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `jj-ord-${Date.now()}`;
    const calculatedSubtotal = subtotal || items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const finalTotal = totalAmount || (calculatedSubtotal + (shipping || 0) - (discount || 0));
    const isCOD = paymentMethod?.toLowerCase().includes('cash');

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        `INSERT INTO orders (
          id, order_number, customer, items, subtotal, shipping, discount, 
          total_amount, payment_method, payment_status, order_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;`,
        [
          id,
          orderNumber,
          JSON.stringify(customer),
          JSON.stringify(items),
          calculatedSubtotal,
          shipping || 0,
          discount || 0,
          finalTotal,
          paymentMethod || 'Prepaid',
          isCOD ? 'Pending' : 'Paid',
          'Confirmed'
        ]
      );

      return res.status(201).json({
        success: true,
        database: 'PostgreSQL',
        message: 'Luxury jewelry order placed successfully in PostgreSQL!',
        data: formatOrder(result.rows[0])
      });
    }

    // Fallback store
    const newOrderData = {
      id,
      orderNumber,
      customer,
      items,
      subtotal: calculatedSubtotal,
      shipping: shipping !== undefined ? shipping : 0,
      discount: discount || 0,
      totalAmount: finalTotal,
      paymentMethod: paymentMethod || "Prepaid (UPI / Card)",
      paymentStatus: isCOD ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    const orders = store.getOrders();
    orders.unshift(newOrderData);
    store.saveOrders(orders);

    res.status(201).json({
      success: true,
      database: 'LocalStore (Postgres Ready)',
      message: 'Luxury jewelry order placed successfully!',
      data: newOrderData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    if (isPostgresConnected && pool) {
      const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
      const orders = result.rows.map(formatOrder);
      return res.json({ success: true, database: 'PostgreSQL', count: orders.length, data: orders });
    }

    const orders = store.getOrders();
    res.json({ success: true, database: 'LocalStore', count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by id or orderNumber
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        'SELECT * FROM orders WHERE id = $1 OR order_number = $1 LIMIT 1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Order not found in PostgreSQL' });
      }

      return res.json({ success: true, database: 'PostgreSQL', data: formatOrder(result.rows[0]) });
    }

    const orders = store.getOrders();
    const order = orders.find(o => o.orderNumber === id || o.id === id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, database: 'LocalStore', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        `UPDATE orders SET 
          order_status = COALESCE($1, order_status),
          payment_status = COALESCE($2, payment_status),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $3 OR order_number = $3
        RETURNING *;`,
        [orderStatus, paymentStatus, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      return res.json({
        success: true,
        database: 'PostgreSQL',
        data: formatOrder(result.rows[0])
      });
    }

    // Fallback store
    const orders = store.getOrders();
    const index = orders.findIndex(o => o.id === id || o.orderNumber === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    orders[index].orderStatus = orderStatus || orders[index].orderStatus;
    if (paymentStatus) orders[index].paymentStatus = paymentStatus;
    store.saveOrders(orders);

    res.json({ success: true, database: 'LocalStore', data: orders[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Dashboard Statistics for Admin
export const getAdminStats = async (req, res) => {
  try {
    if (isPostgresConnected && pool) {
      const prodCount = await pool.query('SELECT COUNT(*) FROM products');
      const orderCount = await pool.query('SELECT COUNT(*), COALESCE(SUM(total_amount), 0) as total_rev FROM orders');
      const pendingCount = await pool.query("SELECT COUNT(*) FROM orders WHERE order_status IN ('Pending', 'Processing', 'Confirmed')");
      const deliveredCount = await pool.query("SELECT COUNT(*) FROM orders WHERE order_status = 'Delivered'");
      const recentResult = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5');

      return res.json({
        success: true,
        database: 'PostgreSQL',
        data: {
          totalProducts: parseInt(prodCount.rows[0].count, 10),
          totalOrders: parseInt(orderCount.rows[0].count, 10),
          totalRevenue: Number(orderCount.rows[0].total_rev),
          pendingOrders: parseInt(pendingCount.rows[0].count, 10),
          deliveredOrders: parseInt(deliveredCount.rows[0].count, 10),
          recentOrders: recentResult.rows.map(formatOrder)
        }
      });
    }

    // Fallback store
    const products = store.getProducts();
    const orders = store.getOrders();

    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const pendingOrders = orders.filter(ord => ord.orderStatus === 'Pending' || ord.orderStatus === 'Processing' || ord.orderStatus === 'Confirmed').length;
    const deliveredOrders = orders.filter(ord => ord.orderStatus === 'Delivered').length;

    res.json({
      success: true,
      database: 'LocalStore (Postgres Ready)',
      data: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        recentOrders: orders.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
