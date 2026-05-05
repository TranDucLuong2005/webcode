import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { Trash2, ArrowRight, ShoppingBag, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const Cart = () => {
  const { cartItems, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-10 text-lg">Hàng ngàn dịch vụ số hấp dẫn đang chờ đón bạn.</p>
        <Link to="/products" className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-black transition-all shadow-xl shadow-blue-100">
          Khám phá ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-12">Giỏ Hàng <span className="text-blue-600">Của Bạn</span></h1>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
               {cartItems.map((item: any) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.product._id} 
                    className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 hover:shadow-xl hover:shadow-blue-50 transition-all"
                  >
                     <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 sm:mb-0 sm:mr-8 overflow-hidden">
                        {item.product.image ? (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag className="w-12 h-12 text-blue-100" />
                        )}
                     </div>
                     <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-xl font-black text-gray-900 mb-1">{item.product.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 text-blue-600 font-bold text-xs uppercase mb-3">
                           <Mail className="w-3.5 h-3.5" />
                           <span>Nâng cấp cho: {item.upgradeEmail}</span>
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{item.product.duration} • Chính chủ</p>
                     </div>
                     <div className="mt-6 sm:mt-0 flex flex-col items-center sm:items-end">
                        <span className="text-2xl font-black text-gray-900 mb-4">{item.price.toLocaleString('vi-VN')}đ</span>
                        <button 
                          onClick={() => removeFromCart(item.product._id)}
                          className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="lg:col-span-1">
               <div className="bg-gray-50 border border-gray-100 rounded-[40px] p-10 sticky top-32">
                  <h4 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-200 pb-6">Tổng đơn hàng</h4>
                  <div className="space-y-4 mb-10">
                     <div className="flex justify-between items-center text-gray-500 font-medium">
                        <span>Tạm tính</span>
                        <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                     </div>
                     <div className="flex justify-between items-center text-gray-500 font-medium">
                        <span>Phí xử lý</span>
                        <span className="text-green-600 font-bold">Miễn phí</span>
                     </div>
                     <div className="flex justify-between items-center text-2xl font-black text-gray-900 pt-6 border-t border-gray-200">
                        <span>Tổng cộng</span>
                        <span className="text-blue-600">{totalAmount.toLocaleString('vi-VN')}đ</span>
                     </div>
                  </div>

                  <div className="mb-8 p-4 bg-white rounded-2xl border border-gray-100 flex items-start space-x-3">
                     <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                     <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                        Thanh toán được bảo mật 100%. Thông tin nâng cấp của bạn được bảo vệ nghiêm ngặt theo chính sách của DigiPremier.
                     </p>
                  </div>

                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-3 group"
                  >
                    <span>Thanh toán ngay</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Link to="/products" className="block text-center mt-6 text-gray-400 font-bold text-sm hover:text-blue-600 transition-colors">
                    Tiếp tục mua sắm
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Cart;
