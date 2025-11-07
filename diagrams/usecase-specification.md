# KỊCH BẢN USE CASE CHI TIẾT

> Hệ thống Quản lý Ngân hàng - Use Case Specification

---

## MỤC LỤC

1. [UC01 - Xem tài khoản](#uc01---xem-tài-khoản)
2. [UC02 - Xem số dư](#uc02---xem-số-dư)
3. [UC03 - Xem lịch sử giao dịch](#uc03---xem-lịch-sử-giao-dịch)
4. [UC04 - Mở tài khoản](#uc04---mở-tài-khoản)
5. [UC05 - Đóng tài khoản](#uc05---đóng-tài-khoản)
6. [UC06 - Nạp tiền](#uc06---nạp-tiền)
7. [UC07 - Rút tiền](#uc07---rút-tiền)
8. [UC08 - Chuyển khoản](#uc08---chuyển-khoản)
9. [UC09 - Mở sổ tiết kiệm](#uc09---mở-sổ-tiết-kiệm)
10. [UC10 - Đáo hạn tiết kiệm](#uc10---đáo-hạn-tiết-kiệm)
11. [UC11 - Rút trước hạn](#uc11---rút-trước-hạn)
12. [UC12 - Đăng ký vay](#uc12---đăng-ký-vay)
13. [UC13 - Thẩm định khoản vay](#uc13---thẩm-định-khoản-vay)
14. [UC14 - Phê duyệt vay](#uc14---phê-duyệt-vay)
15. [UC15 - Giải ngân](#uc15---giải-ngân)
16. [UC16 - Trả nợ](#uc16---trả-nợ)
17. [UC17 - Đăng ký tài sản](#uc17---đăng-ký-tài-sản)
18. [UC18 - Thẩm định tài sản](#uc18---thẩm-định-tài-sản)
19. [UC19 - Quản lý người dùng](#uc19---quản-lý-người-dùng)
20. [UC20 - Cấu hình hệ thống](#uc20---cấu-hình-hệ-thống)
21. [UC21 - Báo cáo](#uc21---báo-cáo)

---

## NHÓM: QUẢN LÝ TÀI KHOẢN

### UC01 - Xem tài khoản

**ID:** UC01  
**Tên:** Xem danh sách tài khoản  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng xem danh sách tất cả tài khoản của mình

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập vào hệ thống
- Khách hàng có ít nhất một tài khoản

#### Điều kiện kết thúc
- Hệ thống hiển thị danh sách tất cả tài khoản

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn menu "Tài khoản của tôi" | |
| 2 | | Hệ thống truy vấn database lấy danh sách tài khoản |
| 3 | | Hiển thị danh sách gồm: Số tài khoản, Loại TK, Số dư, Trạng thái |

#### Luồng thay thế
**2a. Không tìm thấy tài khoản**
- 2a.1. Hiển thị thông báo "Bạn chưa có tài khoản nào"
- 2a.2. Đề xuất "Mở tài khoản mới"

#### Yêu cầu phi chức năng
- Thời gian phản hồi: < 1 giây
- Dữ liệu phải cập nhật real-time

---

### UC02 - Xem số dư

**ID:** UC02  
**Tên:** Xem số dư tài khoản  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng xem số dư chi tiết của một tài khoản

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Tài khoản tồn tại và ở trạng thái ACTIVE

#### Điều kiện kết thúc
- Hiển thị số dư chi tiết

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn một tài khoản để xem chi tiết | |
| 2 | | Truy vấn thông tin tài khoản từ DB |
| 3 | | Hiển thị: Số dư hiện tại, Số dư khả dụng, Số dư bị phong tỏa |
| 4 | | Hiển thị 5 giao dịch gần nhất |

#### Luồng thay thế
**2a. Tài khoản bị đóng**
- 2a.1. Hiển thị "Tài khoản đã đóng vào ngày XX/XX/XXXX"
- 2a.2. Chỉ hiển thị số dư cuối cùng

**2b. Tài khoản bị phong tỏa**
- 2b.1. Hiển thị cảnh báo "Tài khoản đang bị phong tỏa"
- 2b.2. Hiển thị lý do và thời gian dự kiến mở khóa

#### Yêu cầu phi chức năng
- Số dư phải chính xác 100%
- Cập nhật real-time sau mỗi giao dịch

---

### UC03 - Xem lịch sử giao dịch

**ID:** UC03  
**Tên:** Xem lịch sử giao dịch  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng xem lịch sử các giao dịch của tài khoản

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Tài khoản có ít nhất một giao dịch

#### Điều kiện kết thúc
- Hiển thị danh sách giao dịch theo bộ lọc

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn "Lịch sử giao dịch" | |
| 2 | Chọn khoảng thời gian (tuần này, tháng này, tùy chọn) | |
| 3 | | Truy vấn giao dịch theo điều kiện |
| 4 | | Hiển thị danh sách: Ngày GD, Loại GD, Số tiền, Số dư sau GD |
| 5 | Có thể chọn xem chi tiết từng giao dịch | |
| 6 | | Hiển thị chi tiết: Mã GD, Nội dung, Phí, Trạng thái |

#### Luồng thay thế
**3a. Không có giao dịch trong khoảng thời gian**
- 3a.1. Hiển thị "Không có giao dịch nào"
- 3a.2. Đề xuất mở rộng khoảng thời gian

**6a. Giao dịch bị lỗi**
- 6a.1. Hiển thị trạng thái FAILED và lý do

#### Chức năng bổ sung
- Xuất file PDF/Excel
- Tìm kiếm theo từ khóa
- Lọc theo loại giao dịch
- Sắp xếp theo ngày, số tiền

---

### UC04 - Mở tài khoản

**ID:** UC04  
**Tên:** Mở tài khoản thanh toán  
**Actor chính:** Giao dịch viên  
**Actor phụ:** Khách hàng  
**Mô tả:** Giao dịch viên mở tài khoản mới cho khách hàng

#### Điều kiện tiên quyết
- Giao dịch viên đã đăng nhập
- Khách hàng đã có hồ sơ trong hệ thống
- Khách hàng mang đủ giấy tờ (CMND/CCCD, hộ khẩu)

#### Điều kiện kết thúc
- Tài khoản được tạo thành công
- Khách hàng nhận được số tài khoản

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | GDV nhập mã khách hàng | |
| 2 | | Tìm thông tin khách hàng |
| 3 | | Hiển thị thông tin KH: Họ tên, CMND, Địa chỉ |
| 4 | GDV chọn loại tài khoản (Thanh toán, Tiết kiệm) | |
| 5 | GDV nhập số tiền gửi ban đầu (≥ 100,000 VNĐ) | |
| 6 | | Kiểm tra số tiền hợp lệ |
| 7 | | Tạo số tài khoản tự động (10 chữ số) |
| 8 | | Tạo bản ghi Account với status = ACTIVE |
| 9 | | Tạo giao dịch nạp tiền ban đầu |
| 10 | | In phiếu xác nhận |
| 11 | GDV giao phiếu cho khách hàng | |
| 12 | | Gửi SMS thông báo số tài khoản |

#### Luồng thay thế
**2a. Khách hàng chưa có trong hệ thống**
- 2a.1. GDV chọn "Tạo hồ sơ khách hàng mới"
- 2a.2. Nhập thông tin: Họ tên, CMND, Ngày sinh, Địa chỉ, SĐT, Email
- 2a.3. Hệ thống tạo customer_code tự động
- 2a.4. Quay lại bước 3

**6a. Số tiền < 100,000**
- 6a.1. Hiển thị lỗi "Số tiền tối thiểu là 100,000 VNĐ"
- 6a.2. Quay lại bước 5

**7a. Số tài khoản bị trùng**
- 7a.1. Tạo lại số tài khoản khác
- 7a.2. Tiếp tục bước 8

#### Quy tắc nghiệp vụ
- Số tiền gửi ban đầu: ≥ 100,000 VNĐ
- Số tài khoản: 10 chữ số, bắt đầu = branch_code (3 chữ số)
- Mỗi khách hàng có thể có nhiều tài khoản
- Không cho phép mở 2 loại tài khoản giống nhau cùng lúc

#### Yêu cầu phi chức năng
- Thời gian xử lý: < 3 phút
- In phiếu tự động sau khi tạo thành công

---

### UC05 - Đóng tài khoản

**ID:** UC05  
**Tên:** Đóng tài khoản  
**Actor chính:** Giao dịch viên  
**Actor phụ:** Khách hàng  
**Mô tả:** Đóng tài khoản thanh toán theo yêu cầu khách hàng

#### Điều kiện tiên quyết
- Tài khoản đang ở trạng thái ACTIVE
- Không còn các khoản nợ, tiết kiệm đang hoạt động
- Khách hàng mang CMND và sổ tài khoản

#### Điều kiện kết thúc
- Tài khoản chuyển sang trạng thái CLOSED
- Số dư được rút về hoàn toàn

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng yêu cầu đóng tài khoản | |
| 2 | GDV nhập số tài khoản | |
| 3 | | Kiểm tra tài khoản hợp lệ |
| 4 | | Kiểm tra không có khoản vay đang hoạt động |
| 5 | | Kiểm tra không có sổ tiết kiệm chưa đáo hạn |
| 6 | | Hiển thị số dư hiện tại |
| 7 | GDV xác nhận đóng tài khoản | |
| 8 | | Tạo giao dịch rút toàn bộ số dư |
| 9 | | UPDATE account SET status = CLOSED, closed_at = NOW() |
| 10 | | In phiếu xác nhận đóng tài khoản |
| 11 | GDV trả tiền mặt cho khách hàng | |
| 12 | | Gửi email xác nhận |

#### Luồng thay thế
**4a. Còn khoản vay chưa trả**
- 4a.1. Hiển thị "Không thể đóng tài khoản. Còn X khoản vay chưa thanh toán"
- 4a.2. Kết thúc use case

**5a. Còn sổ tiết kiệm chưa đáo hạn**
- 5a.1. Hiển thị "Còn Y sổ tiết kiệm chưa đáo hạn"
- 5a.2. Đề xuất: Rút trước hạn hoặc chờ đến ngày đáo hạn

**6a. Số dư = 0**
- 6a.1. Bỏ qua bước 8 (không cần rút tiền)

#### Quy tắc nghiệp vụ
- Chỉ đóng được khi không còn liên kết với sản phẩm khác
- Số dư = 0 sau khi đóng
- Không thể mở lại tài khoản đã đóng (phải tạo mới)
- Lưu trữ lịch sử giao dịch ít nhất 5 năm

---

## NHÓM: GIAO DỊCH

### UC06 - Nạp tiền

**ID:** UC06  
**Tên:** Nạp tiền vào tài khoản  
**Actor chính:** Giao dịch viên  
**Actor phụ:** Khách hàng  
**Mô tả:** Khách hàng nạp tiền mặt vào tài khoản tại quầy

#### Điều kiện tiên quyết
- Tài khoản ở trạng thái ACTIVE
- Giao dịch viên đã đăng nhập
- Khách hàng mang tiền mặt

#### Điều kiện kết thúc
- Số dư tài khoản tăng
- In biên lai giao dịch

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng đưa tiền mặt và sổ tài khoản | |
| 2 | GDV đếm tiền và nhập số tiền | |
| 3 | GDV nhập số tài khoản | |
| 4 | | Tìm tài khoản |
| 5 | | Kiểm tra trạng thái ACTIVE |
| 6 | | Hiển thị: Họ tên, Số dư hiện tại |
| 7 | GDV xác nhận số tiền nạp | |
| 8 | | BEGIN TRANSACTION |
| 9 | | UPDATE account SET balance = balance + amount |
| 10 | | INSERT INTO transaction (type=DEPOSIT, status=SUCCESS) |
| 11 | | COMMIT |
| 12 | | In biên lai |
| 13 | GDV giao biên lai cho khách hàng | |
| 14 | | Gửi SMS xác nhận |

#### Luồng thay thế
**4a. Không tìm thấy tài khoản**
- 4a.1. Hiển thị "Số tài khoản không tồn tại"
- 4a.2. Quay lại bước 3

**5a. Tài khoản bị đóng hoặc phong tỏa**
- 5a.1. Hiển thị "Tài khoản không thể giao dịch"
- 5a.2. Kết thúc use case

**11a. Lỗi database**
- 11a.1. ROLLBACK
- 11a.2. Hiển thị "Giao dịch thất bại, vui lòng thử lại"
- 11a.3. Quay lại bước 7

#### Quy tắc nghiệp vụ
- Số tiền tối thiểu: 10,000 VNĐ
- Số tiền tối đa: 500,000,000 VNĐ/giao dịch
- Không tính phí nạp tiền
- Transaction phải ACID

#### Yêu cầu phi chức năng
- Thời gian xử lý: < 30 giây
- Đảm bảo tính toàn vẹn dữ liệu

---

### UC07 - Rút tiền

**ID:** UC07  
**Tên:** Rút tiền từ tài khoản  
**Actor chính:** Giao dịch viên  
**Actor phụ:** Khách hàng  
**Mô tả:** Khách hàng rút tiền mặt tại quầy

#### Điều kiện tiên quyết
- Tài khoản ở trạng thái ACTIVE
- Số dư khả dụng ≥ số tiền rút
- Khách hàng có CMND

#### Điều kiện kết thúc
- Số dư giảm
- Khách hàng nhận tiền mặt

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng yêu cầu rút tiền | |
| 2 | GDV nhập số tài khoản | |
| 3 | | Tìm tài khoản |
| 4 | | Hiển thị: Họ tên, Số dư khả dụng |
| 5 | GDV kiểm tra CMND | |
| 6 | GDV nhập số tiền rút | |
| 7 | | Kiểm tra số dư khả dụng ≥ amount |
| 8 | | Kiểm tra hạn mức rút (≤ 50,000,000/ngày) |
| 9 | | BEGIN TRANSACTION |
| 10 | | UPDATE account SET balance = balance - amount |
| 11 | | INSERT INTO transaction (type=WITHDRAW) |
| 12 | | COMMIT |
| 13 | | In biên lai |
| 14 | GDV đưa tiền cho khách hàng | |
| 15 | | Gửi SMS xác nhận |

#### Luồng thay thế
**7a. Số dư không đủ**
- 7a.1. Hiển thị "Số dư không đủ"
- 7a.2. Hiển thị số dư khả dụng
- 7a.3. Quay lại bước 6

**8a. Vượt hạn mức**
- 8a.1. Hiển thị "Vượt hạn mức rút trong ngày"
- 8a.2. Hiển thị đã rút: X VNĐ, còn lại: Y VNĐ
- 8a.3. Quay lại bước 6

**12a. Lỗi giao dịch**
- 12a.1. ROLLBACK
- 12a.2. Không đưa tiền cho khách hàng
- 12a.3. Thông báo lỗi

#### Quy tắc nghiệp vụ
- Số tiền rút: bội số của 50,000 VNĐ
- Hạn mức: 50,000,000 VNĐ/ngày
- Phí rút: Miễn phí tại chi nhánh mở TK, 5,000 VNĐ tại chi nhánh khác
- Phải kiểm tra CMND

---

### UC08 - Chuyển khoản

**ID:** UC08  
**Tên:** Chuyển tiền giữa các tài khoản  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng chuyển tiền từ tài khoản của mình sang tài khoản khác

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Tài khoản nguồn có đủ số dư
- Tài khoản đích tồn tại

#### Điều kiện kết thúc
- Tiền được chuyển thành công
- Cả 2 tài khoản được cập nhật số dư

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Chuyển khoản" | |
| 2 | | Hiển thị danh sách TK nguồn |
| 3 | Chọn tài khoản nguồn | |
| 4 | Nhập số tài khoản đích | |
| 5 | | Tìm tài khoản đích |
| 6 | | Hiển thị: Tên người nhận, Chi nhánh |
| 7 | Xác nhận thông tin đúng | |
| 8 | Nhập số tiền và nội dung chuyển khoản | |
| 9 | | Tính phí (nếu có) |
| 10 | | Hiển thị xác nhận: Số tiền, Phí, Tổng |
| 11 | Nhập mã OTP (gửi qua SMS) | |
| 12 | | Xác thực OTP |
| 13 | | BEGIN TRANSACTION |
| 14 | | SELECT balance FROM account WHERE id = source FOR UPDATE |
| 15 | | Kiểm tra số dư ≥ (amount + fee) |
| 16 | | UPDATE account_source SET balance -= (amount + fee) |
| 17 | | UPDATE account_dest SET balance += amount |
| 18 | | INSERT transaction (nguồn: -amount, đích: +amount) |
| 19 | | COMMIT |
| 20 | | Gửi SMS cho cả 2 bên |
| 21 | | Hiển thị màn hình thành công |

#### Luồng thay thế
**5a. Tài khoản đích không tồn tại**
- 5a.1. Hiển thị "Số tài khoản không tồn tại"
- 5a.2. Quay lại bước 4

**12a. OTP không đúng**
- 12a.1. Hiển thị "Mã OTP không chính xác"
- 12a.2. Số lần thử: X/3
- 12a.3. Nếu thử > 3 lần: Khóa chức năng trong 15 phút

**15a. Số dư không đủ**
- 15a.1. ROLLBACK
- 15a.2. Hiển thị "Số dư không đủ"
- 15a.3. Kết thúc use case

**19a. Lỗi giao dịch**
- 19a.1. ROLLBACK toàn bộ
- 19a.2. Transaction status = FAILED
- 19a.3. Thông báo lỗi cho khách hàng

#### Quy tắc nghiệp vụ
- Chuyển trong cùng ngân hàng: Miễn phí
- Chuyển liên ngân hàng: 5,500 VNĐ
- Hạn mức: 500,000,000 VNĐ/ngày
- Yêu cầu OTP với giao dịch > 10,000,000 VNĐ
- Transaction phải đảm bảo ACID

#### Yêu cầu phi chức năng
- Thời gian xử lý: < 5 giây
- OTP hết hạn sau 3 phút
- Sử dụng row-level locking để tránh deadlock

---

## NHÓM: TIẾT KIỆM

### UC09 - Mở sổ tiết kiệm

**ID:** UC09  
**Tên:** Mở sổ tiết kiệm  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng gửi tiền tiết kiệm có kỳ hạn

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Có tài khoản thanh toán với số dư ≥ 1,000,000 VNĐ

#### Điều kiện kết thúc
- Sổ tiết kiệm được tạo
- Tiền được trừ từ TK thanh toán

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Gửi tiết kiệm" | |
| 2 | | Hiển thị các gói tiết kiệm: 1,3,6,12,24 tháng |
| 3 | Chọn kỳ hạn | |
| 4 | | Hiển thị lãi suất tương ứng |
| 5 | Nhập số tiền gửi | |
| 6 | | Kiểm tra số tiền ≥ 1,000,000 VNĐ |
| 7 | | Kiểm tra số dư TK thanh toán |
| 8 | | Tính toán: Ngày đáo hạn, Lãi dự kiến |
| 9 | | Hiển thị xác nhận |
| 10 | Xác nhận gửi tiết kiệm | |
| 11 | | BEGIN TRANSACTION |
| 12 | | UPDATE account SET balance -= amount |
| 13 | | INSERT INTO savings_deposit |
| 14 | | INSERT INTO transaction (type=SAVINGS) |
| 15 | | COMMIT |
| 16 | | In sổ tiết kiệm điện tử |
| 17 | | Gửi email xác nhận |

#### Luồng thay thế
**6a. Số tiền < 1,000,000**
- 6a.1. Hiển thị "Số tiền tối thiểu là 1,000,000 VNĐ"
- 6a.2. Quay lại bước 5

**7a. Số dư không đủ**
- 7a.1. Hiển thị "Số dư tài khoản không đủ"
- 7a.2. Kết thúc use case

#### Quy tắc nghiệp vụ
- Số tiền tối thiểu: 1,000,000 VNĐ
- Kỳ hạn: 1, 3, 6, 12, 24 tháng
- Lãi suất:
  - 1 tháng: 3.5%/năm
  - 3 tháng: 4.5%/năm
  - 6 tháng: 5.5%/năm
  - 12 tháng: 6.5%/năm
  - 24 tháng: 7.0%/năm
- Tính lãi theo công thức: `interest = principal * rate * term / 12`
- Không cho phép rút trước hạn (nếu rút thì lãi suất = 0.5%/năm)

---

### UC10 - Đáo hạn tiết kiệm

**ID:** UC10  
**Tên:** Xử lý đáo hạn sổ tiết kiệm  
**Actor chính:** Hệ thống (Scheduled Job)  
**Actor phụ:** Khách hàng  
**Mô tả:** Xử lý tự động khi sổ tiết kiệm đến ngày đáo hạn

#### Điều kiện tiên quyết
- Sổ tiết kiệm ở trạng thái ACTIVE
- maturity_date = TODAY

#### Điều kiện kết thúc
- Sổ được xử lý theo lựa chọn khách hàng

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | | Job chạy hàng ngày lúc 00:00 |
| 2 | | Tìm tất cả sổ có maturity_date = TODAY |
| 3 | | Với mỗi sổ: |
| 4 | | Tính lãi = principal * rate * term / 12 |
| 5 | | Kiểm tra auto_renew_option |

**5a. Lựa chọn = WITHDRAW (Rút tiền)**
- 5a.1. BEGIN TRANSACTION
- 5a.2. UPDATE account SET balance += (principal + interest)
- 5a.3. UPDATE savings_deposit SET status = MATURED
- 5a.4. INSERT transaction (type=SAVINGS_WITHDRAWAL)
- 5a.5. COMMIT
- 5a.6. Gửi SMS: "Sổ TK XXX đã đáo hạn. Gốc + lãi đã về TK"

**5b. Lựa chọn = RENEW_PRINCIPAL (Tái tục gốc)**
- 5b.1. BEGIN TRANSACTION
- 5b.2. UPDATE account SET balance += interest (chỉ lãi)
- 5b.3. UPDATE savings_deposit SET status = MATURED
- 5b.4. INSERT savings_deposit mới (chỉ với principal)
- 5b.5. COMMIT
- 5b.6. Gửi SMS: "Sổ TK XXX tái tục gốc. Lãi đã về TK"

**5c. Lựa chọn = RENEW_FULL (Tái tục gốc + lãi)**
- 5c.1. BEGIN TRANSACTION
- 5c.2. UPDATE savings_deposit SET status = MATURED
- 5c.3. INSERT savings_deposit mới (principal + interest)
- 5c.4. COMMIT
- 5c.5. Gửi SMS: "Sổ TK XXX tái tục gốc + lãi"

**5d. Không có lựa chọn**
- 5d.1. Chờ 7 ngày
- 5d.2. Nếu KH không thao tác → Auto RENEW_FULL

#### Luồng thay thế
**COMMIT failed**
- Xa.1. ROLLBACK
- Xa.2. Log lỗi
- Xa.3. Gửi email cho admin
- Xa.4. Thử lại sau 1 giờ

#### Quy tắc nghiệp vụ
- Job chạy lúc 00:00 hàng ngày
- Gửi SMS thông báo trước 3 ngày
- Không lựa chọn → Tự động tái tục full sau 7 ngày
- Lãi suất tái tục = lãi suất hiện tại (có thể khác lúc mở)

---

### UC11 - Rút trước hạn

**ID:** UC11  
**Tên:** Rút tiền tiết kiệm trước hạn  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng rút tiền trước khi đến ngày đáo hạn

#### Điều kiện tiên quyết
- Sổ tiết kiệm ở trạng thái ACTIVE
- Chưa đến maturity_date

#### Điều kiện kết thúc
- Tiền về tài khoản thanh toán
- Sổ tiết kiệm đóng

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Rút trước hạn" | |
| 2 | | Hiển thị danh sách sổ tiết kiệm |
| 3 | Chọn sổ muốn rút | |
| 4 | | Hiển thị: Số tiền gốc, Ngày gửi, Ngày đáo hạn |
| 5 | | Tính lãi = principal * 0.5% * (days/365) |
| 6 | | Hiển thị cảnh báo: "Rút trước hạn, lãi suất = 0.5%/năm" |
| 7 | | Hiển thị: Gốc, Lãi (0.5%), Tổng nhận |
| 8 | Xác nhận rút | |
| 9 | Nhập mã OTP | |
| 10 | | Xác thực OTP |
| 11 | | BEGIN TRANSACTION |
| 12 | | UPDATE account SET balance += (principal + interest) |
| 13 | | UPDATE savings_deposit SET status = CLOSED_EARLY |
| 14 | | INSERT transaction (type=EARLY_WITHDRAWAL) |
| 15 | | COMMIT |
| 16 | | Gửi SMS xác nhận |

#### Luồng thay thế
**10a. OTP sai**
- 10a.1. Thử lại (tối đa 3 lần)
- 10a.2. Quá 3 lần → Khóa 15 phút

**15a. Lỗi giao dịch**
- 15a.1. ROLLBACK
- 15a.2. Thông báo lỗi

#### Quy tắc nghiệp vụ
- Lãi suất rút trước hạn = 0.5%/năm
- Không tính phí rút trước hạn
- Yêu cầu OTP xác nhận
- Không thể hoàn tác sau khi rút

---

## NHÓM: VAY VỐN

### UC12 - Đăng ký vay

**ID:** UC12  
**Tên:** Đăng ký khoản vay  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng đăng ký khoản vay online

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Có tài khoản thanh toán đang hoạt động
- Credit score ≥ 600 (nếu đã có)

#### Điều kiện kết thúc
- Hồ sơ vay được tạo với trạng thái PENDING

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Đăng ký vay" | |
| 2 | | Hiển thị các loại vay: Tiêu dùng, Mua nhà, Kinh doanh |
| 3 | Chọn loại vay | |
| 4 | Nhập: Số tiền vay, Thời hạn (tháng), Mục đích | |
| 5 | | Kiểm tra số tiền: 10tr ≤ amount ≤ 5 tỷ |
| 6 | | Kiểm tra thời hạn: 6 ≤ term ≤ 240 tháng |
| 7 | | Tính lãi suất dự kiến (dựa trên credit score) |
| 8 | | Tính khoản trả hàng tháng |
| 9 | | Hiển thị: Lãi suất, Trả/tháng, Tổng trả |
| 10 | Xác nhận thông tin | |
| 11 | Upload tài liệu: CMND, Hộ khẩu, Sổ đỏ, Bảng lương | |
| 12 | | Kiểm tra file hợp lệ (PDF, JPG, < 5MB) |
| 13 | | Tạo loan_number tự động |
| 14 | | INSERT INTO loan (status=PENDING) |
| 15 | | Gửi email xác nhận đã nhận hồ sơ |
| 16 | | Thông báo "Cán bộ sẽ liên hệ trong 24h" |

#### Luồng thay thế
**5a. Số tiền ngoài phạm vi**
- 5a.1. Hiển thị "Số tiền vay: 10,000,000 - 5,000,000,000 VNĐ"
- 5a.2. Quay lại bước 4

**6a. Thời hạn không hợp lệ**
- 6a.1. Hiển thị "Thời hạn: 6 - 240 tháng"
- 6a.2. Quay lại bước 4

**12a. File không hợp lệ**
- 12a.1. Hiển thị lỗi file
- 12a.2. Quay lại bước 11

#### Quy tắc nghiệp vụ
- Số tiền vay: 10,000,000 - 5,000,000,000 VNĐ
- Thời hạn: 6 - 240 tháng
- Lãi suất: 6% - 18%/năm (tùy credit score)
- Tài liệu bắt buộc: CMND, Hộ khẩu, Chứng minh thu nhập
- Nếu > 500tr: Yêu cầu tài sản thế chấp

#### Yêu cầu phi chức năng
- Upload file tối đa 5MB
- Hỗ trợ format: PDF, JPG, PNG

---

### UC13 - Thẩm định khoản vay

**ID:** UC13  
**Tên:** Thẩm định hồ sơ vay  
**Actor chính:** Cán bộ tín dụng  
**Mô tả:** Cán bộ tín dụng thẩm định hồ sơ vay của khách hàng

#### Điều kiện tiên quyết
- Hồ sơ ở trạng thái PENDING
- Cán bộ tín dụng đã đăng nhập
- Khách hàng đã upload đủ tài liệu

#### Điều kiện kết thúc
- Hồ sơ chuyển sang UNDER_REVIEW hoặc NEED_MORE_INFO

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Cán bộ xem danh sách hồ sơ PENDING | |
| 2 | | Hiển thị: Mã HS, KH, Số tiền, Ngày nộp |
| 3 | Chọn một hồ sơ | |
| 4 | | Hiển thị chi tiết: Thông tin KH, Khoản vay, Tài liệu |
| 5 | Kiểm tra tài liệu đầy đủ | |
| 6 | | UPDATE loan SET status = UNDER_REVIEW |
| 7 | | Tra cứu CIC (Credit Information Center) |
| 8 | | Hiển thị: Lịch sử vay, Nợ xấu, Credit score |
| 9 | | Tính DTI = (monthly_debt / monthly_income) |
| 10 | | Kiểm tra DTI ≤ 40% |
| 11 | Nếu có tài sản: Thẩm định giá trị | |
| 12 | | Tính LTV = (loan_amount / asset_value) |
| 13 | | Kiểm tra LTV ≤ 70% |
| 14 | Nhập ý kiến thẩm định | |
| 15 | | UPDATE loan SET notes = ... |
| 16 | | Gửi thông báo cho quản lý phê duyệt |

#### Luồng thay thế
**5a. Thiếu tài liệu**
- 5a.1. UPDATE status = NEED_MORE_INFO
- 5a.2. Gửi email yêu cầu bổ sung
- 5a.3. Kết thúc use case

**10a. DTI > 40%**
- 10a.1. Đánh dấu rủi ro cao
- 10a.2. Yêu cầu tăng tài sản đảm bảo

**13a. LTV > 70%**
- 13a.1. Đề xuất giảm số tiền vay
- 13a.2. Hoặc bổ sung tài sản khác

#### Quy tắc nghiệp vụ
- DTI (Debt-to-Income) ≤ 40%
- LTV (Loan-to-Value) ≤ 70%
- Credit score ≥ 600
- Không có nợ xấu trong 2 năm gần đây
- Thời gian thẩm định: ≤ 3 ngày làm việc

---

### UC14 - Phê duyệt vay

**ID:** UC14  
**Tên:** Phê duyệt khoản vay  
**Actor chính:** Cán bộ tín dụng (hoặc Quản lý)  
**Mô tả:** Quyết định phê duyệt hoặc từ chối khoản vay

#### Điều kiện tiên quyết
- Hồ sơ đã được thẩm định (status = UNDER_REVIEW)
- DTI, LTV, Credit score đạt yêu cầu

#### Điều kiện kết thúc
- Hồ sơ chuyển sang APPROVED hoặc REJECTED

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Cán bộ xem hồ sơ đã thẩm định | |
| 2 | | Hiển thị tóm tắt: Credit score, DTI, LTV, Ý kiến thẩm định |
| 3 | | Đề xuất lãi suất dựa trên credit score |
| 4 | Xem xét tổng thể | |

**4a. Quyết định PHÊ DUYỆT**
- 4a.1. Nhập lãi suất cuối cùng
- 4a.2. Xác nhận thông tin hợp đồng
- 4a.3. BEGIN TRANSACTION
- 4a.4. UPDATE loan SET status = APPROVED, interest_rate = ...
- 4a.5. Tạo bản nháp hợp đồng
- 4a.6. COMMIT
- 4a.7. Gửi email thông báo phê duyệt cho KH
- 4a.8. Hẹn lịch ký hợp đồng

**4b. Quyết định TỪ CHỐI**
- 4b.1. Chọn lý do từ chối
- 4b.2. Nhập ghi chú bổ sung
- 4b.3. UPDATE loan SET status = REJECTED
- 4b.4. Gửi email thông báo từ chối
- 4b.5. Kết thúc use case

#### Luồng thay thế
**Nếu amount > 500,000,000**
- Xa.1. Yêu cầu phê duyệt từ Giám đốc chi nhánh
- Xa.2. Chuyển hồ sơ lên cấp trên

#### Quy tắc nghiệp vụ
- Lãi suất phê duyệt:
  - Credit A (700+): 6-9%/năm
  - Credit B (650-699): 9-12%/năm
  - Credit C (600-649): 12-15%/năm
  - Credit D (<600): Từ chối
- Hạn mức phê duyệt:
  - Cán bộ tín dụng: ≤ 500tr
  - Quản lý chi nhánh: ≤ 2 tỷ
  - Giám đốc vùng: > 2 tỷ

---

### UC15 - Giải ngân

**ID:** UC15  
**Tên:** Giải ngân khoản vay  
**Actor chính:** Cán bộ tín dụng  
**Actor phụ:** Khách hàng  
**Mô tả:** Chuyển tiền vay vào tài khoản khách hàng

#### Điều kiện tiên quyết
- Khoản vay đã được phê duyệt (status = APPROVED)
- Khách hàng đã ký hợp đồng
- Tài sản thế chấp đã được đăng ký (nếu có)

#### Điều kiện kết thúc
- Tiền vào tài khoản khách hàng
- Khoản vay chuyển sang ACTIVE
- Lịch trả nợ được tạo

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Cán bộ chọn "Giải ngân" | |
| 2 | | Hiển thị thông tin: Số tiền, Tài khoản nhận |
| 3 | | Kiểm tra hợp đồng đã ký |
| 4 | | Kiểm tra tài sản đã đăng ký (nếu có) |
| 5 | Xác nhận giải ngân | |
| 6 | | BEGIN TRANSACTION |
| 7 | | UPDATE account SET balance += loan_amount |
| 8 | | UPDATE loan SET status = ACTIVE, disbursement_date = NOW() |
| 9 | | Tạo lịch trả nợ (loan_payment_schedule) |
| 10 | | INSERT transaction (type=LOAN_DISBURSEMENT) |
| 11 | | COMMIT |
| 12 | | In hợp đồng vay |
| 13 | | Gửi SMS xác nhận |
| 14 | | Gửi email lịch trả nợ |

#### Luồng thay thế
**3a. Chưa ký hợp đồng**
- 3a.1. Hiển thị "Khách hàng chưa ký hợp đồng"
- 3a.2. Kết thúc use case

**4a. Chưa đăng ký tài sản**
- 4a.1. Hiển thị "Chưa hoàn tất thủ tục thế chấp"
- 4a.2. Kết thúc use case

**11a. Lỗi giao dịch**
- 11a.1. ROLLBACK
- 11a.2. Log lỗi
- 11a.3. Thông báo quản lý

#### Quy tắc nghiệp vụ
- Lịch trả nợ: Tạo tự động theo công thức
  - `monthly_payment = P * r * (1+r)^n / ((1+r)^n - 1)`
  - P = principal, r = rate/12, n = term
- Ngày trả nợ: Cố định hàng tháng (thường là ngày giải ngân)
- Cập nhật credit score sau khi giải ngân

---

### UC16 - Trả nợ

**ID:** UC16  
**Tên:** Trả nợ hàng tháng  
**Actor chính:** Hệ thống (Auto-debit) hoặc Khách hàng (Thủ công)  
**Mô tả:** Khách hàng trả nợ theo lịch hoặc trả trước hạn

#### Điều kiện tiên quyết
- Khoản vay ở trạng thái ACTIVE
- Có kỳ trả nợ đến hạn

#### Điều kiện kết thúc
- Nợ được thanh toán
- Cập nhật outstanding_balance

#### Luồng sự kiện chính (Tự động)

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | | Job chạy hàng ngày lúc 01:00 |
| 2 | | Tìm các kỳ trả nợ có due_date = TODAY |
| 3 | | Với mỗi kỳ: |
| 4 | | Kiểm tra số dư tài khoản ≥ monthly_payment |
| 5 | | BEGIN TRANSACTION |
| 6 | | UPDATE account SET balance -= monthly_payment |
| 7 | | UPDATE loan_payment_schedule SET status = PAID |
| 8 | | UPDATE loan SET outstanding_balance -= principal_part |
| 9 | | INSERT INTO loan_payment |
| 10 | | COMMIT |
| 11 | | Gửi SMS xác nhận |
| 12 | | Cập nhật credit score (+1 on-time payment) |

#### Luồng thay thế (Tự động)
**4a. Số dư không đủ**
- 4a.1. UPDATE loan_payment_schedule SET status = OVERDUE
- 4a.2. Gửi SMS nhắc nhở
- 4a.3. Thử lại sau 1 ngày
- 4a.4. Nếu quá 7 ngày: Tính lãi phạt

**10a. Lỗi giao dịch**
- 10a.1. ROLLBACK
- 10a.2. Đánh dấu failed
- 10a.3. Thử lại sau 1 giờ

#### Luồng sự kiện chính (Thủ công)

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Trả nợ" | |
| 2 | | Hiển thị danh sách khoản vay |
| 3 | Chọn khoản vay | |
| 4 | | Hiển thị: Nợ gốc, Kỳ tiếp theo, Số tiền cần trả |
| 5 | Chọn: Trả theo kỳ / Trả trước hạn | |

**5a. Trả theo kỳ**
- 5a.1. Hiển thị số tiền cần trả (cố định)
- 5a.2. Xác nhận
- 5a.3. Thực hiện bước 5-10 như tự động

**5b. Trả trước hạn**
- 5b.1. Nhập số tiền muốn trả
- 5b.2. Kiểm tra số tiền ≥ monthly_payment
- 5b.3. Tính phí trả trước (1% trên số tiền trả thêm)
- 5b.4. Hiển thị: Số tiền, Phí, Giảm được lãi
- 5b.5. Xác nhận
- 5b.6. Trừ tiền và cập nhật nợ gốc

#### Quy tắc nghiệp vụ
- Trả tự động: Ưu tiên hàng đầu
- Lãi phạt nợ quá hạn: +3%/năm
- Phí trả trước: 1% trên phần trả vượt
- Cập nhật credit score:
  - On-time: +5 điểm
  - Late 1-7 ngày: 0 điểm
  - Late 8-30 ngày: -10 điểm
  - Late >30 ngày: -50 điểm

---

## NHÓM: TÀI SẢN

### UC17 - Đăng ký tài sản

**ID:** UC17  
**Tên:** Đăng ký tài sản thế chấp  
**Actor chính:** Khách hàng  
**Mô tả:** Khách hàng đăng ký tài sản để thế chấp cho khoản vay

#### Điều kiện tiên quyết
- Khách hàng đã đăng nhập
- Có hồ sơ vay đang xử lý

#### Điều kiện kết thúc
- Tài sản được lưu vào hệ thống
- Chờ thẩm định

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Khách hàng chọn "Đăng ký tài sản" | |
| 2 | | Hiển thị loại tài sản: Bất động sản, Xe ô tô, Giấy tờ có giá |
| 3 | Chọn loại tài sản | |
| 4 | Nhập thông tin: Tên TS, Địa chỉ, Diện tích, Năm xây dựng | |
| 5 | Upload: Sổ đỏ, Hợp đồng mua bán, Ảnh tài sản | |
| 6 | | Kiểm tra file hợp lệ |
| 7 | Nhập giá trị ước tính | |
| 8 | | INSERT INTO collateral (status=PENDING_APPRAISAL) |
| 9 | | Link tài sản với khoản vay |
| 10 | | Gửi thông báo cho cán bộ thẩm định |
| 11 | | Hiển thị "Tài sản đã đăng ký. Chờ thẩm định" |

#### Luồng thay thế
**6a. File không hợp lệ**
- 6a.1. Hiển thị lỗi
- 6a.2. Quay lại bước 5

#### Quy tắc nghiệp vụ
- File tối đa: 10MB
- Format: PDF, JPG, PNG
- Yêu cầu tài liệu: Sổ đỏ/Giấy tờ chủ quyền, Ảnh thực tế

---

### UC18 - Thẩm định tài sản

**ID:** UC18  
**Tên:** Thẩm định giá trị tài sản  
**Actor chính:** Cán bộ tín dụng (hoặc Chuyên viên thẩm định)  
**Mô tả:** Thẩm định giá trị thực tế của tài sản

#### Điều kiện tiên quyết
- Tài sản ở trạng thái PENDING_APPRAISAL
- Khách hàng đã upload đủ tài liệu

#### Điều kiện kết thúc
- Tài sản được định giá
- Trạng thái chuyển sang APPROVED hoặc REJECTED

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Cán bộ xem danh sách TS cần thẩm định | |
| 2 | Chọn một tài sản | |
| 3 | | Hiển thị thông tin: Loại TS, Địa chỉ, Tài liệu |
| 4 | Xem tài liệu | |
| 5 | (Nếu cần) Đi khảo sát thực tế | |
| 6 | Tra cứu giá thị trường | |
| 7 | Nhập giá trị thẩm định | |
| 8 | Nhập ghi chú đánh giá | |
| 9 | | Tính LTV = loan_amount / appraised_value |
| 10 | | Hiển thị kết quả LTV |

**10a. LTV ≤ 70%**
- 10a.1. UPDATE collateral SET status = APPROVED
- 10a.2. Cho phép giải ngân

**10b. LTV > 70%**
- 10b.1. Đề xuất: Giảm số tiền vay hoặc bổ sung tài sản
- 10b.2. Gửi thông báo cho KH

#### Quy tắc nghiệp vụ
- LTV tối đa: 70%
- Thời hạn thẩm định: 3-5 ngày
- Yêu cầu khảo sát thực tế nếu giá trị > 1 tỷ

---

## NHÓM: QUẢN TRỊ

### UC19 - Quản lý người dùng

**ID:** UC19  
**Tên:** Quản lý tài khoản người dùng  
**Actor chính:** Quản trị viên  
**Mô tả:** Tạo, sửa, xóa tài khoản nhân viên

#### Điều kiện tiên quyết
- Admin đã đăng nhập
- Có quyền ADMIN

#### Điều kiện kết thúc
- Tài khoản được cập nhật

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Admin chọn "Quản lý người dùng" | |
| 2 | | Hiển thị danh sách user |
| 3 | Chọn "Thêm mới" | |
| 4 | Nhập: Email, Họ tên, Chi nhánh, Vai trò | |
| 5 | | Kiểm tra email chưa tồn tại |
| 6 | | Tạo mật khẩu tạm thời |
| 7 | | INSERT INTO employee |
| 8 | | Gửi email kích hoạt tài khoản |

#### Quy tắc nghiệp vụ
- Mỗi email chỉ có 1 tài khoản
- Mật khẩu tạm: Bắt buộc đổi lần đầu đăng nhập
- Vai trò: ADMIN, TELLER, LOAN_OFFICER, BRANCH_MANAGER

---

### UC20 - Cấu hình hệ thống

**ID:** UC20  
**Tên:** Cấu hình tham số hệ thống  
**Actor chính:** Quản trị viên  
**Mô tả:** Cập nhật lãi suất, phí, hạn mức

#### Điều kiện tiên quyết
- Admin đã đăng nhập

#### Điều kiện kết thúc
- Tham số được cập nhật

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Admin chọn "Cấu hình" | |
| 2 | | Hiển thị các nhóm: Lãi suất, Phí, Hạn mức |
| 3 | Chọn một nhóm | |
| 4 | Sửa giá trị | |
| 5 | | Validate giá trị |
| 6 | Xác nhận | |
| 7 | | UPDATE config |
| 8 | | Log thay đổi |

#### Quy tắc nghiệp vụ
- Mọi thay đổi đều được log
- Có hiệu lực ngay lập tức
- Lãi suất: 0.1% - 50%/năm

---

### UC21 - Báo cáo

**ID:** UC21  
**Tên:** Xem báo cáo thống kê  
**Actor chính:** Quản lý chi nhánh, Admin  
**Mô tả:** Xem các báo cáo về giao dịch, doanh số, nợ xấu

#### Điều kiện tiên quyết
- User đã đăng nhập
- Có quyền xem báo cáo

#### Điều kiện kết thúc
- Hiển thị báo cáo hoặc xuất file

#### Luồng sự kiện chính

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | User chọn "Báo cáo" | |
| 2 | | Hiển thị loại báo cáo: Giao dịch, Doanh số, Nợ xấu, Credit |
| 3 | Chọn loại báo cáo | |
| 4 | Chọn khoảng thời gian | |
| 5 | (Tùy chọn) Chọn chi nhánh | |
| 6 | | Query database |
| 7 | | Tạo biểu đồ và bảng số liệu |
| 8 | | Hiển thị báo cáo |
| 9 | (Tùy chọn) Xuất file Excel/PDF | |

#### Các loại báo cáo
1. **Báo cáo giao dịch**: Số lượng, giá trị theo loại GD
2. **Báo cáo doanh số**: Doanh thu, lợi nhuận theo tháng
3. **Báo cáo nợ xấu**: Nợ quá hạn, tỷ lệ nợ xấu
4. **Báo cáo credit**: Phân bố điểm tín dụng

#### Quy tắc nghiệp vụ
- Manager chỉ xem được báo cáo chi nhánh mình
- Admin xem được tất cả
- Dữ liệu cập nhật mỗi giờ

---

## PHỤ LỤC

### Bảng ký hiệu

| Ký hiệu | Ý nghĩa |
|---------|---------|
| GDV | Giao dịch viên |
| KH | Khách hàng |
| TK | Tài khoản |
| TS | Tài sản |
| GD | Giao dịch |
| HS | Hồ sơ |

### Thuật ngữ

- **DTI (Debt-to-Income Ratio)**: Tỷ lệ nợ trên thu nhập
- **LTV (Loan-to-Value Ratio)**: Tỷ lệ vay trên giá trị tài sản
- **CIC**: Trung tâm Thông tin Tín dụng Quốc gia
- **OTP**: Mã xác thực một lần
- **ACID**: Atomicity, Consistency, Isolation, Durability

---

**Phiên bản:** 1.0  
**Ngày cập nhật:** 01/11/2025  
**Tác giả:** Hệ thống Quản lý Ngân hàng

