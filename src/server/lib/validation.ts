import { z } from 'zod';

export const zodRegisterSchema = z.object({
  name: z.string().min(2, 'Tên phải ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});

export const zodLoginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});

export const zodProductSchema = z.object({
  name: z.string().min(3, 'Tên sản phẩm quá ngắn'),
  description: z.string().min(10, 'Mô tả quá ngắn'),
  price: z.number().positive('Giá phải lớn hơn 0'),
  category: z.enum(['AI', 'Entertainment', 'Learning', 'Work']),
  duration: z.string(),
  features: z.array(z.string()).optional(),
  image: z.string().optional(),
});
