import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap } from 'lucide-react';

const ProductCard = ({ product, ...props }: any) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-2 hover:shadow-2xl hover:shadow-blue-100 transition-all group h-full flex flex-col">
      <div className="relative h-56 bg-gray-50 rounded-2xl overflow-hidden mb-6">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <Zap className="w-16 h-16 text-blue-200" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black px-3 py-1 rounded-full border border-blue-100 flex items-center shadow-sm">
            <ShieldCheck className="w-3 h-3 mr-1" />
            CHÍNH CHỦ
          </span>
          <span className="bg-white/90 backdrop-blur-md text-green-600 text-[10px] font-black px-3 py-1 rounded-full border border-green-100 flex items-center shadow-sm uppercase tracking-tighter">
            Bảo Hành 1:1
          </span>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-col flex-grow">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
          {product.category} • {product.duration}
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 px-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-6 px-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Giá chỉ từ</span>
            <span className="text-2xl font-black text-gray-900 leading-none">
              {product.price.toLocaleString('vi-VN')}
              <span className="text-sm font-bold ml-1">đ</span>
            </span>
          </div>
          <Link 
            to={`/product/${product._id}`}
            className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all transform group-hover:translate-x-1"
          >
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
