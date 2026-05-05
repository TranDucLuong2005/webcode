import express from 'express';
import { createOrder, getMyOrders, getOrders, updateOrderStatus } from '../controllers/order.controller.ts';
import { protect, admin } from '../middleware/auth.middleware.ts';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
