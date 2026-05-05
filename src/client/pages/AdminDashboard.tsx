import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.ts';
import { LayoutDashboard, ShoppingBag, ListOrdered, Users, Plus, Edit, Trash2, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 p-6 space-y-4 md:sticky md:top-20 md:h-[calc(100vh-80px)]">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-6">Quản trị viên</h2>
        <Link to="/admin" className="flex items-center p-4 rounded-2xl bg-blue-50 text-blue-600 font-black italic">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link to="/admin/products" className="flex items-center p-4 rounded-2xl text-gray-500 font-bold hover:bg-gray-100 transition-all">
          <ShoppingBag className="w-5 h-5 mr-3" />
          Sản phẩm
        </Link>
        <Link to="/admin/orders" className="flex items-center p-4 rounded-2xl text-gray-500 font-bold hover:bg-gray-100 transition-all">
          <ListOrdered className="w-5 h-5 mr-3" />
          Đơn hàng
        </Link>
      </div>

      {/* Admin Main Content */}
      <div className="flex-grow p-8 md:p-12">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/product/new" element={<ProductForm />} />
          <Route path="/product/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </div>
  );
};

const Overview = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: prods } = await api.get('/products');
        const { data: ords } = await api.get('/orders');
        const rev = ords.filter((o: any) => o.status === 'Completed').reduce((acc: number, o: any) => acc + o.totalAmount, 0);
        setStats({ products: prods.length, orders: ords.length, revenue: rev });
      } catch (error) { console.error(error); }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Hệ thống <span className="text-blue-600">Tổng quan</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Tổng sản phẩm', val: stats.products, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tổng đơn hàng', val: stats.orders, icon: ListOrdered, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Doanh thu (vnđ)', val: stats.revenue.toLocaleString(), icon: Zap, color: 'text-green-600', bg: 'bg-green-50' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-blue-50">
            <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6`}>
              <s.icon className="w-8 h-8" />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{s.label}</p>
            <p className="text-4xl font-black text-gray-900 italic">{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
     const { data } = await api.get('/products');
     setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Xác nhận xóa sản phẩm này?')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-3xl font-black text-gray-900 italic">Quản lý <span className="text-blue-600">Sản phẩm</span></h1>
        <Link to="/admin/product/new" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center hover:bg-black transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Thêm mới
        </Link>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl shadow-blue-50">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-10 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Sản phẩm</th>
              <th className="px-10 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Giá</th>
              <th className="px-10 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-10 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="font-black text-gray-900 italic">{p.name}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">{p.category} • {p.duration}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6 font-black text-blue-600 italic">{p.price.toLocaleString()}đ</td>
                <td className="px-10 py-6">
                  <div className="flex justify-center space-x-3">
                    <button onClick={() => navigate(`/admin/product/edit/${p._id}`)} className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, category: 'AI', duration: '1 Tháng',
    features: '', image: '', legalInfo: 'Sản phẩm chính chủ, bảo hành hơp pháp.'
  });

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`).then(({ data }) => {
         setFormData({ ...data, features: data.features.join(', ') });
      });
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const dataToSend = { ...formData, features: formData.features.split(',').map(f => f.trim()) };
    try {
      if (id) await api.put(`/products/${id}`, dataToSend);
      else await api.post('/products', dataToSend);
      navigate('/admin/products');
    } catch (err) { alert('Lỗi: Kiểm tra lại thông tin'); }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black text-gray-900 italic mb-10">{id ? 'Cập nhật' : 'Thêm'} <span className="text-blue-600">Sản phẩm</span></h1>
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-blue-50 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
             <label className="text-xs font-black text-gray-400 uppercase ml-4">Tên sản phẩm</label>
             <input className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-black text-gray-400 uppercase ml-4">Giá (vnđ)</label>
             <input type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
             <label className="text-xs font-black text-gray-400 uppercase ml-4">Danh mục</label>
             <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="AI">AI</option><option value="Entertainment">Entertainment</option><option value="Learning">Learning</option><option value="Work">Work</option>
             </select>
          </div>
          <div className="space-y-1">
             <label className="text-xs font-black text-gray-400 uppercase ml-4">Thời hạn</label>
             <input className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g 1 Tháng" required />
          </div>
        </div>

        <div className="space-y-1">
           <label className="text-xs font-black text-gray-400 uppercase ml-4">Mô tả ngắn</label>
           <textarea className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        </div>

        <div className="space-y-1">
           <label className="text-xs font-black text-gray-400 uppercase ml-4">Đặc điểm (cách nhau bằng dấu phẩy)</label>
           <input className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="e.g. Xem 4K, Nghe nhạc khi tắt màn hình" />
        </div>

        <div className="space-y-1">
           <label className="text-xs font-black text-gray-400 uppercase ml-4">Link ảnh sản phẩm (Optional)</label>
           <input className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition-all">Lưu sản phẩm</button>
      </form>
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data } = await api.get('/orders');
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string, payStatus: string) => {
    await api.put(`/orders/${id}/status`, { status, paymentStatus: payStatus });
    fetchOrders();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">Quản lý <span className="text-blue-600">Đơn hàng</span></h1>
      
      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl shadow-blue-50">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
               <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Khách hàng / Mã đơn</th>
               <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Sản phẩm</th>
               <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Trạng thái</th>
               <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Thanh toán</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map(o => (
               <tr key={o._id} className="hover:bg-gray-50">
                  <td className="px-8 py-6">
                     <p className="font-black text-gray-900 italic">#{o._id.slice(-6).toUpperCase()}</p>
                     <p className="text-xs font-bold text-gray-400">{o.user?.name} ({o.user?.email})</p>
                  </td>
                  <td className="px-8 py-6">
                     {o.items.map((item: any, i: number) => (
                        <div key={i} className="text-xs font-bold text-blue-600 mb-1 italic">
                           • {item.product?.name} ({item.upgradeEmail})
                        </div>
                     ))}
                  </td>
                  <td className="px-8 py-6">
                     <select 
                       className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-tighter"
                       value={o.status}
                       onChange={(e) => updateStatus(o._id, e.target.value, o.paymentStatus)}
                     >
                        <option value="Pending">Chờ</option>
                        <option value="Processing">Xử lý</option>
                        <option value="Completed">Xong</option>
                        <option value="Cancelled">Hủy</option>
                     </select>
                  </td>
                  <td className="px-8 py-6">
                     <button 
                       onClick={() => updateStatus(o._id, o.status, o.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid')}
                       className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${o.paymentStatus === 'Paid' ? 'bg-green-100 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-100'}`}
                     >
                        {o.paymentStatus === 'Paid' ? 'Đã thu tiền' : 'Chưa tiền'}
                     </button>
                  </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
