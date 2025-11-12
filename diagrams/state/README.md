# State Diagrams - Biểu đồ Trạng thái

Thư mục này chứa các biểu đồ trạng thái (State Diagram) cho các entity quan trọng trong hệ thống.

## 📁 Danh sách biểu đồ

### 1. **01-loan-state.puml** - Trạng thái Khoản Vay
- **Các trạng thái:**
  - `PENDING` - Chờ duyệt
  - `APPROVED` - Đã phê duyệt
  - `REJECTED` - Từ chối
  - `ACTIVE` - Đang hoạt động (đang trả nợ)
  - `OVERDUE` - Quá hạn
  - `PAID_OFF` - Đã trả hết

### 2. **02-loan-payment-schedule-state.puml** - Trạng thái Lịch Trả Nợ
- **Các trạng thái:**
  - `PENDING` - Chờ trả nợ
  - `PAID` - Đã trả đủ
  - `OVERDUE` - Quá hạn
  - `PARTIAL_PAID` - Trả một phần

### 3. **03-savings-deposit-state.puml** - Trạng thái Sổ Tiết Kiệm
- **Các trạng thái:**
  - `ACTIVE` - Đang gửi
  - `MATURED` - Đã đáo hạn
  - `CLOSED` - Đã đóng
  - `WITHDRAWN_EARLY` - Rút sớm

### 4. **04-account-state.puml** - Trạng thái Tài Khoản
- **Các trạng thái:**
  - `ACTIVE` - Hoạt động
  - `CLOSED` - Đã đóng

### 5. **05-collateral-state.puml** - Trạng thái Tài Sản Thế Chấp
- **Các trạng thái:**
  - `PENDING` - Chờ duyệt
  - `AVAILABLE` - Sẵn sàng
  - `IN_USE` - Đang sử dụng
  - `REJECTED` - Từ chối

## 🎯 Mục đích

Các biểu đồ này mô tả:
- **Vòng đời** của các entity
- **Chuyển đổi trạng thái** và điều kiện
- **Điểm kết thúc** của mỗi entity

## 📝 Lưu ý

- Tất cả trạng thái khớp với schema database (`schema_recommended.sql`)
- Logic chuyển đổi khớp với frontend code
- Ngắn gọn, dễ hiểu, phù hợp cho báo cáo

