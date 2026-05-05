import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import api from '../api/axios.ts';
import { User, Package, Clock, ShieldCheck, Mail, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const Profile = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (userInfo) fetchOrders();
  }, [userInfo]);

  if (!userInfo) return null;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-[32px] mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black">
                   {userInfo.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">{userInfo.name}</h2>
                <p className="text-gray-400 text-sm font-medium mb-8 italic">{userInfo.email}</p>
                <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest">
                   <ShieldCheck className="w-4 h-4 text-blue-600" />
                   <span>Thành viên Bạc</span>
                </div>
             </div>

             <div className="space-y-4">
                <button className="w-full flex items-center p-5 rounded-2xl bg-blue-50 text-blue-600 font-black border border-blue-100 italic transition-all">
                   <Package className="w-5 h-5 mr-3" />
                   Đơn hàng của tôi
                </button>
                <button className="w-full flex items-center p-5 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all">
                   <User className="w-5 h-5 mr-3" />
                   Thông tin tài khoản
                </button>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-10 flex items-center italic">
                Lịch sử <span className="text-blue-600 ml-2">Giao dịch</span>
             </h1>

             {loading ? (
                <div className="space-y-6">
                   {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 animate-pulse h-32 rounded-3xl" />)}
                </div>
             ) : orders.length === 0 ? (
                <div className="bg-gray-50 rounded-[40px] py-32 flex flex-col items-center justify-center text-center">
                   <Package className="w-16 h-16 text-gray-200 mb-6" />
                   <h3 className="text-2xl font-black text-gray-900 mb-2 italic">Chưa có đơn hàng nào</h3>
                   <p className="text-gray-400">Bạn vẫn chưa thực hiện giao dịch nào trên hệ thống.</p>
                </div>
             ) : (
                <div className="space-y-6">
                   {orders.map((order) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={order._id} 
                        className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-50 transition-all group"
                      >
                         <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-6 border-b border-gray-50">
                            <div>
                               <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-lg font-black text-gray-900">#{order._id.slice(-6).toUpperCase()}</span>
                                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                     order.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                     order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                  }`}>
                                     {order.status === 'Completed' ? 'Đã hoàn thành' : 
                                      order.status === 'Processing' ? 'Đang lý' : 
                                      order.status === 'Pending' ? 'Chờ thanh toán' : 'Đã hủy'}
                                  </span>
                               </div>
                               <div className="flex items-center text-gray-400 text-xs font-medium italic">
                                  <Calendar className="w-3.5 h-3.5 mr-1" />
                                  {new Date(order.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                               </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-2xl font-black text-gray-900 italic">
                               {order.totalAmount.toLocaleString('vi-VN')}đ
                            </div>
                         </div>

                         <div className="space-y-4">
                            {order.items.map((item: any, i: number) => (
                               <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                  <div className="flex items-center space-x-4">
                                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                                        <Package className="w-5 h-5" />
                                     </div>
                                     <div>
                                        <p className="font-bold text-gray-900 text-sm leading-none mb-1">{item.product?.name || 'Sản phẩm đã gỡ'}</p>
                                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-tighter italic">Nâng cấp: {item.upgradeEmail}</p>
                                     </div>
                                  </div>
                                  {order.status === 'Completed' && (
                                     <div className="flex items-center text-green-600 text-xs font-black italic">
                                        <ShieldCheck className="w-4 h-4 mr-1" />
                                        <span>Đã Kích Hoạt</span>
                                     </div>
                                  )}
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
