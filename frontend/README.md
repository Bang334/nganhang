# Hệ Thống Quản Lý Ngân Hàng - Frontend

## Giới thiệu

Ứng dụng React hoàn chỉnh với giao diện đẹp mắt cho Hệ thống Quản lý Ngân hàng, bao gồm:

### Tính năng chính

✅ **Dashboard cho 4 loại người dùng:**
1. **Khách hàng (Customer)**
   - Xem tổng quan tài khoản, tiết kiệm, vay
   - Chuyển khoản
   - Quản lý sổ tiết kiệm
   - Xem lịch sử giao dịch
   - Quản lý khoản vay (với tính năng LTV)

2. **Nhân viên Giao dịch (Teller)**
   - Xử lý giao dịch tại quầy
   - Mở tài khoản mới
   - Nạp/Rút tiền

3. **Nhân viên Tín dụng (Loan Officer)**
   - Thẩm định hồ sơ vay
   - Tính toán LTV (Loan-to-Value Ratio)
   - Phê duyệt/Từ chối khoản vay

4. **Quản trị viên (Admin)**
   - Quản lý chi nhánh
   - Quản lý nhân viên
   - Xem thống kê toàn hệ thống

### UI/UX Features
- 🎨 Giao diện hiện đại, responsive
- 📊 Biểu đồ tương tác (Recharts)
- 🔐 Xác thực và phân quyền
- 📱 Mobile-friendly
- ⚡ Fast và smooth transitions

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## Demo Accounts

Sử dụng các tài khoản sau để đăng nhập (password bất kỳ):

| Username | Role | Mô tả | Tính năng chính |
|----------|------|-------|----------------|
| `customer` | CUSTOMER | Khách hàng | Gửi tiết kiệm, Đăng ký vay, Xem tài khoản |
| `teller` | TELLER | Nhân viên Giao dịch | Mở tài khoản, Nạp/Rút tiền, Kích hoạt thẻ |
| `loanofficer` | LOAN_OFFICER | Nhân viên Tín dụng | Thẩm định vay, Tính LTV, Phê duyệt/Từ chối |
| `admin` | ADMIN | Quản trị viên | Quản lý chi nhánh, Xem thống kê hệ thống |

### 🎯 Cách sử dụng:

1. **Click vào bất kỳ badge** màu trong phần "Demo Accounts"
2. Hoặc **nhập username** và click "Đăng nhập"
3. **Khám phá các chức năng** tương ứng với từng role

## Cấu trúc thư mục

```
frontend/
├── src/
│   ├── components/
│   │   ├── customer/       # Components cho khách hàng
│   │   │   ├── Overview.jsx
│   │   │   ├── Accounts.jsx
│   │   │   ├── Savings.jsx
│   │   │   ├── Loans.jsx   (Có LTV calculation)
│   │   │   ├── Transfer.jsx
│   │   │   ├── Transactions.jsx
│   │   │   └── Profile.jsx
│   │   ├── admin/
│   │   ├── teller/
│   │   └── loanOfficer/
│   ├── data/
│   │   └── mockData.js     # Mock data đầy đủ
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── TellerDashboard.jsx
│   │   └── LoanOfficerDashboard.jsx
│   ├── styles/
│   │   ├── Dashboard.css
│   │   └── LoginPage.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
└── package.json
```

## Mock Data

Ứng dụng sử dụng mock data chi tiết bao gồm:

- ✅ Tài khoản ngân hàng (accounts)
- ✅ Giao dịch (transactions)  
- ✅ Sổ tiết kiệm (savingsDeposits) với tính lãi tự động
- ✅ Khoản vay (loans) với **LTV ratio** và tài sản thế chấp
- ✅ Thẻ ngân hàng (cards)
- ✅ Lãi suất (interestRates)
- ✅ Chi nhánh (branches)
- ✅ Nhân viên (employees)

### Đặc biệt: LTV (Loan-to-Value) Ratio

Hệ thống tính toán và hiển thị LTV cho các khoản vay:

```javascript
LTV = (Loan Amount / Collateral Value) × 100%

Ví dụ:
- Vay: 700,000,000 VND
- Nhà thẩm định: 1,000,000,000 VND  
- LTV = 70%
```

## Technologies

- ⚛️ React 18
- 🛣️ React Router DOM
- 📊 Recharts (Charts)
- 🎨 Lucide React (Icons)
- ⚡ Vite (Build tool)

## Tính năng nổi bật

### 1. Quản lý Tiết kiệm
- Hiển thị sổ tiết kiệm với progress bar
- Tính lãi tự động (lãi đơn, lãi kép)
- Thông báo đáo hạn
- Tái tục tự động

### 2. Quản lý Vay vốn  
- **Thẩm định tài sản thế chấp**
- **Tính toán LTV (Loan-to-Value Ratio)**
- Lịch trả nợ chi tiết
- Cảnh báo kỳ trả tiếp theo
- Trả nợ trước hạn

### 3. Dashboard tương tác
- Biểu đồ thu chi
- Phân bổ tài sản
- Thống kê real-time

### 4. Bảo mật
- Authentication
- Role-based access control
- Session management

## Hướng phát triển

- [ ] Kết nối với backend API thực tế
- [ ] Thêm xác thực OTP
- [ ] Tích hợp Payment Gateway
- [ ] Push notifications
- [ ] Xuất báo cáo PDF
- [ ] Multi-language support

## License

Educational Purpose Only

---

**Developed with ❤️ using React + Vite**

