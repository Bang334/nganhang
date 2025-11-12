# BÁO CÁO ĐỒ ÁN
# HỆ THỐNG QUẢN LÝ NGÂN HÀNG

---

## I. TỔNG QUAN

### 1.1. Giới thiệu hệ thống

Hệ thống Quản lý Ngân hàng là một ứng dụng web toàn diện được thiết kế để quản lý và vận hành các hoạt động nghiệp vụ cốt lõi của một ngân hàng thương mại. Hệ thống cung cấp các chức năng từ quản lý khách hàng, tài khoản, giao dịch, cho đến các sản phẩm tín dụng và tiết kiệm.

Hệ thống được xây dựng với kiến trúc client-server, sử dụng công nghệ web hiện đại nhằm đảm bảo tính linh hoạt, khả năng mở rộng và trải nghiệm người dùng tối ưu.

### 1.2. Mục tiêu

**Mục tiêu chính:**
- Số hóa và tự động hóa các quy trình nghiệp vụ ngân hàng
- Cung cấp công cụ quản lý tập trung cho toàn bộ hoạt động ngân hàng
- Nâng cao trải nghiệm khách hàng thông qua giao diện thân thiện và dễ sử dụng
- Đảm bảo tính chính xác, minh bạch trong mọi giao dịch

**Mục tiêu cụ thể:**
- Quản lý thông tin khách hàng và tài khoản một cách hiệu quả
- Xử lý giao dịch tài chính nhanh chóng và an toàn
- Tự động hóa quy trình cho vay và đánh giá tín dụng
- Quản lý sổ tiết kiệm và tính toán lãi suất tự động
- Cung cấp báo cáo và thống kê theo thời gian thực

### 1.3. Phạm vi

**Phạm vi chức năng:**

Hệ thống bao gồm 4 module chính phục vụ các đối tượng người dùng khác nhau:

1. **Module Khách hàng:**
   - Quản lý tài khoản cá nhân
   - Thực hiện giao dịch (nạp, rút, chuyển khoản)
   - Đăng ký sản phẩm tiết kiệm
   - Đăng ký khoản vay
   - Tra cứu điểm tín dụng
   - Quản lý tài sản thế chấp

2. **Module Giao dịch viên (Teller):**
   - Mở tài khoản mới cho khách hàng
   - Xử lý giao dịch tại quầy
   - Kích hoạt thẻ ngân hàng
   - Hỗ trợ khách hàng

3. **Module Nhân viên Tín dụng:**
   - Thẩm định hồ sơ vay
   - Phê duyệt/Từ chối khoản vay
   - Thẩm định tài sản thế chấp
   - Quản lý điểm tín dụng
   - Xử lý nợ quá hạn

4. **Module Quản trị viên:**
   - Quản lý chi nhánh
   - Quản lý nhân viên
   - Xem báo cáo tổng hợp

**Phạm vi kỹ thuật:**
- Frontend: React Application với giao diện responsive
- Backend: RESTful API (trong thiết kế)
- Database: MySQL 8.0 với InnoDB engine
- Bảo mật: Authentication và Authorization theo vai trò

**Ngoài phạm vi:**
- Tích hợp với ngân hàng khác (chỉ mô phỏng)
- Xử lý giao dịch thực tế qua cổng thanh toán
- Kết nối với Trung tâm thông tin tín dụng (CIC)
- Xử lý biometric/sinh trắc học

---

## II. XÁC ĐỊNH YÊU CẦU

### 1. Khảo sát hệ thống

#### 1.1. Phương pháp nghiên cứu thực tiễn

**Phương pháp thu thập thông tin:**

1. **Phỏng vấn chuyên gia:**
   - Trao đổi với nhân viên ngân hàng về quy trình nghiệp vụ
   - Tìm hiểu về các sản phẩm dịch vụ phổ biến
   - Nghiên cứu các quy định về tín dụng và tiết kiệm

2. **Quan sát thực tế:**
   - Quan sát quy trình làm việc tại quầy giao dịch
   - Theo dõi luồng xử lý hồ sơ vay
   - Tìm hiểu cách thức phục vụ khách hàng

3. **Nghiên cứu tài liệu:**
   - Nghiên cứu các hệ thống ngân hàng hiện có
   - Tham khảo tài liệu về banking domain
   - Tìm hiểu về credit scoring và risk management

4. **Phân tích yêu cầu:**
   - Xác định các actor và use case chính
   - Phân tích luồng nghiệp vụ cho từng chức năng
   - Xác định các ràng buộc và quy tắc nghiệp vụ

#### 1.2. Phương pháp tổng hợp và phân tích số liệu

**Quy trình phân tích:**

1. **Thu thập và phân loại dữ liệu:**
   - Phân loại theo nghiệp vụ: Khách hàng, Tài khoản, Giao dịch, Tín dụng, Tiết kiệm
   - Xác định mối quan hệ giữa các đối tượng nghiệp vụ
   - Lập danh sách các quy tắc và ràng buộc

2. **Mô hình hóa nghiệp vụ:**
   - Sử dụng UML để mô hình hóa hệ thống
   - Xây dựng use case diagram để xác định chức năng
   - Thiết kế class diagram để xác định cấu trúc dữ liệu

3. **Xác thực và đánh giá:**
   - Đối chiếu với các hệ thống thực tế
   - Xem xét tính khả thi và hiệu quả
   - Điều chỉnh và tối ưu hóa

### 2. Phân tích hiện trạng

**Thực trạng nghiệp vụ ngân hàng:**

1. **Quản lý khách hàng:**
   - Thông tin khách hàng cần được lưu trữ đầy đủ và bảo mật
   - Cần có cơ chế đánh giá tín dụng khách hàng
   - Phân loại khách hàng theo nhiều tiêu chí

2. **Quản lý tài khoản:**
   - Nhiều loại tài khoản (thanh toán, tiết kiệm)
   - Cần theo dõi số dư và lịch sử giao dịch
   - Quản lý thẻ ngân hàng liên kết với tài khoản

3. **Xử lý giao dịch:**
   - Giao dịch nạp/rút tiền tại quầy
   - Chuyển khoản nội bộ và liên ngân hàng
   - Cần đảm bảo tính toàn vẹn dữ liệu (ACID)

4. **Quản lý tín dụng:**
   - Quy trình cho vay phức tạp với nhiều bước thẩm định
   - Cần đánh giá khả năng trả nợ và tài sản thế chấp
   - Theo dõi lịch trả nợ và xử lý nợ quá hạn
   - Tính toán và cập nhật điểm tín dụng

5. **Quản lý tiết kiệm:**
   - Nhiều kỳ hạn với lãi suất khác nhau
   - Xử lý đáo hạn (rút tiền, tái tục)
   - Tính lãi tự động

**Các vấn đề cần giải quyết:**
- Tự động hóa quy trình thẩm định và phê duyệt vay
- Tính toán điểm tín dụng động dựa trên hành vi khách hàng
- Xử lý đáo hạn tự động cho sổ tiết kiệm và khoản vay
- Cảnh báo và xử lý nợ quá hạn theo các mức độ nghiêm trọng

### 3. Đặc tả yêu cầu

#### 3.1. Yêu cầu chức năng

**RF-01: Quản lý Tổ chức**
- Quản lý thông tin chi nhánh (mã chi nhánh, tên, địa chỉ, quản lý)
- Quản lý vai trò và phân quyền
- Quản lý thông tin nhân viên (mã NV, chi nhánh, vai trò, trạng thái)

**RF-02: Quản lý Khách hàng**
- Đăng ký khách hàng mới (thông tin cá nhân, CMND, thu nhập)
- Cập nhật thông tin khách hàng
- Quản lý điểm tín dụng và lịch sử thay đổi
- Phân loại khách hàng theo độ tín nhiệm

**RF-03: Quản lý Tài khoản**
- Mở tài khoản mới (thanh toán, tiết kiệm)
- Đóng tài khoản
- Tra cứu số dư và lịch sử giao dịch
- Phát hành và kích hoạt thẻ ngân hàng

**RF-04: Quản lý Giao dịch**
- Nạp tiền tại quầy (tối thiểu 10,000đ)
- Rút tiền tại quầy (50,000đ - 5,000,000đ)
- Chuyển khoản nội bộ (miễn phí)
- Chuyển khoản liên ngân hàng (phí 5,000đ)
- Lưu trữ lịch sử giao dịch đầy đủ

**RF-05: Quản lý Tiết kiệm**
- Mở sổ tiết kiệm (tối thiểu 1,000,000đ)
- Áp dụng lãi suất theo kỳ hạn (1, 3, 6, 12, 24 tháng)
- Tính lãi tự động
- Xử lý đáo hạn (rút tiền, tái tục gốc, tái tục gốc + lãi)
- Cho phép rút sớm (bị phạt lãi suất)

**RF-06: Quản lý Tín dụng**

*6.1. Đăng ký và Thẩm định:*
- Khách hàng đăng ký khoản vay (có/không thế chấp)
- Kiểm tra điều kiện sơ bộ cho vay không thế chấp
- Thẩm định tài sản thế chấp và tính LTV (≤70%)
- Nhân viên tín dụng xem xét và quyết định

*6.2. Phê duyệt:*
- Xem điểm tín dụng và thông tin khách hàng
- Tính lãi suất đề xuất dựa trên credit score (9%-12%)
- Phê duyệt với số tiền, lãi suất, kỳ hạn cụ thể
- Tạo lịch trả nợ tự động

*6.3. Trả nợ:*
- Trả nợ tự động (từ tài khoản)
- Trả nợ thủ công (chọn số kỳ)
- Cập nhật điểm tín dụng khi trả đúng hạn (+5 điểm)
- Trả hết nợ: tăng điểm +15, giải phóng tài sản

*6.4. Xử lý Quá hạn:*
- 1-7 ngày: Gửi thông báo nhắc nhở
- 8-30 ngày: Giảm 5 điểm tín dụng, tính phí trễ
- 31-90 ngày: Giảm 20 điểm, nhân viên can thiệp
- >90 ngày: Hạ điểm xuống 300-400, xử lý pháp lý

**RF-07: Quản lý Tài sản Thế chấp**
- Đăng ký tài sản (bất động sản, xe, tài sản khác)
- Thẩm định giá trị tài sản
- Phê duyệt/Từ chối tài sản
- Đánh dấu trạng thái (Chờ duyệt, Sẵn sàng, Đang sử dụng)
- Giải phóng tài sản khi kết thúc vay

**RF-08: Xử lý Đáo hạn**

*8.1. Đáo hạn Tiết kiệm:*
- Thông báo trước 7 ngày
- Rút về tài khoản (gốc + lãi)
- Tái tục gốc (nhận lãi về tài khoản)
- Tái tục gốc + lãi (lãi kép)
- Tự động tái tục nếu đã cài đặt

*8.2. Đáo hạn Khoản vay:*
- Thông báo trước 30 ngày
- Trả hết nợ và kết thúc
- Gia hạn thêm thời gian (cần phê duyệt)
- Tái cấu trúc khoản vay (đổi lãi suất, kỳ hạn)

#### 3.2. Yêu cầu phi chức năng

**NFR-01: Hiệu năng**
- Thời gian phản hồi giao dịch < 2 giây
- Hỗ trợ ít nhất 1000 user đồng thời
- Xử lý 10,000 giao dịch/giờ

**NFR-02: Bảo mật**
- Mã hóa password bằng bcrypt
- Xác thực bằng JWT token
- Phân quyền theo vai trò (RBAC)
- Mã hóa thông tin nhạy cảm (số thẻ, CMND)

**NFR-03: Độ tin cậy**
- Uptime ≥ 99.5%
- Backup database hàng ngày
- Khôi phục dữ liệu khi có sự cố

**NFR-04: Khả năng mở rộng**
- Kiến trúc module hóa
- Dễ dàng thêm tính năng mới
- Hỗ trợ mở rộng theo chiều ngang

**NFR-05: Khả năng sử dụng**
- Giao diện thân thiện, trực quan
- Responsive trên nhiều thiết bị
- Hỗ trợ tiếng Việt đầy đủ

**NFR-06: Tính tương thích**
- Hoạt động trên các trình duyệt phổ biến (Chrome, Firefox, Edge)
- Hỗ trợ mobile browser

---

## III. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 1. Yêu cầu chức năng

Hệ thống phục vụ 4 nhóm người dùng chính với các chức năng đặc thù:

**1.1. Chức năng dành cho Khách hàng:**
- Đăng nhập và quản lý hồ sơ cá nhân
- Xem danh sách tài khoản và số dư
- Thực hiện chuyển khoản (nội bộ và liên ngân hàng)
- Mở sổ tiết kiệm và theo dõi lãi suất
- Đăng ký khoản vay với/không thế chấp
- Đăng ký tài sản thế chấp
- Tra cứu điểm tín dụng
- Trả nợ khoản vay (tự động/thủ công)
- Xử lý đáo hạn (tiết kiệm và khoản vay)

**1.2. Chức năng dành cho Giao dịch viên:**
- Mở tài khoản mới cho khách hàng
- Nạp tiền tại quầy
- Rút tiền tại quầy
- Kích hoạt thẻ ngân hàng
- In biên lai giao dịch

**1.3. Chức năng dành cho Nhân viên Tín dụng:**
- Xem danh sách hồ sơ chờ duyệt
- Thẩm định hồ sơ vay
- Thẩm định tài sản thế chấp
- Phê duyệt/Từ chối khoản vay
- Quản lý điểm tín dụng
- Xem danh sách nợ quá hạn
- Xử lý nợ quá hạn theo mức độ

**1.4. Chức năng dành cho Quản trị viên:**
- Quản lý chi nhánh
- Quản lý nhân viên
- Xem báo cáo và thống kê
- Quản lý cấu hình hệ thống

### 2. Phân tích yêu cầu

#### 2.1. Mô hình hóa chức năng

**2.1.1. Biểu đồ Use Case**

Hệ thống được mô hình hóa với 4 actor chính:
- **Khách hàng**: Sử dụng các dịch vụ ngân hàng cá nhân
- **Giao dịch viên**: Xử lý giao dịch tại quầy
- **Nhân viên Tín dụng**: Thẩm định và quản lý khoản vay
- **Quản trị viên**: Quản lý hệ thống và tổ chức

Các use case chính được nhóm thành 6 nhóm nghiệp vụ:
1. Quản lý tài khoản
2. Giao dịch tài chính
3. Sản phẩm tiết kiệm
4. Sản phẩm tín dụng
5. Quản lý tín nhiệm
6. Quản trị hệ thống

**2.1.2. Biểu đồ Hoạt động (Activity Diagram)**

Hệ thống bao gồm 11 luồng hoạt động chính:

*Nhóm Tài khoản và Giao dịch:*
1. **Mở tài khoản**: Giao dịch viên nhập thông tin → Kiểm tra hợp lệ → Tạo tài khoản
2. **Nạp/Rút tiền**: Nhập thông tin → Kiểm tra điều kiện → Xử lý giao dịch → In biên lai
3. **Chuyển khoản**: Chọn tài khoản nguồn → Nhập thông tin người nhận → Kiểm tra số dư → Thực hiện chuyển → Tính phí (nếu liên NH)

*Nhóm Tiết kiệm:*
4. **Mở tiết kiệm**: Chọn kỳ hạn → Nhập số tiền → Tính lãi dự kiến → Xác nhận → Tạo sổ
5. **Đáo hạn tiết kiệm**: Nhận thông báo → Chọn xử lý (Rút/Tái tục gốc/Tái tục gốc+lãi) → Xác nhận → Xử lý theo lựa chọn

*Nhóm Tín dụng:*
6. **Đăng ký vay**: Nhập thông tin → Kiểm tra có thế chấp → Tính LTV (nếu có) → Kiểm tra điều kiện → Tạo hồ sơ
7. **Thẩm định vay**: Xem hồ sơ → Phân tích (LTV/Credit Score) → Tính lãi suất đề xuất → Nhân viên quyết định → Phê duyệt/Từ chối
8. **Trả nợ hàng tháng**: Chọn phương thức (Tự động/Thủ công) → Kiểm tra số dư → Trừ tiền → Cập nhật lịch → Cập nhật điểm tín dụng
9. **Xử lý nợ quá hạn**: Job chạy hàng ngày → Phân loại theo số ngày → Xử lý theo mức độ → Giảm điểm tín dụng → Gửi thông báo
10. **Đáo hạn khoản vay**: Nhận thông báo → Chọn xử lý (Trả hết/Gia hạn/Tái cấu trúc) → Phê duyệt (nếu cần) → Xử lý

*Nhóm Khác:*
11. **Kích hoạt thẻ**: Khách hàng đến quầy → Xác minh danh tính → Nhập mã kích hoạt → Kích hoạt thẻ

**2.1.3. Biểu đồ Trình tự (Sequence Diagram)**

Các biểu đồ trình tự chi tiết tương tác giữa các thành phần cho các use case chính:

*Nhóm Tài khoản:*
- **Mở tài khoản**: Giao dịch viên ↔ Hệ thống ↔ Database (Customers, Accounts)
- **Nạp tiền**: Giao dịch viên ↔ Hệ thống ↔ Database (Accounts, Transactions)
- **Rút tiền**: Giao dịch viên ↔ Hệ thống ↔ Database (kiểm tra số dư → trừ tiền)

*Nhóm Giao dịch:*
- **Chuyển khoản**: Khách hàng ↔ Hệ thống → Kiểm tra TK nguồn → Kiểm tra TK đích → Xử lý chuyển → Ghi nhận

*Nhóm Tiết kiệm:*
- **Mở tiết kiệm**: Khách hàng ↔ Hệ thống → Load lãi suất → Tính toán → Trừ tiền TK → Tạo sổ

*Nhóm Tín dụng:*
- **Đăng ký vay**: Khách hàng ↔ Hệ thống → Kiểm tra điều kiện → Tính LTV → Tạo hồ sơ → Đánh dấu tài sản
- **Thẩm định vay**: Nhân viên ↔ Hệ thống → Load thông tin → Tính toán → Quyết định → Cập nhật trạng thái → Tạo lịch trả nợ

*Nhóm Khác:*
- **Kích hoạt thẻ**: Giao dịch viên ↔ Hệ thống → Kiểm tra thẻ → Xác minh mã → Kích hoạt

#### 2.2. Mô hình hóa cấu trúc

**2.2.1. Biểu đồ Lớp (Class Diagram)**

Hệ thống bao gồm 21 bảng dữ liệu được tổ chức thành 6 nhóm chức năng:

*Nhóm 1: Quản lý Tổ chức (3 bảng)*
- **Branches**: Chi nhánh (mã, tên, địa chỉ, quản lý, trạng thái)
- **Roles**: Vai trò (tên, mô tả)
- **Employees**: Nhân viên (mã NV, chi nhánh, vai trò, thông tin, tài khoản)

*Nhóm 2: Quản lý Khách hàng (3 bảng)*
- **Customers**: Khách hàng (thông tin cá nhân, CMND, thu nhập, tài khoản)
- **CreditScores**: Điểm tín dụng hiện tại (điểm, hạng, các chỉ số)
- **CreditScoreHistory**: Lịch sử thay đổi điểm (lý do, sự kiện, thay đổi)

*Nhóm 3: Quản lý Tài khoản (3 bảng)*
- **AccountTypes**: Loại tài khoản (thanh toán, tiết kiệm, lãi suất)
- **Accounts**: Tài khoản (số TK, khách hàng, loại, số dư, trạng thái)
- **Cards**: Thẻ ngân hàng (số thẻ, tài khoản, loại, ngày hết hạn)

*Nhóm 4: Giao dịch (2 bảng)*
- **TransactionTypes**: Loại giao dịch (nạp, rút, chuyển khoản)
- **Transactions**: Giao dịch (mã GD, loại, TK nguồn/đích, số tiền, phí, trạng thái)

*Nhóm 5: Tiết kiệm (3 bảng)*
- **SavingsInterestRates**: Lãi suất tiết kiệm (kỳ hạn, mức tiền, lãi suất)
- **SavingsDeposits**: Sổ tiết kiệm (số sổ, gốc, lãi suất, kỳ hạn, trạng thái)
- **SavingsTransactions**: Giao dịch tiết kiệm (gửi, rút, tái tục)

*Nhóm 6: Tín dụng (7 bảng)*
- **CollateralTypes**: Loại tài sản (bất động sản, xe, LTV tối đa)
- **Collaterals**: Tài sản thế chấp (tên, giá trị, thẩm định, trạng thái)
- **LoanTypes**: Loại vay (mua nhà, xe, tiêu dùng, hạn mức)
- **LoanInterestRates**: Lãi suất vay (loại vay, hạng tín dụng, lãi suất)
- **Loans**: Khoản vay (số hồ sơ, số tiền, lãi suất, kỳ hạn, trạng thái, dư nợ)
- **LoanPaymentSchedule**: Lịch trả nợ (kỳ, ngày, gốc, lãi, trạng thái)
- **LoanPayments**: Thanh toán vay (kỳ trả, số tiền, phương thức)

**Mối quan hệ chính:**
- Customers (1) ↔ (n) Accounts
- Customers (1) ↔ (1) CreditScores
- Accounts (1) ↔ (n) Transactions (from/to)
- Accounts (1) ↔ (n) SavingsDeposits
- Accounts (1) ↔ (n) Loans
- Customers (1) ↔ (n) Collaterals
- Loans (1) ↔ (0..1) Collaterals
- Loans (1) ↔ (n) LoanPaymentSchedule
- Loans (1) ↔ (n) LoanPayments

**2.2.2. Biểu đồ Gói (Package Diagram)**

Hệ thống được tổ chức theo kiến trúc 3 tầng:

*Tầng Presentation (Frontend):*
- **Pages**: 5 dashboard theo vai trò (Customer, Teller, Loan Officer, Admin, Login)
- **Components**: 
  - customer (15 components): quản lý tài khoản, giao dịch, vay, tiết kiệm
  - teller (8 components): mở TK, nạp/rút, kích hoạt thẻ
  - loanOfficer (10 components): thẩm định vay, quản lý tín dụng, nợ quá hạn
  - admin (5 components): quản lý chi nhánh, nhân viên, báo cáo
  - common (2 components): Modal, Profile
- **Data**: mockData (dữ liệu demo)
- **Styles**: CSS cho các module

*Tầng Application (Backend - thiết kế):*
- **API Server**: Node.js/Express
- **Controllers**: Xử lý request/response
- **Services**: Business logic
- **Models**: ORM models

*Tầng Data:*
- **Database**: MySQL 8.0
- **Tables**: 21 bảng dữ liệu
- **Stored Procedures**: Các thủ tục xử lý nghiệp vụ

**2.2.3. Biểu đồ Thành phần (Component Diagram)**

Kiến trúc hệ thống bao gồm các layer:

*Client Layer:*
- Web Browser
- React Application (Customer/Teller/LoanOfficer/Admin Portal)
- Authentication Module
- API Client

*API Layer:*
- API Gateway
- REST API Services (Auth, Account, Transaction, Loan, Savings, CreditScore)

*Business Logic Layer:*
- Account Manager
- Transaction Processor
- Loan Manager
- Credit Score Calculator
- Interest Calculator
- Payment Scheduler

*Data Layer:*
- MySQL Database (21 tables)
- Cache Server (Redis - sessions, balances)
- File Storage (documents)

*External Services:*
- Email Service
- SMS Gateway
- Payment Gateway
- Credit Bureau (CIC)

#### 2.3. Mô hình hóa hành vi

**2.3.1. Biểu đồ Trạng thái (State Diagram)**

Hệ thống bao gồm 5 biểu đồ trạng thái chính:

*Biểu đồ 1: Trạng thái Khoản Vay*
- **PENDING** (Chờ duyệt): Hồ sơ mới nộp, chờ thẩm định
- **APPROVED** (Đã duyệt): Đã phê duyệt, chuẩn bị giải ngân
- **ACTIVE** (Hoạt động): Đang trả nợ định kỳ
- **OVERDUE** (Quá hạn): Trễ hạn trả nợ
- **PAID_OFF** (Đã trả xong): Hoàn tất, giải phóng tài sản
- **REJECTED** (Từ chối): Không đạt yêu cầu

Chuyển đổi: PENDING → APPROVED → ACTIVE ↔ OVERDUE → PAID_OFF

*Biểu đồ 2: Trạng thái Lịch Trả Nợ*
- **PENDING** (Chờ trả): Chưa đến hạn
- **PAID** (Đã trả): Đã thanh toán đủ
- **OVERDUE** (Quá hạn): Quá ngày đáo hạn chưa trả
- **PARTIAL_PAID** (Trả một phần): Trả chưa đủ số tiền

Chuyển đổi: PENDING → PAID/OVERDUE/PARTIAL_PAID → PAID

*Biểu đồ 3: Trạng thái Sổ Tiết Kiệm*
- **ACTIVE** (Đang gửi): Đang tích lũy lãi
- **MATURED** (Đã đáo hạn): Đến kỳ, chờ xử lý
- **CLOSED** (Đã đóng): Đã rút tiền
- **WITHDRAWN_EARLY** (Rút sớm): Rút trước hạn, bị phạt

Chuyển đổi: ACTIVE → MATURED → CLOSED hoặc ACTIVE → WITHDRAWN_EARLY → CLOSED

*Biểu đồ 4: Trạng thái Tài Khoản*
- **ACTIVE** (Hoạt động): Có thể giao dịch
- **CLOSED** (Đã đóng): Không thể giao dịch

Chuyển đổi: ACTIVE → CLOSED

*Biểu đồ 5: Trạng thái Tài Sản Thế Chấp*
- **PENDING** (Chờ duyệt): Mới đăng ký, chờ thẩm định
- **AVAILABLE** (Sẵn sàng): Đã duyệt, có thể dùng
- **IN_USE** (Đang dùng): Đang thế chấp cho khoản vay
- **REJECTED** (Từ chối): Không đạt yêu cầu

Chuyển đổi: PENDING → AVAILABLE → IN_USE → AVAILABLE (khi giải phóng)

### 3. Thiết kế hệ thống

#### 3.1. Thiết kế lớp (Chuyển từ mức phân tích sang mức thiết kế)

**3.1.1. Cấu trúc Class chính**

Từ mô hình phân tích, các class được thiết kế chi tiết với đầy đủ thuộc tính và phương thức:

*Class Customers (Khách hàng):*
- **Attributes**: customer_id (PK), customer_code (unique), full_name, email (unique), phone (unique), id_card_number, date_of_birth, gender, address, occupation, monthly_income, registered_branch_id (FK), username (unique), password_hash, status, created_at
- **Methods**: register(), updateProfile(), changePassword(), getCreditScore(), getAccounts(), getLoans()

*Class Accounts (Tài khoản):*
- **Attributes**: account_id (PK), account_number (unique), customer_id (FK), account_type_id (FK), branch_id (FK), balance, interest_rate, opened_date, status, created_at
- **Methods**: deposit(), withdraw(), getBalance(), getTransactions(), close()

*Class Loans (Khoản vay):*
- **Attributes**: loan_id (PK), loan_number (unique), customer_id (FK), account_id (FK), loan_type_id (FK), loan_amount, approved_amount, interest_rate, term_months, monthly_payment, collateral_id (FK), outstanding_balance, application_date, approved_date, maturity_date, status, created_at
- **Methods**: apply(), approve(), reject(), disburse(), makePayment(), calculatePayment(), checkOverdue()

*Class CreditScores (Điểm tín dụng):*
- **Attributes**: score_id (PK), customer_id (FK unique), score, grade, interest_rate, max_ltv, on_time_payment_rate, debt_to_income_ratio, account_age_months, total_outstanding_debt, late_payments, monthly_income, last_updated
- **Methods**: calculate(), update(), getHistory(), adjustScore()

**3.1.2. Relationships Implementation**

- **Aggregation**: Customer có nhiều Account, Customer có nhiều Loan
- **Composition**: Loan có nhiều LoanPaymentSchedule (xóa Loan → xóa Schedule)
- **Association**: Loan liên kết với Collateral (có thể null)
- **Dependency**: LoanPayment phụ thuộc vào Transaction

#### 3.2. Thiết kế CSDL (Chuyển đổi từ mức quan niệm sang mức vật lý)

**3.2.1. Từ Class Diagram sang Physical Schema**

*Chuyển đổi Classes → Tables:*
- Mỗi class nghiệp vụ → 1 table trong database
- Attributes → Columns với kiểu dữ liệu phù hợp
- Primary Key: INT AUTO_INCREMENT
- Foreign Key: Tham chiếu với ON DELETE CASCADE hoặc SET NULL

*Các quyết định thiết kế:*
- Sử dụng **InnoDB engine** để hỗ trợ transaction và foreign key
- **UTF8MB4** charset để hỗ trợ Unicode đầy đủ
- Thêm **INDEX** trên các cột thường được query (email, phone, account_number)
- Sử dụng **ENUM** cho các trường có giá trị cố định
- **DECIMAL(18,2)** cho các trường tiền tệ đảm bảo chính xác
- **TIMESTAMP** cho các trường thời gian với DEFAULT CURRENT_TIMESTAMP

#### 3.3. Mô tả CSDL

**3.3.1. Nhóm Quản lý Tổ chức**

*Bảng Branches (Chi nhánh):*
- Lưu thông tin các chi nhánh của ngân hàng
- branch_code (VARCHAR 20): Mã chi nhánh duy nhất
- manager_id: Tham chiếu đến Employees (quản lý chi nhánh)
- status: ACTIVE/INACTIVE

*Bảng Roles (Vai trò):*
- Định nghĩa các vai trò trong hệ thống
- role_name (VARCHAR 50): CUSTOMER, TELLER, LOAN_OFFICER, ADMIN
- Sử dụng cho phân quyền

*Bảng Employees (Nhân viên):*
- Lưu thông tin nhân viên ngân hàng
- employee_code (VARCHAR 20): Mã nhân viên duy nhất
- branch_id: Chi nhánh làm việc
- role_id: Vai trò (quyền hạn)
- username/password_hash: Đăng nhập hệ thống

**3.3.2. Nhóm Quản lý Khách hàng**

*Bảng Customers (Khách hàng):*
- Lưu thông tin đầy đủ khách hàng
- customer_code (VARCHAR 20): Mã KH duy nhất
- email, phone: UNIQUE (không trùng lặp)
- id_card_number: Số CMND/CCCD
- monthly_income: Thu nhập (dùng để đánh giá tín dụng)
- registered_branch_id: Chi nhánh đăng ký ban đầu

*Bảng CreditScores (Điểm tín dụng):*
- Lưu điểm tín dụng hiện tại của khách hàng
- score (300-850): Thang điểm chuẩn
- grade: Hạng tín dụng (AAA đến C)
- interest_rate: Lãi suất áp dụng dựa trên điểm
- max_ltv: LTV tối đa được phép
- Các chỉ số: on_time_payment_rate, debt_to_income_ratio, late_payments

*Bảng CreditScoreHistory (Lịch sử điểm):*
- Lưu mọi thay đổi điểm tín dụng
- old_score, new_score, score_change: Theo dõi thay đổi
- event_type: Loại sự kiện (PAYMENT_ON_TIME, PAYMENT_LATE, LOAN_APPROVED, v.v.)
- event_reference: Tham chiếu đến giao dịch/khoản vay gây ra thay đổi
- reason: Mô tả lý do thay đổi

**3.3.3. Nhóm Quản lý Tài khoản**

*Bảng AccountTypes (Loại tài khoản):*
- Định nghĩa các loại tài khoản
- type_code: CHECKING, SAVINGS
- min_balance: Số dư tối thiểu
- interest_rate: Lãi suất (nếu có)

*Bảng Accounts (Tài khoản):*
- Lưu thông tin tài khoản ngân hàng
- account_number (VARCHAR 20): Số tài khoản duy nhất
- customer_id: Chủ tài khoản
- account_type_id: Loại tài khoản
- balance (DECIMAL 18,2): Số dư hiện tại
- opened_date: Ngày mở
- status: ACTIVE/CLOSED

*Bảng Cards (Thẻ):*
- Lưu thông tin thẻ ngân hàng
- card_number (VARCHAR 255): Số thẻ (đã mã hóa)
- account_id: Tài khoản liên kết
- card_type: DEBIT/CREDIT
- expiry_date: Ngày hết hạn
- status: ACTIVE/LOCKED/EXPIRED

**3.3.4. Nhóm Giao dịch**

*Bảng TransactionTypes (Loại giao dịch):*
- Định nghĩa các loại giao dịch
- type_code: DEPOSIT, WITHDRAWAL, TRANSFER, LOAN_DISBURSEMENT, v.v.

*Bảng Transactions (Giao dịch):*
- Lưu mọi giao dịch tài chính
- transaction_code (VARCHAR 50): Mã GD duy nhất
- transaction_type_id: Loại giao dịch
- from_account_id, to_account_id: TK nguồn/đích (nullable)
- from_bank_name, to_bank_name: Tên ngân hàng (cho liên NH)
- amount (DECIMAL 18,2): Số tiền
- fee: Phí giao dịch
- balance_after: Số dư sau GD
- status: PENDING/SUCCESS/FAILED
- transaction_date: Thời điểm giao dịch

**3.3.5. Nhóm Tiết kiệm**

*Bảng SavingsInterestRates (Lãi suất):*
- Lưu biểu lãi suất theo kỳ hạn
- term_months: Kỳ hạn (1, 3, 6, 12, 24)
- min_amount, max_amount: Mức tiền áp dụng
- interest_rate: Lãi suất %/năm
- effective_from, effective_to: Thời gian hiệu lực

*Bảng SavingsDeposits (Sổ tiết kiệm):*
- Lưu thông tin sổ tiết kiệm
- deposit_number (VARCHAR 20): Số sổ duy nhất
- principal_amount: Tiền gốc gửi
- interest_rate: Lãi suất áp dụng
- term_months: Kỳ hạn
- start_date, maturity_date: Ngày mở/đáo hạn
- auto_renew: Tự động tái tục (YES/NO)
- total_interest_earned: Tổng lãi đã tích lũy
- status: ACTIVE/MATURED/CLOSED/WITHDRAWN_EARLY

*Bảng SavingsTransactions (Giao dịch TK):*
- Lưu các giao dịch liên quan sổ tiết kiệm
- transaction_type: INITIAL_DEPOSIT, INTEREST_PAYMENT, MATURITY_WITHDRAWAL, RENEWAL, EARLY_WITHDRAWAL
- amount, interest_amount: Số tiền gốc/lãi

**3.3.6. Nhóm Tín dụng**

*Bảng CollateralTypes (Loại tài sản):*
- Định nghĩa loại tài sản thế chấp
- type_code: REAL_ESTATE, VEHICLE, OTHER
- max_ltv: LTV tối đa cho phép (%)

*Bảng Collaterals (Tài sản thế chấp):*
- Lưu thông tin tài sản đảm bảo
- collateral_name: Tên tài sản
- original_value: Giá trị ban đầu
- appraised_value: Giá trị thẩm định
- appraised_by: Nhân viên thẩm định
- certificate_number: Số giấy chứng nhận
- status: PENDING/AVAILABLE/IN_USE/REJECTED

*Bảng LoanTypes (Loại vay):*
- Định nghĩa sản phẩm cho vay
- type_code: MORTGAGE, AUTO, CONSUMER, BUSINESS
- max_amount: Hạn mức tối đa
- max_term_months: Thời hạn tối đa
- require_collateral: Có yêu cầu thế chấp (YES/NO)

*Bảng LoanInterestRates (Lãi suất vay):*
- Biểu lãi suất cho vay
- loan_type_id: Loại vay
- min_amount, max_amount: Mức tiền
- term_months_from, term_months_to: Kỳ hạn
- credit_grade: Hạng tín dụng (AAA-C)
- base_rate: Lãi suất cơ bản
- effective_from, effective_to: Thời gian áp dụng

*Bảng Loans (Khoản vay):*
- Lưu thông tin khoản vay chi tiết
- loan_number (VARCHAR 20): Số hồ sơ duy nhất
- loan_amount: Số tiền yêu cầu
- approved_amount: Số tiền được duyệt
- interest_rate: Lãi suất áp dụng
- term_months: Thời hạn vay
- monthly_payment: Số tiền trả hàng tháng
- collateral_id: Tài sản thế chấp (nullable)
- ltv_ratio: Tỷ lệ LTV (nếu có thế chấp)
- outstanding_balance: Dư nợ còn lại
- application_date: Ngày nộp hồ sơ
- approved_date, approved_by: Thông tin phê duyệt
- disbursement_date: Ngày giải ngân
- first_payment_date: Ngày trả kỳ đầu
- maturity_date: Ngày đáo hạn
- status: PENDING/APPROVED/REJECTED/ACTIVE/PAID_OFF/OVERDUE

*Bảng LoanPaymentSchedule (Lịch trả nợ):*
- Lịch trả nợ chi tiết từng kỳ
- payment_number: Kỳ thứ mấy
- due_date: Ngày đáo hạn
- principal_amount: Gốc phải trả
- interest_amount: Lãi phải trả
- total_payment: Tổng phải trả
- outstanding_balance: Dư nợ còn lại sau kỳ này
- status: PENDING/PAID/OVERDUE/PARTIAL_PAID
- paid_amount, paid_date: Thông tin thanh toán

*Bảng LoanPayments (Thanh toán vay):*
- Lưu các lần thanh toán thực tế
- loan_id, schedule_id: Liên kết khoản vay và kỳ
- principal_paid, interest_paid, late_fee_paid: Chi tiết thanh toán
- total_paid: Tổng đã trả
- payment_method: AUTO_DEBIT/CASH/TRANSFER/ONLINE
- reference_number: Mã tham chiếu

#### 3.2. Thiết kế CSDL (Chuyển đổi từ mức quan niệm sang mức vật lý)

**3.2.1. Database Configuration**

- **Database Name**: BankManagementSystem
- **Charset**: utf8mb4 (hỗ trợ Unicode đầy đủ)
- **Collation**: utf8mb4_unicode_ci
- **Engine**: InnoDB (hỗ trợ transaction, foreign key)

**3.2.2. Naming Convention**

- **Tables**: PascalCase (VD: Customers, LoanPayments)
- **Columns**: snake_case (VD: customer_id, full_name)
- **Primary Key**: [table_name]_id
- **Foreign Key**: [referenced_table]_id
- **Index**: idx_[table]_[column]

**3.2.3. Data Types Mapping**

| Kiểu logic | Kiểu vật lý | Mô tả |
|------------|-------------|-------|
| ID | INT AUTO_INCREMENT | Khóa chính |
| Code | VARCHAR(20) | Mã nghiệp vụ |
| Name | VARCHAR(200) | Tên, họ tên |
| Email | VARCHAR(100) | Email |
| Money | DECIMAL(18,2) | Tiền tệ |
| Rate | DECIMAL(5,2) | Lãi suất, tỷ lệ |
| Status | ENUM | Trạng thái cố định |
| Date | DATE | Ngày |
| DateTime | TIMESTAMP | Ngày giờ |
| Description | VARCHAR(500) | Mô tả ngắn |
| Details | TEXT | Nội dung dài |

#### 3.4. Thiết kế và mô tả các ràng buộc CSDL

**3.4.1. Ràng buộc toàn vẹn (Integrity Constraints)**

*Primary Key Constraints:*
- Mỗi bảng có 1 khóa chính duy nhất
- AUTO_INCREMENT đảm bảo không trùng lặp
- Được đánh index tự động

*Unique Constraints:*
- customer_code, employee_code, branch_code: Mã nghiệp vụ không trùng
- email, phone: Email và SĐT khách hàng duy nhất
- account_number, card_number: Số TK/thẻ không trùng
- loan_number, deposit_number: Số hồ sơ/sổ không trùng
- username: Tên đăng nhập không trùng

*Foreign Key Constraints:*
- **ON DELETE CASCADE**: LoanPaymentSchedule, SavingsTransactions → Xóa khi xóa parent
- **ON DELETE SET NULL**: CreditScoreHistory.created_by → Giữ lịch sử khi xóa nhân viên
- **ON DELETE RESTRICT** (mặc định): Không cho xóa nếu còn dữ liệu liên quan

**3.4.2. Ràng buộc miền (Domain Constraints)**

*Check Constraints:*
- principal_amount > 0: Số tiền gửi/vay phải dương
- amount > 0: Số tiền giao dịch phải dương
- score >= 300 AND score <= 850: Điểm tín dụng trong khoảng chuẩn

*ENUM Constraints:*
- gender: 'M', 'F', 'OTHER'
- status (Account): 'ACTIVE', 'CLOSED'
- status (Loan): 'PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'PAID_OFF', 'OVERDUE'
- status (SavingsDeposits): 'ACTIVE', 'MATURED', 'CLOSED', 'WITHDRAWN_EARLY'
- status (LoanPaymentSchedule): 'PENDING', 'PAID', 'OVERDUE', 'PARTIAL_PAID'
- card_type: 'DEBIT', 'CREDIT'
- payment_method: 'AUTO_DEBIT', 'CASH', 'TRANSFER', 'ONLINE'

*DEFAULT Values:*
- status: Mặc định 'ACTIVE' hoặc 'PENDING' tùy context
- balance: Mặc định 0
- fee: Mặc định 0
- created_at: CURRENT_TIMESTAMP

**3.4.3. Ràng buộc nghiệp vụ (Business Rules)**

*Ràng buộc về Tài khoản:*
- Số tiền mở tài khoản tối thiểu: 100,000 VND
- Số dư tài khoản không được âm
- Mỗi khách hàng có thể có nhiều tài khoản

*Ràng buộc về Giao dịch:*
- Nạp tiền tối thiểu: 10,000 VND
- Rút tiền: 50,000 - 5,000,000 VND
- Phí chuyển khoản liên ngân hàng: 5,000 VND
- Chuyển khoản nội bộ: Miễn phí

*Ràng buộc về Tiết kiệm:*
- Số tiền gửi tối thiểu: 1,000,000 VND
- Lãi suất theo kỳ hạn: 1 tháng (2%), 3 tháng (3%), 6 tháng (4.5%), 12 tháng (6%)
- Rút sớm: Chỉ nhận lãi suất không kỳ hạn (thấp hơn)

*Ràng buộc về Tín dụng:*
- Vay không thế chấp: 
  - Tối đa 200,000,000 VND
  - Thu nhập tối thiểu: 15,000,000 VND/tháng
  - Số tiền vay ≤ 10 lần thu nhập
  - Credit score ≥ 600 (đề xuất ≥ 700)
  - Tỷ lệ nợ/thu nhập ≤ 50%

- Vay có thế chấp:
  - LTV ≤ 70% (Loan-to-Value ratio)
  - Tài sản phải được thẩm định và phê duyệt
  - Giá trị thẩm định = Giá trị cho vay tối đa / 0.7

- Lãi suất dựa trên Credit Score:
  - Score ≥ 700: 9%/năm
  - Score ≥ 600: 10%/năm
  - Score < 600: 12%/năm

*Ràng buộc về Điểm tín dụng:*
- Điểm ban đầu: 650 (hạng BBB)
- Trả nợ đúng hạn: +5 điểm
- Trả hết khoản vay: +15 điểm
- Quá hạn 8-30 ngày: -5 điểm
- Quá hạn 31-90 ngày: -20 điểm
- Quá hạn >90 ngày: Hạ xuống 300-400 điểm

**3.4.4. Indexes và Optimization**

*Indexes được tạo:*
- Primary Key: Auto index
- Unique constraints: Auto index
- Foreign Keys: Auto index
- Business indexes:
  - idx_employee_code, idx_employee_email
  - idx_customer_code, idx_customer_email
  - idx_account_number, idx_account_customer, idx_account_status
  - idx_transaction_code, idx_transaction_from, idx_transaction_date
  - idx_loan_number, idx_loan_customer, idx_loan_status
  - idx_schedule_loan, idx_schedule_status
  - idx_savings_customer, idx_savings_status

*Mục đích:*
- Tăng tốc độ query
- Tối ưu JOIN operations
- Cải thiện performance khi filter theo status

#### 3.5. Thiết kế giao diện

**3.5.1. Nguyên tắc thiết kế**

*Design System:*
- **Color Palette**: 
  - Primary: Blue (#3b82f6) - Tin cậy, chuyên nghiệp
  - Success: Green (#10b981) - Thành công
  - Warning: Orange (#f59e0b) - Cảnh báo
  - Danger: Red (#ef4444) - Lỗi, quá hạn
  - Secondary: Gray (#6b7280) - Phụ

- **Typography**:
  - Font: System font stack (San Francisco, Segoe UI)
  - Sizes: 0.75rem - 2rem
  - Weights: 400 (normal), 600 (semibold), 700 (bold)

- **Spacing**: Sử dụng hệ thống 8px base (0.5rem, 1rem, 1.5rem, 2rem)

- **Components**: Card, Modal, Button, Input, Badge, Alert

*UX Principles:*
- **Consistency**: Giao diện đồng nhất trên toàn hệ thống
- **Feedback**: Luôn có phản hồi với mọi hành động
- **Error Prevention**: Validation và cảnh báo trước khi submit
- **Progressive Disclosure**: Hiển thị thông tin theo từng bước

**3.5.2. Layout Structure**

*Dashboard Layout:*
- **Sidebar**: Navigation menu theo vai trò
- **Header**: User profile, logout
- **Main Content**: Nội dung chính thay đổi theo route
- **Cards**: Hiển thị thông tin theo module

*Form Design:*
- **Multi-step Forms**: Chia nhỏ form phức tạp (Mở TK, Đăng ký vay)
- **Validation**: Real-time validation với feedback rõ ràng
- **Preview**: Hiển thị xem trước trước khi xác nhận

*Data Display:*
- **Tables**: Hiển thị danh sách với filter, search
- **Cards**: Hiển thị thông tin tóm tắt
- **Charts**: Biểu đồ cho báo cáo (future)

**3.5.3. Giao diện theo Module**

*Module Khách hàng:*
- **Dashboard**: Tổng quan tài khoản, sổ tiết kiệm, khoản vay
- **Tài khoản**: Danh sách TK, số dư, lịch sử giao dịch
- **Chuyển khoản**: Form chuyển khoản với preview
- **Tiết kiệm**: Danh sách sổ, mở sổ mới, xử lý đáo hạn
- **Vay vốn**: Đăng ký vay, theo dõi hồ sơ, trả nợ
- **Tài sản**: Đăng ký tài sản thế chấp
- **Điểm tín dụng**: Xem điểm, lịch sử, đề xuất cải thiện

*Module Giao dịch viên:*
- **Dashboard**: Thống kê giao dịch trong ngày
- **Mở tài khoản**: Form multi-step với validation
- **Nạp tiền**: Form nhập thông tin → Xác nhận → In biên lai
- **Rút tiền**: Tương tự nạp tiền với kiểm tra số dư
- **Kích hoạt thẻ**: Quét/nhập số thẻ → Xác minh → Kích hoạt

*Module Nhân viên Tín dụng:*
- **Dashboard**: Tổng quan hồ sơ (Chờ/Duyệt/Từ chối/Quá hạn)
- **Hồ sơ chờ duyệt**: Table với filter, search, sort
- **Chi tiết hồ sơ**: Hiển thị đầy đủ thông tin KH, điểm tín dụng, LTV
- **Thẩm định**: Form phê duyệt với lãi suất đề xuất
- **Quản lý điểm**: Xem chi tiết điểm tín dụng khách hàng
- **Nợ quá hạn**: Danh sách và xử lý nợ quá hạn

*Module Quản trị:*
- **Dashboard**: Báo cáo tổng hợp
- **Chi nhánh**: CRUD chi nhánh
- **Nhân viên**: CRUD nhân viên
- **Báo cáo**: Thống kê theo thời gian

**3.5.4. Đặc điểm giao diện**

*Responsive Design:*
- Desktop: Layout 2-3 cột
- Tablet: Layout 1-2 cột
- Mobile: Single column với menu collapsible

*Interactive Elements:*
- **Modal**: Hiển thị form và chi tiết
- **Tabs**: Chuyển đổi giữa các view
- **Dropdown**: Filter và select options
- **Progress Bar**: Hiển thị tiến độ trả nợ, tiết kiệm
- **Badge**: Status indicators

*Color Coding:*
- Số tiền dương: Màu xanh
- Số tiền âm: Màu đỏ
- Status PENDING: Màu vàng/cam
- Status ACTIVE: Màu xanh
- Status OVERDUE: Màu đỏ
- LTV hợp lệ: Nền xanh nhạt
- LTV vượt quá: Nền đỏ nhạt

#### 3.6. Biểu đồ Triển khai (Deployment Diagram)

**3.6.1. Kiến trúc Triển khai**

Hệ thống được triển khai trên kiến trúc client-server 3 tầng:

*Client Tier:*
- **Client Devices**: Web Browser, Mobile App
- Truy cập ứng dụng qua HTTPS

*Web Tier:*
- **Web Server**: Nginx/Apache
- Phục vụ static files (HTML, CSS, JS)
- Serve React build files
- Port: 80 (HTTP), 443 (HTTPS)

*Application Tier:*
- **Application Server**: Node.js Runtime
- Express Framework
- RESTful API endpoints
- Business logic processing
- Port: 3000 hoặc 5000

*Data Tier:*
- **Database Server**: MySQL 8.0
- InnoDB Storage Engine
- 21 tables với relationships
- Port: 3306
- Charset: UTF8MB4

**3.6.2. Luồng Deployment**

1. Client gửi HTTPS request → Web Server
2. Web Server serve React App (static files)
3. React App gọi API → Application Server
4. Application Server xử lý logic → Query Database
5. Database trả về dữ liệu → Application Server
6. Application Server format response → React App
7. React App render UI → Client

**3.6.3. Cấu hình Server**

*Web Server:*
- Nginx hoặc Apache HTTP Server
- SSL/TLS certificate
- Gzip compression
- Static file caching

*Application Server:*
- Node.js v18+
- PM2 Process Manager (production)
- Environment variables (.env)
- CORS configuration

*Database Server:*
- MySQL 8.0+
- InnoDB engine
- Max connections: 200
- Query cache enabled

---

## IV. KẾT LUẬN

### 1. Kết quả đạt được

#### 1.1. Ưu điểm

**Về phân tích và thiết kế:**
- Đã xây dựng được hệ thống mô hình UML hoàn chỉnh bao gồm:
  - 1 Use Case Diagram tổng quan
  - 8 Sequence Diagram chi tiết
  - 11 Activity Diagram cho các luồng nghiệp vụ
  - 5 State Diagram cho các entity quan trọng
  - 1 Class Diagram đầy đủ (21 classes)
  - 1 Package Diagram
  - 1 Component Diagram
  - 1 Deployment Diagram
  
- Thiết kế cơ sở dữ liệu chuẩn hóa tốt:
  - 21 bảng với mối quan hệ rõ ràng
  - Đầy đủ constraints và indexes
  - Tuân thủ naming convention
  - Tối ưu performance

- Phân tích nghiệp vụ sâu:
  - Xác định đúng các actor và use case
  - Phân tích chi tiết luồng xử lý
  - Xây dựng business rules cụ thể

**Về triển khai:**
- Đã xây dựng giao diện frontend hoàn chỉnh với React
- 40+ components được tổ chức theo module
- Giao diện thân thiện, trực quan
- Responsive trên nhiều thiết bị

**Về tính năng:**
- Đầy đủ chức năng cốt lõi của một hệ thống ngân hàng
- Hệ thống điểm tín dụng động
- Xử lý đáo hạn linh hoạt
- Xử lý nợ quá hạn tự động theo mức độ

**Về kỹ thuật:**
- Code structure rõ ràng, dễ bảo trì
- Sử dụng công nghệ hiện đại
- Có khả năng mở rộng tốt

#### 1.2. Nhược điểm

**Về triển khai:**
- Backend chưa được implement đầy đủ
- Hiện đang sử dụng mock data thay vì API thực
- Chưa có authentication thực sự
- Chưa có database connection

**Về tính năng:**
- Chưa tích hợp với hệ thống bên ngoài (CIC, Payment Gateway)
- Chưa có tính năng báo cáo nâng cao
- Chưa xử lý concurrent transactions
- Chưa có audit log đầy đủ

**Về bảo mật:**
- Chưa implement mã hóa dữ liệu nhạy cảm
- Chưa có 2FA (Two-Factor Authentication)
- Chưa có rate limiting
- Chưa có session management

**Về performance:**
- Chưa optimize cho large dataset
- Chưa có caching strategy
- Chưa có load balancing
- Chưa test performance với nhiều user

### 2. Hướng phát triển

**2.1. Ngắn hạn (1-3 tháng):**

1. **Hoàn thiện Backend API:**
   - Implement đầy đủ REST API endpoints
   - Kết nối với MySQL database
   - Implement JWT authentication
   - Xử lý validation và error handling

2. **Bảo mật:**
   - Mã hóa password với bcrypt
   - Implement role-based access control
   - Mã hóa thông tin nhạy cảm
   - HTTPS cho tất cả requests

3. **Testing:**
   - Unit tests cho business logic
   - Integration tests cho API
   - E2E tests cho critical flows

**2.2. Trung hạn (3-6 tháng):**

1. **Tính năng nâng cao:**
   - Báo cáo và analytics dashboard
   - Export data (PDF, Excel)
   - Notification system (real-time)
   - Audit log đầy đủ

2. **Tích hợp:**
   - SMS Gateway cho OTP
   - Email service cho thông báo
   - Payment Gateway cho thanh toán online
   - Credit Bureau API (CIC)

3. **Optimization:**
   - Caching với Redis
   - Database query optimization
   - Frontend code splitting
   - Image optimization

**2.3. Dài hạn (6-12 tháng):**

1. **Scalability:**
   - Microservices architecture
   - Load balancing
   - Database replication (Master-Slave)
   - Horizontal scaling

2. **Advanced Features:**
   - Machine Learning cho credit scoring
   - Fraud detection
   - Chatbot hỗ trợ khách hàng
   - Mobile app native (iOS/Android)

3. **Compliance:**
   - Tuân thủ PCI DSS (Payment Card Industry)
   - GDPR compliance (nếu có khách quốc tế)
   - Đạt chuẩn ISO 27001 (Information Security)

4. **Business Expansion:**
   - Thêm sản phẩm: Đầu tư, Bảo hiểm, Ngoại tệ
   - Hỗ trợ đa chi nhánh
   - API cho đối tác
   - Open Banking platform

---

**Kết luận:**

Hệ thống Quản lý Ngân hàng đã được phân tích, thiết kế và triển khai frontend một cách bài bản với đầy đủ tài liệu UML và cấu trúc dữ liệu. Mặc dù còn một số hạn chế về mặt triển khai đầy đủ, nhưng nền tảng đã đủ vững chắc để phát triển thành một hệ thống hoàn chỉnh trong tương lai. Với kiến trúc module hóa và các business rules được định nghĩa rõ ràng, hệ thống có khả năng mở rộng tốt để đáp ứng nhu cầu thực tế của một ngân hàng thương mại.

