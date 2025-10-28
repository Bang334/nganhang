# CHƯƠNG III. PHÂN TÍCH YÊU CẦU HỆ THỐNG

## 1. Yêu cầu chức năng

### 1.1. Chức năng theo Actor

#### 1.1.1. Guest (Khách vãng lai)
- Xem thông tin sản phẩm dịch vụ
- Xem lãi suất hiện tại
- Tìm chi nhánh gần nhất
- Đăng ký tài khoản mới
- **Không được phép**: Thực hiện giao dịch, xem thông tin tài khoản

#### 1.1.2. Customer (Khách hàng)

**Quản lý tài khoản:**
- Đăng nhập an toàn (2FA)
- Xem danh sách tài khoản của mình
- Xem số dư và thông tin chi tiết từng tài khoản
- Xem lịch sử giao dịch
- Thay đổi mật khẩu, thông tin cá nhân

**Giao dịch:**
- Chuyển khoản nội bộ (giữa các tài khoản của mình)
- Chuyển khoản cho người khác (nội bộ ngân hàng)
- Chuyển khoản liên ngân hàng
- Thanh toán hóa đơn
- Nạp tiền vào tài khoản (qua cổng thanh toán)
- Xem biên lai giao dịch

**Tiết kiệm:**
- Mở sổ tiết kiệm online
- Xem danh sách sổ tiết kiệm
- Xem lãi suất và lãi dự kiến
- Tất toán sổ tiết kiệm
- Tái tục sổ tiết kiệm

**Vay vốn:**
- Đăng ký khoản vay trực tuyến
- Upload hồ sơ vay
- Theo dõi tiến trình duyệt hồ sơ
- Xem lịch trả nợ
- Trả nợ trước hạn

**Thẻ:**
- Đăng ký thẻ ghi nợ/tín dụng
- Xem hạn mức và dư nợ thẻ
- Kích hoạt/khóa thẻ
- Xem giao dịch thẻ

**Thông báo:**
- Nhận thông báo giao dịch qua SMS/Email
- Nhận cảnh báo số dư thấp
- Nhận thông báo đáo hạn

#### 1.1.3. Teller (Nhân viên Giao dịch)

**Quản lý khách hàng:**
- Đăng ký khách hàng mới
- Cập nhật thông tin khách hàng
- Tra cứu thông tin khách hàng
- Xác minh danh tính khách hàng

**Quản lý tài khoản:**
- Mở tài khoản cho khách hàng
- Đóng tài khoản
- Đóng băng/mở băng tài khoản
- Cấp lại mật khẩu

**Giao dịch:**
- Xử lý nạp tiền tại quầy
- Xử lý rút tiền tại quầy
- Xử lý chuyển khoản theo yêu cầu
- In biên lai giao dịch

**Tiết kiệm:**
- Mở sổ tiết kiệm cho khách
- Xử lý đáo hạn tiết kiệm
- Xử lý rút trước hạn
- In sổ tiết kiệm

#### 1.1.4. Loan Officer (Nhân viên Tín dụng)

**Quản lý hồ sơ vay:**
- Tiếp nhận hồ sơ vay
- Kiểm tra tính đầy đủ của hồ sơ
- Yêu cầu bổ sung hồ sơ

**Thẩm định:**
- Đánh giá khả năng trả nợ
- Truy vấn lịch sử tín dụng (CIC)
- Định giá tài sản thế chấp
- Tính toán rủi ro

**Phê duyệt:**
- Phê duyệt khoản vay (trong thẩm quyền)
- Đề xuất phê duyệt lên cấp cao hơn
- Từ chối khoản vay (có lý do)

**Giải ngân:**
- Lập hợp đồng vay
- Thực hiện giải ngân
- Lập lịch trả nợ

**Theo dõi:**
- Theo dõi tình trạng trả nợ
- Nhắc nhở khách hàng đến hạn trả
- Xử lý nợ quá hạn
- Lập báo cáo chất lượng tín dụng

#### 1.1.5. Branch Manager (Quản lý Chi nhánh)

**Quản lý nhân viên:**
- Xem danh sách nhân viên chi nhánh
- Đánh giá hiệu suất nhân viên
- Phân công công việc

**Phê duyệt:**
- Phê duyệt giao dịch lớn (> hạn mức)
- Phê duyệt khoản vay (trong thẩm quyền)
- Phê duyệt mở/đóng tài khoản đặc biệt

**Báo cáo:**
- Xem báo cáo doanh thu chi nhánh
- Xem báo cáo giao dịch
- Xem báo cáo tín dụng
- Xem báo cáo huy động
- So sánh hiệu quả các tháng

**Giám sát:**
- Theo dõi hoạt động real-time
- Kiểm tra log giao dịch
- Xử lý khiếu nại khách hàng

#### 1.1.6. Administrator (Quản trị viên)

**Quản lý người dùng:**
- Tạo/sửa/xóa tài khoản nhân viên
- Phân quyền truy cập
- Khóa/mở khóa tài khoản
- Reset mật khẩu

**Quản lý chi nhánh:**
- Thêm/sửa/xóa chi nhánh
- Gán nhân viên vào chi nhánh
- Cấu hình thông tin chi nhánh

**Cấu hình hệ thống:**
- Cấu hình lãi suất vay/tiết kiệm
- Cấu hình phí giao dịch
- Cấu hình hạn mức giao dịch
- Cấu hình chính sách bảo mật

**Báo cáo tổng hợp:**
- Báo cáo toàn hệ thống
- So sánh giữa các chi nhánh
- Phân tích xu hướng
- Export dữ liệu

**Bảo trì:**
- Backup dữ liệu
- Restore dữ liệu
- Xem system logs
- Giám sát hiệu năng hệ thống

### 1.2. Tích hợp hệ thống bên ngoài

#### 1.2.1. Payment Gateway
- Xử lý thanh toán thẻ quốc tế (Visa, Mastercard, JCB)
- Pre-authorization (giữ tiền tạm thời)
- Capture (thực hiện giao dịch)
- Refund (hoàn tiền)
- 3D Secure authentication

#### 1.2.2. Interbank System (NAPAS, Citad)
- Chuyển khoản liên ngân hàng
- Truy vấn thông tin tài khoản
- Rút tiền ATM liên ngân hàng
- Thanh toán thẻ liên ngân hàng

#### 1.2.3. SMS/Email Gateway
- Gửi OTP xác thực
- Thông báo giao dịch thành công
- Cảnh báo bảo mật
- Nhắc lịch trả nợ/đáo hạn
- Marketing (với sự đồng ý)

#### 1.2.4. eKYC Service
- Xác thực CMND/CCCD
- Nhận diện khuôn mặt (face matching)
- Xác thực liveness (chống ảnh chụp)
- Trích xuất thông tin từ giấy tờ

#### 1.2.5. Credit Information Center (CIC)
- Truy vấn lịch sử tín dụng
- Báo cáo nợ xấu
- Cập nhật thông tin khoản vay
- Kiểm tra blacklist

## 2. Yêu cầu phi chức năng

### 2.1. Hiệu năng (Performance)

**Thời gian phản hồi:**
- Tra cứu thông tin: < 1 giây
- Giao dịch đơn giản (nạp/rút): < 2 giây
- Giao dịch phức tạp (chuyển khoản): < 3 giây
- Báo cáo: < 5 giây
- Tải trang web: < 2 giây

**Khả năng xử lý:**
- Hỗ trợ 1,000 - 5,000 người dùng đồng thời
- Xử lý 10,000 giao dịch/phút trong giờ cao điểm
- Database có thể lưu trữ 10 triệu khách hàng
- Lưu trữ 100 triệu giao dịch

**Tài nguyên:**
- Sử dụng CPU < 70% trong điều kiện bình thường
- Sử dụng RAM < 80%
- Database response time < 100ms cho truy vấn đơn giản

### 2.2. Tính sẵn sàng và độ tin cậy (Availability & Reliability)

**Uptime:**
- Hệ thống hoạt động 24/7/365
- Availability: 99.9% (downtime < 8.76 giờ/năm)
- Bảo trì có lên lịch trước, trong khung giờ ít giao dịch (2-5 AM)

**Backup và Recovery:**
- Backup dữ liệu tự động hàng ngày
- Full backup hàng tuần
- Incremental backup hàng giờ
- Recovery Time Objective (RTO): < 4 giờ
- Recovery Point Objective (RPO): < 1 giờ

**Fault Tolerance:**
- Hệ thống có khả năng chịu lỗi (redundancy)
- Tự động failover khi server chính gặp sự cố
- Không mất dữ liệu khi xảy ra lỗi

**Data Integrity:**
- Đảm bảo ACID cho mọi giao dịch
- Không cho phép số dư âm (trừ thấu chi được phê duyệt)
- Không duplicate giao dịch
- Tổng tiền vào = tổng tiền ra + số dư hiện tại

### 2.3. Bảo mật (Security)

**Xác thực (Authentication):**
- Username/Password mạnh (min 8 ký tự, chữ hoa, số, ký tự đặc biệt)
- Two-Factor Authentication (2FA) cho giao dịch quan trọng
- Khóa tài khoản sau 3 lần nhập sai mật khẩu
- Session timeout sau 15 phút không hoạt động
- Không lưu mật khẩu dạng plain text (hash với bcrypt/argon2)

**Phân quyền (Authorization):**
- Role-Based Access Control (RBAC)
- Principle of Least Privilege
- Phân quyền chi tiết đến từng chức năng
- Audit log cho mọi thay đổi phân quyền

**Mã hóa (Encryption):**
- HTTPS cho mọi kết nối web (TLS 1.3)
- Mã hóa dữ liệu nhạy cảm trong database (AES-256)
- Mã hóa end-to-end cho giao dịch quan trọng
- Mã hóa dữ liệu backup

**Bảo mật giao dịch:**
- Tuân thủ PCI DSS cho xử lý thẻ
- Tokenization cho thông tin thẻ
- 3D Secure cho thanh toán online
- OTP qua SMS cho xác nhận giao dịch

**Audit và Monitoring:**
- Log mọi giao dịch (ai, làm gì, khi nào, từ đâu)
- Phát hiện giao dịch bất thường (fraud detection)
- Cảnh báo real-time khi có hành vi đáng ngờ
- Lưu log tối thiểu 7 năm

**Tuân thủ:**
- Tuân thủ Luật An toàn thông tin mạng
- Tuân thủ Nghị định Bảo vệ dữ liệu cá nhân
- Tuân thủ quy định của Ngân hàng Nhà nước
- ISO 27001 (nếu có thể)

### 2.4. Khả năng mở rộng (Scalability)

**Horizontal Scaling:**
- Kiến trúc microservices cho phép scale từng module
- Load balancer để phân tải
- Stateless services
- Có thể thêm server khi cần

**Vertical Scaling:**
- Database có thể nâng cấp phần cứng
- Tối ưu query để giảm tải

**Database Scaling:**
- Sharding theo chi nhánh hoặc customer ID
- Read replicas cho truy vấn
- Caching (Redis) cho dữ liệu thường xuyên truy cập

**Mở rộng tính năng:**
- Plugin architecture
- API-first design
- Dễ dàng tích hợp dịch vụ mới

### 2.5. Tính dễ sử dụng (Usability)

**Giao diện người dùng:**
- Thiết kế responsive (desktop, tablet, mobile)
- Giao diện thân thiện, trực quan
- Tuân thủ Material Design hoặc Bootstrap
- Hỗ trợ dark mode

**Ngôn ngữ:**
- Đa ngôn ngữ: Tiếng Việt, Tiếng Anh
- Dễ dàng thêm ngôn ngữ mới

**Accessibility:**
- Tuân thủ WCAG 2.1 Level AA
- Hỗ trợ screen reader
- Keyboard navigation
- Color contrast đạt chuẩn

**Trợ giúp:**
- Hướng dẫn sử dụng từng tính năng
- FAQ
- Chatbot hỗ trợ 24/7
- Hotline

### 2.6. Khả năng bảo trì (Maintainability)

**Code Quality:**
- Clean code, đặt tên rõ ràng
- Comment đầy đủ
- Tuân thủ coding convention
- Code coverage > 80%

**Documentation:**
- API documentation (Swagger/OpenAPI)
- Database schema documentation
- User manual
- Developer guide

**Monitoring:**
- Application Performance Monitoring (APM)
- Log aggregation (ELK stack)
- Metrics dashboard (Grafana)
- Alert khi có lỗi

**DevOps:**
- CI/CD pipeline
- Automated testing
- Infrastructure as Code
- Container (Docker, Kubernetes)

### 2.7. Tuân thủ pháp lý (Compliance)

**Ngân hàng Nhà nước Việt Nam:**
- Tuân thủ các thông tư, nghị định về ngân hàng
- Báo cáo định kỳ theo quy định
- Tỷ lệ an toàn vốn (CAR)

**Thuế:**
- Hóa đơn điện tử tuân thủ quy định
- Báo cáo thuế tự động
- Kết nối với cơ quan thuế

**Bảo vệ dữ liệu cá nhân:**
- Thu thập dữ liệu có sự đồng ý
- Quyền được xóa dữ liệu
- Quyền được truy cập dữ liệu cá nhân
- Báo cáo sự cố rò rỉ dữ liệu

**Chống rửa tiền (AML):**
- Xác thực danh tính khách hàng (KYC)
- Giám sát giao dịch đáng ngờ
- Báo cáo giao dịch lớn
- Blacklist screening

