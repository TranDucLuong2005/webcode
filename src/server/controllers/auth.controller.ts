import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';
import { zodRegisterSchema, zodLoginSchema } from '../lib/validation.ts';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = zodRegisterSchema.parse(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.errors ? error.errors[0].message : error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = zodLoginSchema.parse(req.body);
    const user: any = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.errors ? error.errors[0].message : error.message });
  }
};

export const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }
};
