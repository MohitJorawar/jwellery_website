import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getAdminStats
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/stats', getAdminStats);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

export default router;
