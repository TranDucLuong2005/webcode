import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['AI', 'Entertainment', 'Learning', 'Work'] },
  image: { type: String, default: '' },
  features: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  duration: { type: String, required: true }, // e.g., '1 Tháng', '1 Năm'
  legalInfo: { type: String, default: 'Sản phẩm chính chủ, bảo hành suốt thời gian sử dụng.' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
