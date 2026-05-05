import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex flex-col mb-6">
              <span className="text-2xl font-black text-blue-600 tracking-tighter">DIGIPREMIER</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Dịch Vụ Số Chính Chủ</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Nền tảng cung cấp dịch vụ nâng cấp tài khoản số chuyên nghiệp, hơp pháp và uy tín hàng đầu Việt Nam. Chúng tôi cam kết bảo vệ quyền lợi khách hàng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold mb-6">Sản phẩm nổi bật</h4>
            <ul className="space-y-4">
              <li><Link to="/products?category=AI" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Nâng cấp ChatGPT Plus</Link></li>
              <li><Link to="/products?category=Entertainment" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">YouTube Premium Chính chủ</Link></li>
              <li><Link to="/products?category=AI" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Gemini Pro AI</Link></li>
              <li><Link to="/products?category=Work" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Canva Pro Nâng cấp</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold mb-6">Hỗ trợ & Chính sách</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Chính sách bảo mật</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link to="/refund" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Chính sách hoàn tiền</Link></li>
              <li><Link to="/legal" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Cảnh báo pháp lý</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold mb-6">Liên hệ hệ thống</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-500">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Tòa nhà Innovation, Công viên phần mềm Quang Trung, Q.12, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Hotline: 1900 8888</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <span>support@digipremier.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
          <p>© 2026 DIGIPREMIER. All rights reserved. Không phải là đại lý ủy quyền của Google/OpenAI trừ khi được nêu rõ.</p>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="font-bold text-gray-600">Đã Xác Minh Chính Chủ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
