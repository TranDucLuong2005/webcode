import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api/axios.ts';
import ProductCard from '../components/ProductCard.tsx';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-white flex flex-col items-center text-center px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-8 border border-blue-100"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Dịch Vụ Nâng Cấp Tài Khoản Chính Chủ - Không Bán Tài Khoản Dùng Chung</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-8 max-w-4xl"
        >
          Nâng Tầm Trải Nghiệm <br />
          <span className="text-blue-600">Sản Phẩm Số</span> Của Bạn
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 max-w-2xl mb-12"
        >
          Cung cấp gói nâng cấp Premium cho YouTube, ChatGPT, Gemini và hàng loạt dịch vụ số khác. Xử lý siêu tốc, chính chủ 100%, bảo hành uy tín.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link 
            to="/products"
            className="bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center group"
          >
            Mua Ngay
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#featured"
            className="bg-white border-2 border-gray-100 text-gray-800 px-10 py-5 rounded-full font-bold text-lg hover:border-blue-600 transition-all"
          >
            Tìm hiểu thêm
          </a>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm italic">Xử lý nhanh</p>
              <p className="text-gray-400 text-xs">Kích hoạt trong 5-15p</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm italic">An toàn 100%</p>
              <p className="text-gray-400 text-xs">Chính chủ, không lậu</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm italic">Hỗ trợ 24/7</p>
              <p className="text-gray-400 text-xs">Đội ngũ kỹ thuật tận tâm</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm italic">Bảo hành dài</p>
              <p className="text-gray-400 text-xs">Lỗi 1 đổi 1 ngay lập tức</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Sản Phẩm <span className="text-blue-600">Tiêu Biểu</span></h2>
            <p className="text-gray-500 max-w-md">Khám phá những gói dịch vụ nâng cấp được yêu thích nhất hiện nay.</p>
          </div>
          <Link to="/products" className="text-blue-600 font-bold hover:underline hidden md:flex items-center py-2">
            Xem tất cả <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-96 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="w-full h-[500px] bg-blue-600 rounded-[40px] flex items-center justify-center transform rotate-3 scale-95 overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover opacity-20" />
               <div className="relative text-white p-12 text-center">
                  <ShieldCheck className="w-24 h-24 mx-auto mb-8 opacity-50" />
                  <h3 className="text-5xl font-black mb-4 italic">CAM KẾT 100%</h3>
                  <p className="text-xl font-medium">CHÍNH CHỦ - UY TÍN - PHÁP LÝ</p>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20" />
          </div>

          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">Tại sao nên chọn dịch vụ tại DIGIPREMIER?</h2>
            <div className="space-y-8">
              {[
                { title: "Nâng cấp chính chủ", desc: "Chúng tôi nâng cấp trực tiếp trên email/tài khoản của bạn, đảm bảo quyền sở hữu cá nhân." },
                { title: "Không bán tài khoản rác", desc: "Tuyệt đối không bán tài khoản lậu, tài khoản dùng chung hay cookie vi phạm chính sách." },
                { title: "Bảo mật thông tin", desc: "Chỉ yêu cầu email xử lý, tuyệt đối không yêu cầu mật khẩu dịch vụ của bên thứ ba." },
                { title: "Giá cả cạnh tranh", desc: "Mức giá hợp lý đi kèm với dịch vụ hỗ trợ chuyên nghiệp nhất thị trường." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[50px] py-20 px-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:500px_500px]" />
           <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10 leading-tight px-4">Sẵn sàng trải nghiệm dịch vụ số đỉnh cao?</h2>
           <p className="text-blue-100 mb-12 max-w-xl mx-auto relative z-10 text-lg">Gia nhập cộng đồng người dùng thông minh ngay hôm nay với các gói nâng cấp hơp pháp.</p>
           <Link to="/register" className="bg-white text-blue-600 px-12 py-5 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all transform hover:scale-105 inline-block relative z-10">
              Đăng ký tài khoản ngay
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
