# Activity Diagrams - Đáo Hạn (Maturity)

Thư mục này chứa các biểu đồ hoạt động chi tiết cho các tình huống đáo hạn.

## 📁 Cấu trúc

### Tiết Kiệm (Savings)

1. **savings-withdraw.puml** - Rút tiền về tài khoản
   - Khách hàng rút toàn bộ gốc + lãi về tài khoản thanh toán
   - Đóng sổ tiết kiệm

2. **savings-renew-principal.puml** - Tái tục gốc, nhận lãi
   - Khách hàng nhận lãi về tài khoản
   - Tái tục sổ mới với số tiền gốc cũ

3. **savings-renew-all.puml** - Tái tục gốc + lãi
   - Tái tục sổ mới với gốc + lãi (lãi kép)
   - Không rút tiền về tài khoản

### Khoản Vay (Loan)

1. **loan-payoff.puml** - Trả hết nợ khi đáo hạn
   - Khách hàng trả toàn bộ dư nợ gốc còn lại
   - Giải phóng tài sản thế chấp (nếu có)
   - Kết thúc hợp đồng vay

2. **loan-extension.puml** - Gia hạn khoản vay
   - Khách hàng yêu cầu gia hạn thêm thời gian
   - Cần phê duyệt từ Nhân viên Tín dụng
   - Tạo lịch trả nợ mới

3. **loan-restructure.puml** - Tái cấu trúc khoản vay
   - Thay đổi lãi suất, kỳ hạn, số tiền trả hàng tháng
   - Cần phê duyệt từ Nhân viên Tín dụng
   - Tạo lại toàn bộ lịch trả nợ

## 🎯 Mục đích

Các biểu đồ này được tách ra từ biểu đồ tổng hợp để:
- Dễ đọc và hiểu hơn
- Tập trung vào từng trường hợp cụ thể
- Dễ bảo trì và cập nhật
- Có thể tái sử dụng trong tài liệu

## 📝 Lưu ý

- Các biểu đồ đã được đơn giản hóa, chỉ tập trung vào luồng chính
- Loại bỏ các chi tiết kỹ thuật như SQL, transaction handling
- Sử dụng swimlanes để phân biệt vai trò (Hệ thống, Khách hàng, Nhân viên)

