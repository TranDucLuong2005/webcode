import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios.ts';
import ProductCard from '../components/ProductCard.tsx';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setActiveCategory(cat);
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?category=${activeCategory}&search=${searchTerm}`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchTerm]);

  const categories = ['AI', 'Entertainment', 'Learning', 'Work'];

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Tất Cả <span className="text-blue-600">Dịch Vụ</span></h1>
            <p className="text-gray-500">Tìm kiếm gói nâng cấp phù hợp nhất với nhu cầu của bạn.</p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Tìm sản phẩm..."
                className="pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
               <button className="p-2.5 bg-white text-blue-600 rounded-xl shadow-sm"><LayoutGrid className="w-5 h-5" /></button>
               <button className="p-2.5 text-gray-400 hover:text-gray-600"><List className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <button 
            onClick={() => setActiveCategory('')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === '' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-[450px] rounded-3xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500">Hãy thử thay đổi từ khóa hoặc danh mục lọc.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
