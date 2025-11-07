# 🎯 Hướng Dẫn Tính Năng Đáo Hạn

## 📌 Tổng Quan

Tính năng đáo hạn cho phép khách hàng xử lý sổ tiết kiệm và khoản vay khi đến hạn thanh toán, với nhiều lựa chọn linh hoạt và giao diện trực quan.

---

## 🎨 Giao Diện Đã Tích Hợp

### ✅ 1. Trang Tổng Quan (Overview)
- **Vị trí**: `/customer` - Trang chủ sau khi đăng nhập
- **Hiển thị**: Banner cảnh báo nổi bật ở đầu trang khi có sổ/khoản vay sắp đáo hạn
- **Tính năng**:
  - Liệt kê tất cả sổ tiết kiệm đáo hạn trong 7 ngày
  - Liệt kê tất cả khoản vay đáo hạn trong 30 ngày
  - Nút "Xử lý ngay" để mở modal xử lý

### ✅ 2. Trang Tiết Kiệm (Savings)
- **Vị trí**: `/customer/savings`
- **Hiển thị**: Nút "Xem tùy chọn đáo hạn" trên mỗi sổ sắp đáo hạn (≤ 7 ngày)
- **Tính năng**:
  - Progress bar hiển thị thời gian còn lại
  - Text động: "Xử lý đáo hạn ngay" nếu đã đáo hạn, "Xem tùy chọn đáo hạn" nếu sắp đáo hạn

### ✅ 3. Trang Khoản Vay (Loans)
- **Vị trí**: `/customer/loans`
- **Hiển thị**: Warning box màu vàng với countdown trên mỗi khoản vay sắp đáo hạn (≤ 30 ngày)
- **Tính năng**:
  - Hiển thị ngày đáo hạn và số ngày còn lại
  - Nút "Xử lý đáo hạn" để mở modal

---

## 💾 Mock Data Test

Đã thêm 4 records để test tính năng đáo hạn:

### Sổ Tiết Kiệm:

#### **STK003** - Sắp đáo hạn (4 ngày)
```javascript
{
  deposit_id: 3,
  deposit_number: 'STK003',
  customer_id: 1,
  principal_amount: 100000000, // 100 triệu
  interest_rate: 5.5,
  term_months: 6,
  maturity_date: '2025-11-05',
  auto_renew: 'NO',
  status: 'ACTIVE'
}
```

#### **STK004** - Đã đáo hạn hôm nay!
```javascript
{
  deposit_id: 4,
  deposit_number: 'STK004',
  customer_id: 1,
  principal_amount: 200000000, // 200 triệu
  interest_rate: 6.0,
  term_months: 12,
  maturity_date: '2025-11-01',
  auto_renew: 'YES', // Có tự động tái tục
  status: 'ACTIVE'
}
```

### Khoản Vay:

#### **LOAN003** - Sắp đáo hạn (9 ngày)
```javascript
{
  loan_id: 3,
  loan_number: 'LOAN003',
  customer_id: 1,
  loan_type_id: 3, // Vay mua xe
  approved_amount: 300000000, // 300 triệu
  interest_rate: 9.5,
  term_months: 60,
  outstanding_balance: 25000000, // Còn 25 triệu
  maturity_date: '2025-11-10',
  collateral_id: 2, // Có thế chấp
  status: 'ACTIVE'
}
```

#### **LOAN004** - Sắp đáo hạn (39 ngày)
```javascript
{
  loan_id: 4,
  loan_number: 'LOAN004',
  customer_id: 1,
  loan_type_id: 1, // Vay tiêu dùng
  approved_amount: 100000000, // 100 triệu
  interest_rate: 12.0,
  term_months: 36,
  outstanding_balance: 15000000, // Còn 15 triệu
  maturity_date: '2025-12-10',
  collateral_id: null, // Không thế chấp
  status: 'ACTIVE'
}
```

---

## 🎭 Modal Xử Lý Đáo Hạn

### 💰 Modal Tiết Kiệm (SavingsMaturityModal)

**Bước 1: Chọn phương án**
- ✅ **Rút tiền về tài khoản**: Nhận cả gốc + lãi
- 🔄 **Tái tục gốc, nhận lãi**: Gốc tiếp tục gửi, lãi về tài khoản
- 📈 **Tái tục gốc + lãi**: Lãi kép - tối đa hóa lợi nhuận

**Bước 2: Xác nhận chi tiết**
- Chọn kỳ hạn mới (cho tái tục)
- Xem trước lãi suất và lãi dự kiến
- Tùy chọn tự động tái tục

**Bước 3: Hoàn tất**
- Hiển thị kết quả
- Download biên lai (PDF)

### 💳 Modal Khoản Vay (LoanMaturityModal)

**Bước 1: Chọn phương án**
- ✅ **Trả hết nợ**: Thanh toán toàn bộ dư nợ, giải phóng tài sản
- ⏰ **Gia hạn**: Kéo dài thời gian, giảm áp lực hàng tháng
- ⚙️ **Tái cấu trúc**: Điều chỉnh lãi suất + kỳ hạn

**Bước 2: Cấu hình chi tiết**
- **Trả hết nợ**: Xác nhận số tiền, xem lợi ích
- **Gia hạn**: Chọn số tháng gia hạn, xem preview thanh toán
- **Tái cấu trúc**: Điều chỉnh lãi suất + kỳ hạn mới

**Bước 3: Phê duyệt (nếu cần)**
- Gia hạn và tái cấu trúc cần Loan Officer phê duyệt
- Timeline xử lý: 2-7 ngày
- Thông báo qua SMS + Email

---

## 🎨 UI/UX Highlights

### ✨ Animation & Effects
- **slideIn**: Modal xuất hiện mượt mà từ trên xuống
- **fadeIn**: Nội dung từng bước fade in
- **Hover effects**: Transform + shadow trên buttons
- **Progress bars**: Animated width transition

### 🎨 Color Scheme
- **Savings Modal**: Gradient xanh cyan (`#06b6d4` → `#0891b2`)
- **Loan Modal**: Gradient tím (`#667eea` → `#764ba2`)
- **Alerts**: Vàng gradient (`#fff7ed` → `#ffedd5`)
- **Success**: Xanh lá (`#d1fae5`)
- **Warning**: Vàng cam (`#fef3c7`)

### 📱 Responsive Design
- Max width: 600px cho modal
- Max height: 90vh với scroll
- Padding adaptive cho mobile
- Grid layout auto-fit

---

## 📊 Activity Diagrams

Đã tạo **6 biểu đồ hoạt động** chi tiết trong `diagrams/activity/maturity/`:

### Tiết Kiệm:
1. `savings-withdraw.puml` - Rút tiền khi đáo hạn
2. `savings-renew-principal.puml` - Tái tục gốc, nhận lãi
3. `savings-renew-all.puml` - Tái tục gốc + lãi

### Khoản Vay:
1. `loan-payoff.puml` - Trả hết nợ
2. `loan-extension.puml` - Gia hạn khoản vay
3. `loan-restructure.puml` - Tái cấu trúc

---

## 🚀 Cách Test

### Test Tiết Kiệm:
1. Đăng nhập với tài khoản `CUS0001` (customer_id = 1)
2. Vào trang **Tổng quan** - Sẽ thấy banner cảnh báo 2 sổ đáo hạn
3. Click "Xử lý ngay" hoặc vào trang **Tiết kiệm**
4. Test các options: Rút tiền, Tái tục gốc, Tái tục gốc + lãi
5. Xem animation và validate dữ liệu

### Test Khoản Vay:
1. Đăng nhập với tài khoản `CUS0001`
2. Vào trang **Tổng quan** - Sẽ thấy banner cảnh báo 2 khoản vay
3. Click "Xử lý ngay" hoặc vào trang **Khoản vay**
4. Test các options: Trả hết nợ, Gia hạn, Tái cấu trúc
5. Kiểm tra validation số tiền và logic tính toán

---

## ⚠️ Lưu Ý

### ✅ Đã hoàn thành:
- Modal UI/UX đầy đủ
- Integration vào 3 trang (Overview, Savings, Loans)
- Mock data test cases
- Activity diagrams
- Responsive design
- Animations & transitions

### 🔜 Cần bổ sung (Backend):
- API endpoints để xử lý đáo hạn
- Integration với database
- Workflow phê duyệt từ Loan Officer
- Email/SMS notification
- Generate PDF biên lai
- Scheduled job kiểm tra đáo hạn tự động

---

## 📞 Support

Nếu có vấn đề khi test tính năng đáo hạn, kiểm tra:

1. **Modal không hiển thị?**
   - Check console log có lỗi
   - Verify mock data đã có đúng customer_id
   - Check maturity_date đúng format

2. **Styling bị lỗi?**
   - Clear browser cache
   - Verify CSS variables được define
   - Check z-index conflicts

3. **Logic không đúng?**
   - Verify daysUntilMaturity calculation
   - Check date comparison logic
   - Validate số tiền outstanding_balance

---

**Version**: 1.0  
**Last Updated**: 2025-11-01  
**Author**: Banking System Development Team

