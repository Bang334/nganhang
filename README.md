# HỆ THỐNG QUẢN LÝ NGÂN HÀNG

## Giới thiệu
Đây là dự án thiết kế và phân tích hệ thống quản lý ngân hàng toàn diện, bao gồm các nghiệp vụ:
- Quản lý tài khoản (tiết kiệm, thanh toán, thẻ tín dụng)
- Giao dịch (chuyển khoản, nạp/rút tiền, thanh toán)
- Quản lý khách hàng
- Quản lý chi nhánh và nhân viên
- Quản lý vay vốn và lãi suất
- Quản lý tiết kiệm và đáo hạn

## Cấu trúc thư mục
```
nganhang/
├── README.md                           # File này
├── docs/                               # Tài liệu phân tích
│   ├── 01-Tong-Quan.md
│   ├── 02-Khao-Sat-Nghiep-Vu.md
│   ├── 03-Phan-Tich-Yeu-Cau.md
│   ├── 04-Thiet-Ke-Co-So-Du-Lieu.md
│   └── 05-Thiet-Ke-Giao-Dien.md
├── database/                           # Database scripts
│   ├── schema.sql
│   └── sample-data.sql
└── diagrams/                           # Các biểu đồ UML
    ├── usecase.puml
    ├── class.puml
    ├── er-diagram.puml
    ├── sequence/
    │   ├── dang-ky-tai-khoan.puml
    │   ├── chuyen-khoan.puml
    │   ├── vay-von.puml
    │   ├── gui-tiet-kiem.puml
    │   └── thanh-toan-the.puml
    └── activity/
        ├── xu-ly-vay-von.puml
        ├── rut-tien.puml
        └── dao-han-tiet-kiem.puml
```

## Các Actor trong hệ thống
1. **Khách hàng (Customer)**: Người sử dụng dịch vụ ngân hàng
2. **Nhân viên Giao dịch (Teller)**: Xử lý giao dịch tại quầy
3. **Nhân viên Tín dụng (Loan Officer)**: Xử lý hồ sơ vay vốn
4. **Quản lý Chi nhánh (Branch Manager)**: Quản lý chi nhánh
5. **Quản trị viên (Admin)**: Quản trị toàn hệ thống
6. **Hệ thống bên ngoài**: Payment Gateway, SMS/Email Gateway

## Công nghệ sử dụng

### Backend
- **Framework**: Java Spring Boot / Node.js
- **Database**: MySQL / PostgreSQL
- **API**: RESTful API

### Frontend (Đã hoàn thành) ✅
- **Framework**: React 18
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: CSS3 với CSS Variables

### Database (Đã thiết kế) ✅
- **Schema**: 25+ bảng chi tiết
- **Features**: Triggers, Views, Stored Procedures
- **LTV Calculation**: Tự động tính Loan-to-Value ratio
- **Interest Calculation**: Tự động tính lãi tiết kiệm

### Documentation (Đã hoàn thành) ✅
- **UML Diagrams**: Use Case, Class, Sequence, Activity, ER
- **API Documentation**: Swagger/OpenAPI
- **User Manual**: Chi tiết từng chức năng

## Hướng dẫn xem biểu đồ PlantUML
1. Cài đặt PlantUML extension trong VS Code/Cursor
2. Mở các file `.puml` trong thư mục `diagrams/`
3. Hoặc sử dụng http://www.plantuml.com/plantuml/uml/

## Tác giả
Phân tích và thiết kế hệ thống: 2025

## Giấy phép
Educational Purpose Only

