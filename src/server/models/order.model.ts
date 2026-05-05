import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    upgradeEmail: { type: String, required: true } // Email người dùng cung cấp để nâng cấp
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Unpaid', 'Paid', 'Refunded'], 
    default: 'Unpaid' 
  },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
