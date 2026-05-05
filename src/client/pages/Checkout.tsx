import { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.ts';
import { CheckCircle2, CreditCard, Wallet, Banknote, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!userInfo) {
    navigate('/login?redirect=checkout');
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        items: cartItems.map((item: any) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          upgradeEmail: item.upgradeEmail
        })),
        totalAmount,
        note: `Thanh toán qua ${paymentMethod}`
      });
      setCompletedOrder(data);
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi tạo đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center px-4 bg-gray-50 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Đặt Hàng Thành Công!</h2>
        <p className="text-gray-500 mb-12 text-lg max-w-lg">Mã đơn hàng: <span className="font-black text-blue-600">#{completedOrder._id.slice(-6).toUpperCase()}</span>. Đội ngũ kỹ thuật sẽ xử lý trong vòng 5-15 phút sau khi nhận được thanh toán.</p>
        
        <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-xl shadow-blue-50 max-w-2xl w-full mb-12 text-left">
           <h4 className="text-xl font-black text-gray-900 mb-8 flex items-center">
             <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
             Hướng dẫn thanh toán chuyển khoản
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4 py-6 px-8 bg-blue-50 rounded-3xl border border-blue-100">
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Ngân hàng</p>
                 <p className="text-xl font-black text-blue-600 leading-none">MB Bank</p>
              </div>
              <div className="space-y-4 py-6 px-8 bg-blue-50 rounded-3xl border border-blue-100">
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Số tài khoản</p>
                 <p className="text-xl font-black text-blue-600 leading-none">0999 888 777</p>
              </div>
              <div className="space-y-4 py-6 px-8 bg-blue-50 rounded-3xl border border-blue-100">
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Chủ tài khoản</p>
                 <p className="text-xl font-black text-blue-600 leading-none">DIGIPREMIER SYSTEM</p>
              </div>
              <div className="space-y-4 py-6 px-8 bg-orange-100 rounded-3xl border border-orange-200">
                 <p className="text-xs font-black text-orange-400 uppercase tracking-widest leading-none">Số tiền cần chuyển</p>
                 <p className="text-xl font-black text-orange-600 leading-none">{totalAmount.toLocaleString('vi-VN')}đ</p>
              </div>
           </div>
           <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nội dung chuyển khoản (BẮT BUỘC)</p>
              <p className="text-2xl font-black text-blue-400 tracking-tighter">DIGI {completedOrder._id.slice(-6).toUpperCase()}</p>
           </div>
        </div>

        <button onClick={() => navigate('/profile')} className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-black transition-all">
           Xem lịch sử đơn hàng
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-12">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Payment Methods */}
          <div>
            <div className="mb-12">
               <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-3 text-blue-600" />
                  Thông tin thanh toán an toàn
               </h4>
               <div className="space-y-4">
                  {[
                    { id: 'bank', name: 'Chuyển khoản Ngân hàng (MB Bank)', icon: Banknote, desc: 'Tự động kiểm tra trong 5-15 phút' },
                    { id: 'momo', name: 'Ví MoMo', icon: Wallet, desc: 'Ưu tiên xử lý nhanh' },
                    { id: 'vnpay', name: 'VNPay (Thẻ ATM/QR)', icon: CreditCard, desc: 'Giao dịch qua cổng bảo mật' }
                  ].map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center p-6 rounded-3xl border-2 transition-all ${paymentMethod === method.id ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 ${paymentMethod === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className={`font-black uppercase tracking-tighter ${paymentMethod === method.id ? 'text-blue-600' : 'text-gray-900'}`}>{method.name}</p>
                        <p className="text-gray-400 text-xs font-medium">{method.desc}</p>
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-gray-50 border border-gray-100 rounded-[32px] flex items-start space-x-4">
               <AlertCircle className="w-6 h-6 text-gray-300 shrink-0 mt-1" />
               <p className="text-gray-400 text-sm italic leading-relaxed">
                  Bằng cách nhấn nút "Đặt hàng", bạn đồng ý với các Điều khoản dịch vụ và Chính sách hoàn tiền của DigiPremier. Sản phẩm số khi đã kích hoạt thành công sẽ không được hỗ trợ hoàn tiền trừ trường hợp lỗi kỹ thuật không thể khắc phục.
               </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-gray-50 border border-gray-100 rounded-[40px] p-10">
               <h4 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-200 pb-6 italic">Tóm tắt đơn hàng</h4>
               <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                  {cartItems.map((item: any) => (
                    <div key={item.product._id} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                       <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                             <Zap className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="font-bold text-gray-900 text-sm leading-none mb-1">{item.product.name}</p>
                             <p className="text-xs text-gray-400 uppercase font-black tracking-tighter">Cho: {item.upgradeEmail}</p>
                          </div>
                       </div>
                       <span className="font-black text-gray-900">{item.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
               </div>

               <div className="space-y-4 mb-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-2xl font-black text-gray-900 italic">
                     <span>Tổng cần thanh toán</span>
                     <span className="text-blue-600">{totalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
               </div>

               <button 
                 onClick={handlePlaceOrder}
                 disabled={loading}
                 className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-4 group"
               >
                 <span>{loading ? 'Đang xác nhận...' : 'Xác nhận Đặt hàng'}</span>
                 {!loading && <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
