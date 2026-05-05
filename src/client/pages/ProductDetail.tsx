import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios.ts';
import { useCart } from '../context/CartContext.tsx';
import { ShieldCheck, Zap, Clock, CheckCircle2, ShoppingCart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [upgradeEmail, setUpgradeEmail] = useState('');
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!upgradeEmail || !upgradeEmail.includes('@')) {
      setError('Vui lòng nhập Email chính chủ để nhận nâng cấp');
      return;
    }
    addToCart(product, upgradeEmail);
    navigate('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Zap className="w-12 h-12 text-blue-600 animate-pulse" /></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold">Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image & Tags */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="bg-gray-50 rounded-[40px] overflow-hidden aspect-square flex items-center justify-center p-12 border border-gray-100 sticky top-32">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                ) : (
                  <Zap className="w-48 h-48 text-blue-100" />
                )}
             </div>
          </motion.div>

          {/* Right: Info & Purchase */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
             <div className="flex items-center space-x-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-4 italic">
                <ShieldCheck className="w-4 h-4" />
                <span>Sản phẩm chính chủ • {product.category}</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                {product.name}
             </h1>

             <div className="flex items-baseline space-x-4 mb-8">
                <span className="text-5xl font-black text-blue-600">
                   {product.price.toLocaleString('vi-VN')}
                   <span className="text-xl ml-1 italic">đ</span>
                </span>
                <span className="text-gray-400 font-bold bg-gray-100 px-3 py-1 rounded-lg text-sm">
                   Gói {product.duration}
                </span>
             </div>

             <p className="text-gray-500 text-lg leading-relaxed mb-10 pb-10 border-b border-gray-100">
                {product.description}
             </p>

             <div className="space-y-6 mb-12">
                <h4 className="font-black text-gray-900 text-lg">Đặc điểm nổi bật:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {product.features?.map((f: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3 text-gray-600 font-medium">
                         <CheckCircle2 className="w-5 h-5 text-blue-600" />
                         <span>{f}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Upgrade Email Input */}
             <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 mb-10">
                <div className="flex items-center space-x-2 mb-4 text-blue-600 font-bold">
                   <ShieldAlert className="w-5 h-5" />
                   <h4>Thông tin nâng cấp</h4>
                </div>
                <p className="text-sm text-blue-700/70 mb-6 leading-tight">
                   Vui lòng nhập Email mà bạn muốn dùng để đăng ký nâng cấp dịch vụ. Chúng tôi <strong>không</strong> yêu cầu mật khẩu.
                </p>
                <input 
                  type="email" 
                  placeholder="Nhập email chính chủ của bạn..."
                  className="w-full px-6 py-4 bg-white border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-700"
                  value={upgradeEmail}
                  onChange={(e) => {
                    setUpgradeEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
                {error && <p className="mt-2 text-red-500 text-xs font-black ml-2 uppercase italic tracking-tighter">{error}</p>}
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full mt-6 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
             </div>

             {/* Legal Disclaimer */}
             <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl">
                <div className="flex items-start space-x-4">
                   <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                   <div>
                      <h4 className="text-orange-800 font-black mb-1">Cảnh báo pháp lý & Bảo mật</h4>
                      <p className="text-orange-700/80 text-xs leading-relaxed">
                         Hệ thống DigiPremier chỉ cung cấp dịch vụ hỗ trợ nâng cấp/đăng ký chính chủ hơp pháp. Chúng tôi <strong>TUYỆT ĐỐI KHÔNG</strong> bán tài khoản dùng chung, cookie, session hay các thông tin truy cập trái phép vi phạm điều khoản dịch vụ của bên thứ ba. Bạn hoàn toàn làm chủ tài khoản của mình.
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
