import { Info } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 bg-white">
      <h1 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
        <Info className="w-10 h-10 mr-4 text-blue-600" />
        Điều khoản Dịch vụ
      </h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6 leading-relaxed">
        <p>Bằng việc truy cập và sử dụng dịch vụ của DigiPremier, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.</p>
        
        <h3 className="text-xl font-bold text-gray-900">1. Phạm vi dịch vụ</h3>
        <p>DigiPremier cung cấp các dịch vụ hỗ trợ nâng cấp, thanh toán các gói Premium chính chủ trên tài khoản cá nhân của khách hàng. Chúng tôi không phải là đại lý ủy quyền của các nhà cung cấp trừ khi có văn bản xác nhận cụ thể.</p>

        <h3 className="text-xl font-bold text-gray-900">2. Trách nhiệm người dùng</h3>
        <p>Người dùng chịu trách nhiệm về tính chính xác của email cung cấp. Chúng tôi không chịu trách nhiệm trong trường hợp email sai dẫn đến nâng cấp nhầm tài khoản.</p>

        <h3 className="text-xl font-bold text-gray-900">3. Tuân thủ chính sách bên thứ ba</h3>
        <p>Người dùng phải tuân thủ điều khoản dịch vụ của bên thứ ba (YouTube, OpenAI, v.v.). Chúng tôi không chịu trách nhiệm nếu tài khoản bị khóa do vi phạm các chính sách cộng đồng của các nền tảng này.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
