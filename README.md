# DigiPremier - Nền tảng Dịch vụ Số Chính chủ

Hệ thống thương mại điện tử chuyên nghiệp cung cấp các dịch vụ nâng cấp tài khoản YouTube Premium, ChatGPT Plus, Gemini Pro hơp pháp.

## 🚀 Tính năng nổi bật
- **Kinh doanh hơp pháp**: Không bán tài khoản dùng chung, không yêu cầu mật khẩu khách hàng.
- **Fullstack hiện đại**: React 19, Express, MongoDB.
- **Giao diện đẳng cấp**: Modern SaaS, responsive hoàn hảo, hiệu ứng Motion mượt mà.
- **Hệ thống Quản trị**: Admin Panel đầy đủ CRUD sản phẩm, quản lý đơn hàng.
- **Bảo mật**: JWT Auth, Zod Validation, Helmet, Rate Limiting.

## 🛠 Hướng dẫn cài đặt & Chạy trên máy local

### 1. Cấu hình môi trường
Tạo file `.env` dựa trên mẫu `.env.example`:
```env
MONGODB_URI="your_mongodb_atlas_uri"
JWT_SECRET="your_secret_key"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure_password"
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy chế độ phát triển (Development)
```bash
npm run dev
```
Hệ thống sẽ khởi động cả Backend (Express) và Vite (Frontend) đồng bộ.

## 🌐 Hướng dẫn Deploy

### Backend (Render / Railway / DigitalOcean)
1. Đẩy code lên GitHub.
2. Kết nối dịch vụ Web Service trên Render/Railway.
3. Cấu hình `Build Command`: `npm install && npm run build`
4. Cấu hình `Start Command`: `node server.ts`
5. Thêm các Biến môi trường (Environment Variables) đã cài đặt.

### Frontend (Vercel / Netlify)
*Lưu ý: Vì dự án là Fullstack với Vite Middleware, cách tốt nhất là deploy mô hình Monolith trên một server duy nhất như Render.*

## ⚖️ Pháp lý & Bảo mật
- Tuyệt đối không lưu trữ các loại token đăng nhập (cookies, sessions) của bên thứ ba.
- Website không liên kết chính thức với Google hay OpenAI trừ khi có thỏa thuận đại lý.
- Luôn hiển thị cảnh báo pháp lý khi người dùng thanh toán.

---
Phát triển bởi **Senior Fullstack Engineer**.
