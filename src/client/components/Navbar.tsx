import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-black text-blue-600 tracking-tighter">DIGIPREMIER</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Dịch Vụ Số Chính Chủ</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Sản phẩm</Link>
            <Link to="/#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Về chúng tôi</Link>
            
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                  <User className="w-5 h-5" />
                  <span>Chào, {userInfo.name.split(' ')[0]}</span>
                </Link>
                {userInfo.isAdmin && (
                  <Link to="/admin" className="p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </Link>
                )}
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Đăng nhập</Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-black transition-all transform hover:scale-105">
                  Bắt đầu ngay
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-8 space-y-4"
          >
            <Link to="/products" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>Sản phẩm</Link>
            <Link to="/cart" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>Giỏ hàng ({cartItems.length})</Link>
            {userInfo ? (
              <>
                <Link to="/profile" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>Tài khoản của tôi</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left text-lg font-medium text-red-500">Đăng xuất</button>
              </>
            ) : (
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                <Link to="/login" className="text-center py-3 font-medium text-gray-700" onClick={() => setIsOpen(false)}>Đăng nhập</Link>
                <Link to="/register" className="text-center py-4 bg-blue-600 text-white rounded-xl font-bold" onClick={() => setIsOpen(false)}>Đăng ký</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
