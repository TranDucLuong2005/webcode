import { Request, Response } from 'express';
import Order from '../models/order.model.ts';
import { AuthRequest } from '../middleware/auth.middleware.ts';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalAmount, note } = req.body;
    
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      note
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').populate('items.product');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
