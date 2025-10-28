# CHƯƠNG I. TỔNG QUAN

## 1. Giới thiệu đề tài

Trong kỷ nguyên số hóa và chuyển đổi số toàn diện, ngành ngân hàng đang trải qua những thay đổi mạnh mẽ để đáp ứng nhu cầu ngày càng cao của khách hàng. Năm 2025 đánh dấu giai đoạn bùng nổ của dịch vụ tài chính số (Digital Banking), khi người dùng mong muốn thực hiện mọi giao dịch tài chính một cách nhanh chóng, tiện lợi và an toàn thông qua các thiết bị số.

Tuy nhiên, nhiều ngân hàng, đặc biệt là các ngân hàng vừa và nhỏ, vẫn đang sử dụng hệ thống lạc hậu, phân mảnh giữa các phòng ban và chi nhánh. Điều này dẫn đến:
- **Trải nghiệm khách hàng kém**: Thời gian xử lý giao dịch chậm, phải đến chi nhánh cho nhiều nghiệp vụ
- **Rủi ro cao**: Khó kiểm soát tín dụng, dễ xảy ra gian lận
- **Chi phí vận hành lớn**: Nhiều công việc thủ công, sai sót dữ liệu
- **Khó cạnh tranh**: Không theo kịp các ngân hàng số và fintech

Việc xây dựng một **Hệ thống Quản lý Ngân hàng tích hợp** là yêu cầu cấp thiết để:
- Tự động hóa các nghiệp vụ ngân hàng cốt lõi
- Cung cấp trải nghiệm khách hàng hiện đại và liền mạch
- Tăng cường kiểm soát rủi ro và bảo mật
- Tối ưu hóa vận hành và giảm chi phí
- Nâng cao khả năng cạnh tranh trên thị trường

## 2. Mục tiêu của hệ thống

### 2.1. Mục tiêu chung
Xây dựng hệ thống quản lý ngân hàng toàn diện, hiện đại, đáp ứng đầy đủ các nghiệp vụ cốt lõi của một ngân hàng thương mại, từ quản lý khách hàng, tài khoản, giao dịch đến tín dụng và tiết kiệm.

### 2.2. Mục tiêu cụ thể

**Về khách hàng:**
- Cho phép khách hàng mở tài khoản trực tuyến dễ dàng
- Thực hiện giao dịch 24/7 (chuyển khoản, thanh toán, nạp/rút tiền)
- Đăng ký các sản phẩm tài chính (tiết kiệm, vay, thẻ) một cách thuận tiện
- Theo dõi tài khoản, lịch sử giao dịch real-time
- Giảm thời gian chờ đợi và tăng sự hài lòng

**Về nghiệp vụ:**
- Tự động hóa 80% các giao dịch thông thường
- Giảm thời gian xử lý hồ sơ vay từ 7 ngày xuống còn 2-3 ngày
- Tự động tính lãi tiết kiệm và vay theo tháng
- Cảnh báo tự động khi đến hạn thanh toán/đáo hạn
- Quản lý đồng bộ dữ liệu giữa các chi nhánh

**Về quản lý:**
- Giám sát real-time tình hình hoạt động của từng chi nhánh
- Báo cáo tự động về doanh số, nợ xấu, thanh khoản
- Phân tích hành vi khách hàng để đưa ra chính sách phù hợp
- Kiểm soát chặt chẽ rủi ro tín dụng

**Về bảo mật:**
- Bảo vệ tuyệt đối thông tin khách hàng và giao dịch
- Tuân thủ các chuẩn bảo mật ngân hàng quốc tế
- Phát hiện và ngăn chặn gian lận tự động

## 3. Phạm vi và đối tượng nghiên cứu

### 3.1. Phạm vi nghiên cứu

**Các nghiệp vụ chính được triển khai:**
1. **Quản lý khách hàng**: Đăng ký, xác thực, phân loại khách hàng (cá nhân/doanh nghiệp)
2. **Quản lý tài khoản**: 
   - Tài khoản thanh toán (checking account)
   - Tài khoản tiết kiệm (savings account)
   - Thẻ ghi nợ (debit card)
   - Thẻ tín dụng (credit card)
3. **Giao dịch ngân hàng**:
   - Nạp tiền (deposit)
   - Rút tiền (withdrawal)
   - Chuyển khoản nội bộ (internal transfer)
   - Chuyển khoản liên ngân hàng (interbank transfer)
   - Thanh toán hóa đơn (bill payment)
4. **Quản lý vay vốn**:
   - Đăng ký khoản vay
   - Thẩm định và phê duyệt
   - Giải ngân
   - Tính lãi và trả nợ định kỳ
   - Theo dõi nợ quá hạn
5. **Quản lý tiết kiệm**:
   - Mở sổ tiết kiệm
   - Tính lãi theo kỳ hạn
   - Đáo hạn và tái tục
   - Rút trước hạn
6. **Quản lý lãi suất**: Cấu hình lãi suất cho vay, tiết kiệm theo từng kỳ hạn
7. **Quản lý chi nhánh và nhân viên**
8. **Báo cáo và thống kê**

**Không bao gồm trong phạm vi:**
- Giao dịch chứng khoán, ngoại hối
- Bảo hiểm ngân hàng
- Tư vấn đầu tư tài chính

### 3.2. Đối tượng nghiên cứu

**Người dùng hệ thống:**

1. **Khách hàng (Customer)**
   - Khách hàng cá nhân: Người dân có nhu cầu sử dụng dịch vụ ngân hàng
   - Khách hàng doanh nghiệp: Công ty, tổ chức cần dịch vụ tài chính

2. **Nhân viên Giao dịch (Teller)**
   - Xử lý giao dịch tại quầy
   - Hỗ trợ khách hàng mở tài khoản
   - Xử lý nạp/rút tiền mặt

3. **Nhân viên Tín dụng (Loan Officer)**
   - Tiếp nhận hồ sơ vay
   - Thẩm định và đánh giá khả năng trả nợ
   - Phê duyệt/từ chối khoản vay
   - Theo dõi quá trình trả nợ

4. **Quản lý Chi nhánh (Branch Manager)**
   - Giám sát hoạt động chi nhánh
   - Phê duyệt giao dịch lớn
   - Quản lý nhân viên chi nhánh
   - Xem báo cáo chi nhánh

5. **Quản trị viên (Administrator)**
   - Cấu hình hệ thống
   - Quản lý người dùng và phân quyền
   - Cấu hình lãi suất, phí dịch vụ
   - Xem báo cáo toàn hệ thống

**Hệ thống bên ngoài:**
- **Payment Gateway**: Xử lý thanh toán thẻ quốc tế
- **Interbank System**: Kết nối với hệ thống liên ngân hàng (NAPAS, SWIFT)
- **SMS/Email Gateway**: Gửi thông báo, OTP
- **eKYC Service**: Xác thực danh tính điện tử

### 3.3. Giới hạn nghiên cứu

- Hệ thống được thiết kế cho ngân hàng thương mại quy mô vừa (10-50 chi nhánh)
- Tập trung vào các nghiệp vụ cốt lõi, chưa đi sâu vào các sản phẩm phái sinh
- Giao diện chủ yếu là web-based và mobile app
- Ngôn ngữ chính: Tiếng Việt, hỗ trợ Tiếng Anh

