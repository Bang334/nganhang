# CHƯƠNG II. KHẢO SÁT NGHIỆP VỤ VÀ YÊU CẦU CHO HỆ THỐNG

## 1. Nghiệp vụ

### 1.1. Quản lý Khách hàng

**Quy trình đăng ký khách hàng mới:**
- Khách hàng cung cấp thông tin cá nhân (CMND/CCCD, họ tên, địa chỉ, số điện thoại, email)
- Nhân viên hoặc hệ thống eKYC xác thực thông tin
- Hệ thống tạo mã khách hàng (Customer ID) duy nhất
- Lưu trữ thông tin khách hàng vào cơ sở dữ liệu
- Phân loại khách hàng: cá nhân/doanh nghiệp, VIP/thường

**Quản lý thông tin:**
- Cập nhật thông tin khi khách hàng thay đổi (địa chỉ, số điện thoại, email)
- Theo dõi lịch sử giao dịch của khách hàng
- Đánh giá mức độ tín nhiệm (credit score)
- Phân loại khách hàng để áp dụng chính sách ưu đãi

### 1.2. Quản lý Tài khoản

**Mở tài khoản:**
- Khách hàng chọn loại tài khoản (thanh toán, tiết kiệm, thẻ)
- Nhân viên kiểm tra điều kiện mở tài khoản
- Hệ thống tạo số tài khoản duy nhất
- Nạp tiền mở tài khoản (nếu yêu cầu)
- Kích hoạt tài khoản

**Loại tài khoản:**

1. **Tài khoản thanh toán (Checking Account)**
   - Không có lãi suất hoặc lãi suất thấp
   - Không giới hạn số lần giao dịch
   - Có thể rút tiền bất kỳ lúc nào
   - Phát hành thẻ ATM/Debit

2. **Tài khoản tiết kiệm (Savings Account)**
   - Có lãi suất cao hơn
   - Có kỳ hạn (1 tháng, 3 tháng, 6 tháng, 12 tháng, 24 tháng)
   - Rút trước hạn mất lãi hoặc phạt
   - Tự động gia hạn khi đáo hạn (nếu khách chọn)

3. **Thẻ tín dụng (Credit Card)**
   - Có hạn mức tín dụng
   - Tính lãi trên dư nợ
   - Có kỳ thanh toán định kỳ hàng tháng
   - Phí thường niên

**Quản lý trạng thái tài khoản:**
- Hoạt động (Active)
- Đóng băng (Frozen) - do yêu cầu hoặc vi phạm
- Đã đóng (Closed)

### 1.3. Giao dịch Ngân hàng

**1.3.1. Nạp tiền (Deposit)**
- Khách hàng đến quầy hoặc qua máy ATM/chuyển khoản
- Nhân viên/hệ thống xác nhận số tiền
- Cập nhật số dư tài khoản
- In biên lai/gửi thông báo

**1.3.2. Rút tiền (Withdrawal)**
- Khách hàng yêu cầu rút tiền
- Hệ thống kiểm tra số dư
- Kiểm tra hạn mức rút tiền (nếu có)
- Trừ tiền khỏi tài khoản
- Xuất tiền và biên lai

**1.3.3. Chuyển khoản (Transfer)**

*Chuyển khoản nội bộ:*
- Khách hàng nhập thông tin người nhận (số tài khoản, số tiền)
- Hệ thống kiểm tra số dư
- Kiểm tra tài khoản người nhận có tồn tại
- Trừ tiền tài khoản nguồn
- Cộng tiền tài khoản đích
- Ghi nhận giao dịch (transaction log)
- Gửi thông báo cho cả 2 bên

*Chuyển khoản liên ngân hàng:*
- Thêm bước kết nối với hệ thống liên ngân hàng (NAPAS)
- Thu phí giao dịch liên ngân hàng
- Thời gian xử lý có thể lâu hơn

**1.3.4. Thanh toán hóa đơn (Bill Payment)**
- Khách hàng chọn loại hóa đơn (điện, nước, điện thoại, internet...)
- Nhập mã khách hàng của dịch vụ
- Hệ thống truy vấn số tiền phải trả
- Xác nhận và thanh toán
- Gửi biên nhận

### 1.4. Quản lý Vay vốn

**Quy trình vay vốn:**

1. **Đăng ký khoản vay**
   - Khách hàng điền đơn vay (số tiền, mục đích, thời hạn)
   - Cung cấp hồ sơ chứng minh thu nhập, tài sản đảm bảo
   
2. **Thẩm định hồ sơ**
   - Nhân viên tín dụng kiểm tra hồ sơ
   - Đánh giá khả năng trả nợ
   - Xác minh tài sản thế chấp (nếu có)
   - Kiểm tra lịch sử tín dụng tại CIC (Credit Information Center)
   
3. **Phê duyệt**
   - Nhân viên tín dụng hoặc Quản lý chi nhánh phê duyệt
   - Khoản vay lớn cần phê duyệt từ cấp cao hơn
   - Có thể từ chối hoặc điều chỉnh điều kiện
   
4. **Giải ngân**
   - Ký hợp đồng vay
   - Chuyển tiền vào tài khoản khách hàng
   - Lập lịch trả nợ
   
5. **Trả nợ**
   - Trả định kỳ theo tháng (gốc + lãi)
   - Có thể trả trước hạn (có thể phạt hoặc không)
   - Tự động trừ từ tài khoản thanh toán hoặc khách nộp tiền
   
6. **Theo dõi nợ**
   - Nhắc nhở khi đến hạn trả
   - Cảnh báo khi quá hạn
   - Xử lý nợ xấu (quá hạn > 90 ngày)

**Loại hình vay:**
- Vay tiêu dùng (consumer loan)
- Vay mua nhà (mortgage)
- Vay mua xe (auto loan)
- Vay kinh doanh (business loan)

**Phương thức tính lãi:**
- Lãi suất cố định (fixed rate)
- Lãi suất thả nổi (floating rate)
- Trả gốc đều, lãi giảm dần
- Trả nợ gốc + lãi đều hàng tháng (annuity)

### 1.5. Quản lý Tiết kiệm

**Quy trình gửi tiết kiệm:**

1. **Mở sổ tiết kiệm**
   - Khách hàng chọn kỳ hạn (1, 3, 6, 12, 24 tháng...)
   - Chọn số tiền gửi (tối thiểu theo quy định)
   - Chọn phương thức nhận lãi:
     - Nhận lãi cuối kỳ
     - Nhận lãi định kỳ (hàng tháng/quý)
     - Lãi gộp vào gốc
   
2. **Tính lãi**
   - Lãi đơn: `Lãi = Gốc × Lãi_suất × Thời_gian`
   - Lãi kép: `Lãi = Gốc × (1 + Lãi_suất)^Thời_gian - Gốc`
   - Tính lãi tự động vào ngày đáo hạn hoặc định kỳ
   
3. **Đáo hạn**
   - Hệ thống tự động tính tổng tiền (gốc + lãi)
   - Thông báo cho khách hàng
   - Khách hàng chọn:
     - Rút tiền về tài khoản thanh toán
     - Tái tục với lãi suất hiện tại
     - Tái tục cả gốc lẫn lãi
   
4. **Rút trước hạn**
   - Khách hàng yêu cầu rút trước hạn
   - Tính lãi theo lãi suất không kỳ hạn (thấp hơn)
   - Có thể có phí phạt
   - Chuyển tiền về tài khoản

### 1.6. Quản lý Lãi suất

**Lãi suất cho vay:**
- Căn cứ vào lãi suất cơ bản của Ngân hàng Nhà nước
- Điều chỉnh theo rủi ro của khách hàng (credit scoring)
- Thay đổi theo loại hình vay
- Quản lý cập nhật theo từng thời kỳ

**Lãi suất tiết kiệm:**
- Phân theo kỳ hạn: kỳ hạn càng dài, lãi suất càng cao
- Phân theo số tiền gửi: số tiền lớn có thể có lãi ưu đãi
- Lãi suất không kỳ hạn (rút bất kỳ): thấp nhất
- Cập nhật và công bố công khai

**Bảng lãi suất mẫu:**

| Kỳ hạn | Lãi suất/năm |
|--------|--------------|
| Không kỳ hạn | 0.5% |
| 1 tháng | 3.0% |
| 3 tháng | 4.0% |
| 6 tháng | 5.0% |
| 12 tháng | 6.0% |
| 24 tháng | 6.5% |

### 1.7. Quản lý Chi nhánh và Nhân viên

**Quản lý chi nhánh:**
- Thông tin chi nhánh (tên, địa chỉ, số điện thoại)
- Giám đốc chi nhánh
- Số lượng nhân viên
- Danh sách khách hàng thuộc chi nhánh
- Hiệu quả hoạt động (doanh số, lợi nhuận)

**Quản lý nhân viên:**
- Thông tin cá nhân
- Chức vụ (Teller, Loan Officer, Branch Manager, Admin)
- Chi nhánh làm việc
- Phân quyền truy cập hệ thống
- Theo dõi hiệu suất công việc

### 1.8. Báo cáo và Thống kê

**Báo cáo định kỳ:**
- Báo cáo doanh thu theo ngày/tháng/quý/năm
- Báo cáo số lượng giao dịch
- Báo cáo dư nợ cho vay
- Báo cáo huy động tiết kiệm
- Báo cáo nợ xấu
- Báo cáo thanh khoản

**Thống kê:**
- Số lượng khách hàng mới
- Top khách hàng giao dịch nhiều nhất
- Hiệu quả từng chi nhánh
- Xu hướng tăng/giảm của các chỉ số

## 2. Yêu cầu

### 2.1. Yêu cầu về chức năng

**Đối với Khách hàng:**
- Đăng ký tài khoản trực tuyến
- Đăng nhập an toàn (username/password + OTP)
- Xem thông tin tài khoản, số dư
- Thực hiện giao dịch (chuyển khoản, thanh toán)
- Mở tài khoản tiết kiệm
- Đăng ký khoản vay trực tuyến
- Xem lịch sử giao dịch
- Nhận thông báo qua SMS/Email

**Đối với Nhân viên Giao dịch:**
- Đăng nhập với tài khoản nhân viên
- Mở tài khoản cho khách hàng
- Xử lý giao dịch nạp/rút tiền
- In biên lai giao dịch
- Tra cứu thông tin khách hàng
- Đóng băng/mở băng tài khoản

**Đối với Nhân viên Tín dụng:**
- Tiếp nhận hồ sơ vay
- Thẩm định hồ sơ
- Phê duyệt/từ chối khoản vay
- Theo dõi tình trạng trả nợ
- Xử lý nợ quá hạn
- Lập báo cáo chất lượng tín dụng

**Đối với Quản lý Chi nhánh:**
- Quản lý nhân viên chi nhánh
- Phê duyệt giao dịch lớn
- Xem báo cáo hiệu quả chi nhánh
- Giám sát hoạt động hàng ngày

**Đối với Quản trị viên:**
- Quản lý toàn bộ người dùng
- Cấu hình lãi suất
- Cấu hình phí dịch vụ
- Quản lý chi nhánh
- Xem báo cáo toàn hệ thống
- Backup và phục hồi dữ liệu

### 2.2. Yêu cầu về tích hợp

- **Payment Gateway**: Tích hợp cổng thanh toán quốc tế (Visa, Mastercard)
- **Interbank**: Kết nối NAPAS, Citad để chuyển khoản liên ngân hàng
- **SMS Gateway**: Gửi OTP và thông báo giao dịch
- **Email Service**: Gửi sao kê, thông báo đáo hạn
- **eKYC**: Xác thực danh tính điện tử
- **Credit Bureau (CIC)**: Truy vấn lịch sử tín dụng

### 2.3. Yêu cầu về nghiệp vụ

- Hệ thống phải xử lý giao dịch đồng thời (concurrent transactions)
- Đảm bảo tính nhất quán dữ liệu (ACID properties)
- Không được phép số dư âm (overdraft protection)
- Tính lãi tự động vào cuối ngày/tháng
- Tự động cảnh báo đáo hạn tiết kiệm, trả nợ
- Khóa tài khoản sau 3 lần nhập sai mật khẩu
- Log toàn bộ giao dịch để audit

