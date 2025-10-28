# HƯỚNG DẪN CHẠY ỨNG DỤNG HỆ THỐNG NGÂN HÀNG

## 🎯 Tổng quan dự án

Dự án hoàn chỉnh bao gồm:

### 1. Tài liệu phân tích (`/docs`)
- ✅ Chương I: Tổng quan hệ thống
- ✅ Chương II: Khảo sát nghiệp vụ  
- ✅ Chương III: Phân tích yêu cầu (chức năng + phi chức năng)
- ✅ Chương IV: Thiết kế cơ sở dữ liệu (25+ bảng với LTV, thế chấp, tiết kiệm)

### 2. Database (`/database`)
- ✅ `schema.sql` - SQL schema đầy đủ với:
  - Quản lý tài khoản, giao dịch
  - Tiết kiệm với tính lãi tự động
  - **Vay vốn với tài sản thế chấp và LTV ratio**
  - Triggers, Views, Stored Procedures

### 3. Biểu đồ UML (`/diagrams`)
- ✅ Use Case Diagram
- ✅ ER Diagram
- ✅ Class Diagram
- ✅ Sequence Diagrams:
  - Đăng ký tài khoản
  - Chuyển khoản
  - **Vay vốn (có thẩm định thế chấp và tính LTV)**
  - **Gửi tiết kiệm (tính lãi, đáo hạn, tái tục)**
  - Trả nợ
- ✅ Activity Diagrams:
  - Xử lý vay vốn
  - Rút tiền
  - Đáo hạn tiết kiệm

### 4. Frontend React (`/frontend`)
- ✅ 4 Dashboard hoàn chỉnh (Customer, Admin, Teller, Loan Officer)
- ✅ Mock data chi tiết
- ✅ UI/UX hiện đại, responsive
- ✅ Biểu đồ tương tác

## 🚀 CÁCH CHẠY ỨNG DỤNG

### Bước 1: Chạy Frontend React

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Đảm bảo đã cài dependencies (đã cài rồi)
npm install

# Chạy development server
npm run dev
```

### Bước 2: Mở trình duyệt

Ứng dụng sẽ chạy tại: **http://localhost:5173**

### Bước 3: Đăng nhập

Sử dụng một trong các tài khoản demo (password bất kỳ):

#### 👤 Khách hàng
- Username: `customer`
- Role: CUSTOMER
- Xem được: Tài khoản, Tiết kiệm, Vay, Chuyển khoản, Giao dịch

#### 👨‍💼 Nhân viên Giao dịch
- Username: `teller`  
- Role: TELLER
- Xem được: Mở tài khoản, Nạp/Rút tiền, Giao dịch

#### 💼 Nhân viên Tín dụng
- Username: `loanofficer`
- Role: LOAN_OFFICER
- Xem được: Hồ sơ vay chờ duyệt, Thẩm định, **Tính LTV**, Phê duyệt

#### 👨‍💻 Quản trị viên
- Username: `admin`
- Role: ADMIN
- Xem được: Thống kê toàn hệ thống, Quản lý chi nhánh, nhân viên

## 📊 Tính năng nổi bật

### 1. Quản lý Vay vốn với LTV

**LTV (Loan-to-Value Ratio) = (Số tiền vay / Giá trị thế chấp) × 100%**

Ví dụ trong hệ thống:
- Khoản vay mua nhà: 700,000,000 VND
- Nhà thẩm định: 1,000,000,000 VND
- **LTV = 70%** ✅ (Đạt, max LTV cho vay mua nhà là 70%)

Dashboard Loan Officer hiển thị:
- Danh sách hồ sơ vay chờ duyệt
- LTV ratio của từng khoản
- Điểm tín dụng
- Nút Phê duyệt/Từ chối

### 2. Tiết kiệm sinh lãi

Dashboard Customer hiển thị:
- Sổ tiết kiệm với progress bar
- Tính lãi tự động (lãi đơn/lãi kép)
- Lãi dự kiến
- Ngày đáo hạn
- Tự động tái tục

### 3. Dashboard tương tác

- Biểu đồ thu nhập/chi tiêu (Bar Chart)
- Phân bổ tài sản (Pie Chart)
- Stats cards động
- Responsive design

## 📁 Cấu trúc Project

```
nganhang/
├── docs/                      # Tài liệu phân tích (Markdown)
│   ├── 01-Tong-Quan.md
│   ├── 02-Khao-Sat-Nghiep-Vu.md
│   ├── 03-Phan-Tich-Yeu-Cau.md
│   └── 04-Thiet-Ke-Co-So-Du-Lieu.md
├── database/                  # Database SQL
│   └── schema.sql            (25+ tables với LTV & Collateral)
├── diagrams/                  # UML Diagrams (PlantUML)
│   ├── usecase.puml
│   ├── er-diagram.puml
│   ├── class.puml
│   ├── sequence/
│   │   ├── vay-von.puml      (Có tính LTV)
│   │   ├── gui-tiet-kiem.puml
│   │   ├── chuyen-khoan.puml
│   │   └── tra-no.puml
│   └── activity/
│       ├── xu-ly-vay-von.puml
│       ├── rut-tien.puml
│       └── dao-han-tiet-kiem.puml
├── frontend/                  # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/mockData.js
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🎨 Screenshots Demo

### Login Page
- Giao diện đăng nhập hiện đại
- Chọn role
- Danh sách demo accounts

### Customer Dashboard
- **Overview**: Tổng quan tài khoản, biểu đồ
- **Accounts**: Hiển thị tài khoản và thẻ
- **Savings**: Sổ tiết kiệm với lãi suất
- **Loans**: Khoản vay với LTV, lịch trả nợ
- **Transfer**: Chuyển khoản
- **Transactions**: Lịch sử giao dịch

### Loan Officer Dashboard  
- Danh sách hồ sơ vay chờ duyệt
- Hiển thị **LTV ratio** cho từng hồ sơ
- Điểm tín dụng (Credit Score)
- Nút Phê duyệt/Từ chối

## 🔧 Công nghệ sử dụng

### Frontend
- ⚛️ React 18
- 🛣️ React Router DOM
- 📊 Recharts (Charts)
- 🎨 Lucide React (Icons)
- ⚡ Vite

### Database
- 🗄️ MySQL Schema
- 📝 Triggers & Stored Procedures

### Documentation
- 📄 Markdown
- 🎨 PlantUML

## 💡 Lưu ý

1. **Đây là ứng dụng DEMO** với mock data
2. Không cần backend/database để chạy frontend
3. Tất cả dữ liệu được lưu trong `mockData.js`
4. Để xem biểu đồ UML, cài PlantUML extension trong VS Code

## 🌟 Đặc điểm nổi bật của hệ thống

✅ **Thiết kế cơ sở dữ liệu chi tiết** với 25+ bảng  
✅ **Tính năng LTV (Loan-to-Value)** cho vay thế chấp  
✅ **Tiết kiệm sinh lãi** tự động  
✅ **Giao diện đẹp, hiện đại** với React  
✅ **Phân quyền rõ ràng** cho 4 loại user  
✅ **Biểu đồ UML đầy đủ** (Use Case, Class, Sequence, Activity, ER)  
✅ **Tài liệu phân tích chuyên nghiệp**  

## 📞 Hỗ trợ

Nếu gặp lỗi, check:
1. Node.js version >= 18
2. npm đã cài đúng dependencies
3. Port 5173 chưa bị chiếm

---

**Chúc bạn khám phá hệ thống thành công! 🎉**

