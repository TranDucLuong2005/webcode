import { ShieldCheck, Info } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 bg-white">
      <h1 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
        <ShieldCheck className="w-10 h-10 mr-4 text-blue-600" />
        Chính sách Bảo mật
      </h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6 leading-relaxed">
        <p>Tại DigiPremier, sự riêng tư của khách hàng là ưu tiên hàng đầu của chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân mà bạn cung cấp khi sử dụng dịch vụ.</p>
        
        <h3 className="text-xl font-bold text-gray-900">1. Thông tin chúng tôi thu thập</h3>
        <p>Chúng tôi chỉ thu thập các thông tin tối thiểu cần thiết để xử lý đơn hàng và cung cấp dịch vụ, bao gồm: Họ tên, Email, và lịch sử giao dịch. Chúng tôi <strong>không</strong> thu thập mật khẩu tài khoản bên thứ ba (Google, OpenAI, v.v.).</p>

        <h3 className="text-xl font-bold text-gray-900">2. Mục đích sử dụng</h3>
        <p>Thông tin của bạn được sử dụng để xác thực tài khoản, xử lý nâng cấp dịch vụ và thông báo về trạng thái đơn hàng hoặc các thay đổi quan trọng của hệ thống.</p>

        <h3 className="text-xl font-bold text-gray-900">3. Bảo mật</h3>
        <p>Dữ liệu được mã hóa và lưu trữ trên các máy chủ an toàn. Chúng tôi tuyệt đối không bán hoặc chia sẻ thông tin của bạn cho bất kỳ bên thứ ba nào vì mục đích quảng cáo.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
