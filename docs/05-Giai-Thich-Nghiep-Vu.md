# GIẢI THÍCH CÁC NGHIỆP VỤ HỆ THỐNG NGÂN HÀNG

> Tài liệu này giải thích chi tiết các nghiệp vụ chính trong hệ thống quản lý ngân hàng với các ví dụ cụ thể và dễ hiểu.

---

## 📑 MỤC LỤC

1. [Nghiệp vụ Tài khoản](#1-nghiệp-vụ-tài-khoản)
2. [Nghiệp vụ Giao dịch](#2-nghiệp-vụ-giao-dịch)
3. [Nghiệp vụ Tiết kiệm](#3-nghiệp-vụ-tiết-kiệm)
4. [Nghiệp vụ Vay vốn](#4-nghiệp-vụ-vay-vốn)
5. [Nghiệp vụ Thẻ ngân hàng](#5-nghiệp-vụ-thẻ-ngân-hàng)
6. [Nghiệp vụ Tài sản thế chấp](#6-nghiệp-vụ-tài-sản-thế-chấp)

---

## 1. NGHIỆP VỤ TÀI KHOẢN

### 1.1. Mở tài khoản mới

**Mô tả:** Tạo tài khoản ngân hàng mới cho khách hàng.

**Quy trình:**

```
Khách hàng → Cung cấp thông tin → Giao dịch viên kiểm tra 
→ Hệ thống tạo số tài khoản → Nạp tiền mở tài khoản → Kích hoạt
```

**Ví dụ:**
- Chị Lan đến chi nhánh Hà Nội muốn mở tài khoản thanh toán
- Giao dịch viên yêu cầu CCCD và thông tin cá nhân
- Hệ thống tạo số tài khoản: `1001234567`
- Chị Lan nạp 1,000,000 VND để mở tài khoản
- Tài khoản được kích hoạt và có thể sử dụng ngay

**Điều kiện:**
- Khách hàng đã đăng ký trong hệ thống
- Nạp đủ số tiền tối thiểu (nếu có quy định)
- Cung cấp đầy đủ giấy tờ tùy thân

**Dữ liệu lưu trữ:**
```sql
Accounts:
- account_id: ID tự động
- account_number: Số tài khoản duy nhất
- customer_id: Liên kết với khách hàng
- account_type_id: Loại tài khoản
- balance: Số dư ban đầu
- status: 'ACTIVE'
- opened_date: Ngày mở
```

---

### 1.2. Đóng băng tài khoản

**Mô tả:** Tạm thời khóa tài khoản, ngăn chặn mọi giao dịch.

**Lý do đóng băng:**
- Khách hàng yêu cầu (mất thẻ, nghi ngờ bị hack)
- Phát hiện giao dịch bất thường
- Vi phạm quy định ngân hàng
- Lệnh của cơ quan chức năng

**Ví dụ:**
- Anh Minh phát hiện mất thẻ ATM
- Gọi hotline yêu cầu đóng băng tài khoản
- Giao dịch viên đóng băng tài khoản số `1001234567`
- Mọi giao dịch từ tài khoản này đều bị từ chối
- Sau khi làm thẻ mới, anh Minh yêu cầu mở băng lại

**Tác động:**
- ❌ Không thể rút tiền
- ❌ Không thể chuyển khoản
- ✅ Vẫn có thể nhận tiền
- ✅ Số dư không thay đổi

**Dữ liệu cập nhật:**
```sql
UPDATE Accounts 
SET status = 'FROZEN', 
    updated_at = NOW() 
WHERE account_number = '1001234567';
```

---

### 1.3. Đóng tài khoản

**Mô tả:** Đóng vĩnh viễn tài khoản, không thể sử dụng nữa.

**Điều kiện:**
- Số dư tài khoản = 0 hoặc được rút hết
- Không còn khoản vay nào đang hoạt động
- Không có giao dịch đang chờ xử lý

**Quy trình:**
```
Khách hàng yêu cầu → Kiểm tra điều kiện → Rút hết số dư 
→ Đóng các dịch vụ liên quan → Đóng tài khoản
```

**Ví dụ:**
- Chị Mai muốn đóng tài khoản `1001234568`
- Số dư hiện tại: 2,500,000 VND
- Giao dịch viên kiểm tra: không có khoản vay, thẻ đã hủy
- Chị Mai rút hết 2,500,000 VND
- Giao dịch viên đóng tài khoản
- Trạng thái chuyển sang: `CLOSED`

---

## 2. NGHIỆP VỤ GIAO DỊCH

### 2.1. Nạp tiền (Deposit)

**Mô tả:** Nộp tiền vào tài khoản để tăng số dư.

**Các cách nạp tiền:**
1. **Nạp tiền mặt tại quầy**
2. Chuyển khoản từ ngân hàng khác
3. Nạp qua ATM
4. Nạp qua ví điện tử

**Ví dụ: Nạp tiền mặt tại quầy**

```
Thông tin giao dịch:
- Khách hàng: Nguyễn Văn A
- Tài khoản: 1001234567
- Số tiền nạp: 5,000,000 VND
- Thời gian: 10:30 AM, 27/10/2025
```

**Quy trình xử lý:**
1. Khách hàng đưa tiền mặt cho giao dịch viên
2. GDV đếm và xác nhận số tiền: 5,000,000 VND
3. GDV nhập giao dịch vào hệ thống
4. Hệ thống tính toán:
   - Số dư cũ: 10,000,000 VND
   - Số tiền nạp: +5,000,000 VND
   - **Số dư mới: 15,000,000 VND**
5. Cập nhật số dư tài khoản
6. In biên lai giao dịch
7. Gửi SMS thông báo cho khách hàng

**Dữ liệu lưu trữ:**
```sql
INSERT INTO Transactions (
    transaction_code, transaction_type_id, 
    to_account_id, amount, 
    balance_after, status, processed_by
) VALUES (
    'TXN20251027001', 1, -- 1 = DEPOSIT
    123, 5000000, 
    15000000, 'SUCCESS', 3 -- employee_id
);

UPDATE Accounts 
SET balance = 15000000 
WHERE account_id = 123;
```

---

### 2.2. Rút tiền (Withdrawal)

**Mô tả:** Rút tiền từ tài khoản để giảm số dư.

**Điều kiện:**
- Số dư phải đủ (balance >= số tiền rút)
- Tài khoản đang ở trạng thái ACTIVE
- Không vượt quá hạn mức rút trong ngày

**Ví dụ: Rút tiền mặt tại quầy**

```
Thông tin giao dịch:
- Khách hàng: Trần Thị B
- Tài khoản: 1001234568
- Số tiền rút: 3,000,000 VND
- Số dư hiện tại: 8,000,000 VND
```

**Quy trình xử lý:**
1. Khách hàng điền phiếu rút tiền
2. GDV kiểm tra giấy tờ tùy thân
3. GDV kiểm tra số dư: 8,000,000 VND ✅ (đủ tiền)
4. Hệ thống tính toán:
   - Số dư cũ: 8,000,000 VND
   - Số tiền rút: -3,000,000 VND
   - **Số dư mới: 5,000,000 VND**
5. Cập nhật số dư
6. GDV xuất tiền mặt: 3,000,000 VND
7. In biên lai
8. Gửi SMS xác nhận

**Trường hợp không đủ tiền:**
```
Số dư: 2,000,000 VND
Yêu cầu rút: 3,000,000 VND
→ ❌ TỪCHỐI: "Số dư không đủ"
```

---

### 2.3. Chuyển khoản (Transfer)

**Mô tả:** Chuyển tiền từ tài khoản này sang tài khoản khác.

#### 2.3.1. Chuyển khoản nội bộ

**Ví dụ:**
```
Người gửi: Nguyễn Văn A (TK: 1001234567)
Người nhận: Trần Thị B (TK: 1001234568)
Số tiền: 2,000,000 VND
Nội dung: "Chuyển tiền mua hàng"
Phí: 0 VND (chuyển khoản nội bộ miễn phí)
```

**Quy trình xử lý:**

1. **Kiểm tra tài khoản nguồn:**
   - Số dư: 10,000,000 VND ✅
   - Trạng thái: ACTIVE ✅
   - Số tiền yêu cầu: 2,000,000 VND ✅

2. **Kiểm tra tài khoản đích:**
   - TK 1001234568 tồn tại ✅
   - Trạng thái: ACTIVE ✅

3. **Xử lý giao dịch (TRANSACTION):**
   ```sql
   START TRANSACTION;
   
   -- Trừ tiền tài khoản nguồn
   UPDATE Accounts 
   SET balance = balance - 2000000 
   WHERE account_number = '1001234567';
   
   -- Cộng tiền tài khoản đích
   UPDATE Accounts 
   SET balance = balance + 2000000 
   WHERE account_number = '1001234568';
   
   -- Ghi log giao dịch
   INSERT INTO Transactions (...) VALUES (...);
   
   COMMIT;
   ```

4. **Kết quả:**
   - Tài khoản A: 10,000,000 → **8,000,000 VND**
   - Tài khoản B: 5,000,000 → **7,000,000 VND**

5. **Thông báo:**
   - SMS cho người gửi: "Bạn vừa chuyển 2,000,000 VND đến TK 1001234568"
   - SMS cho người nhận: "Bạn vừa nhận 2,000,000 VND từ TK 1001234567"

#### 2.3.2. Chuyển khoản liên ngân hàng

**Đặc điểm:**
- Có phí giao dịch (VD: 5,000 VND)
- Thời gian xử lý lâu hơn (vài phút đến vài giờ)
- Cần kết nối với hệ thống NAPAS/Citad

**Ví dụ:**
```
Người gửi: Nguyễn Văn A (Ngân hàng ABC, TK: 1001234567)
Người nhận: Lê Văn C (Ngân hàng XYZ, TK: 9876543210)
Số tiền: 5,000,000 VND
Phí: 5,000 VND
Tổng trừ: 5,005,000 VND
```

**Quy trình:**
1. Kiểm tra số dư: 10,000,000 ≥ 5,005,000 ✅
2. Trừ tiền từ tài khoản A: 10,000,000 → 4,995,000 VND
3. Gửi lệnh đến hệ thống liên ngân hàng
4. Ngân hàng XYZ nhận lệnh và cộng tiền cho tài khoản C
5. Xác nhận giao dịch thành công
6. Gửi thông báo cho cả 2 bên

---

## 3. NGHIỆP VỤ TIẾT KIỆM

### 3.1. Gửi tiết kiệm

**Mô tả:** Khách hàng gửi tiền với kỳ hạn nhất định để nhận lãi suất cao hơn.

**Các loại kỳ hạn:**

| Kỳ hạn | Lãi suất/năm | Ví dụ lãi |
|--------|--------------|-----------|
| Không kỳ hạn | 0.5% | 50,000 VND/năm với 10 triệu |
| 1 tháng | 3.0% | 300,000 VND/năm |
| 3 tháng | 4.0% | 400,000 VND/năm |
| 6 tháng | 5.0% | 500,000 VND/năm |
| 12 tháng | 6.0% | 600,000 VND/năm |
| 24 tháng | 6.5% | 650,000 VND/năm |

**Ví dụ: Gửi tiết kiệm kỳ hạn 12 tháng**

```
Thông tin:
- Khách hàng: Nguyễn Văn A
- Số tiền gửi: 100,000,000 VND (100 triệu)
- Kỳ hạn: 12 tháng
- Lãi suất: 6.0%/năm
- Ngày gửi: 01/01/2025
- Ngày đáo hạn: 01/01/2026
```

**Tính lãi:**
```
Lãi = Gốc × Lãi_suất × Thời_gian
    = 100,000,000 × 6% × 1 năm
    = 6,000,000 VND

Tổng tiền đáo hạn = 100,000,000 + 6,000,000 
                  = 106,000,000 VND
```

**Quy trình:**
1. Khách hàng chọn kỳ hạn và số tiền
2. Trừ tiền từ tài khoản thanh toán: 100,000,000 VND
3. Tạo sổ tiết kiệm mới
4. Tính lãi tự động vào ngày đáo hạn
5. Thông báo cho khách hàng khi sắp đáo hạn

**Dữ liệu lưu trữ:**
```sql
INSERT INTO SavingsDeposits (
    account_id, term_id, principal_amount,
    interest_rate, start_date, maturity_date,
    status
) VALUES (
    123, 5, 100000000,
    6.0, '2025-01-01', '2026-01-01',
    'ACTIVE'
);
```

---

### 3.2. Đáo hạn tiết kiệm

**Mô tả:** Khi hết kỳ hạn, khách hàng nhận lại gốc + lãi.

**Ví dụ: Đáo hạn sổ tiết kiệm**

```
Thông tin sổ:
- Mã sổ: STK001
- Số tiền gốc: 100,000,000 VND
- Lãi suất: 6%/năm
- Ngày gửi: 01/01/2025
- Ngày đáo hạn: 01/01/2026 (đủ 12 tháng)
- Lãi dự kiến: 6,000,000 VND
```

**Các lựa chọn khi đáo hạn:**

#### Lựa chọn 1: Rút tiền về tài khoản
```
Hành động: Tất toán sổ tiết kiệm
Kết quả:
- Tài khoản thanh toán nhận: 106,000,000 VND
- Sổ tiết kiệm: Đóng (status = 'CLOSED')
```

#### Lựa chọn 2: Tái tục (chỉ gốc)
```
Hành động: Gửi lại với lãi suất hiện tại
Kết quả:
- Gửi lại: 100,000,000 VND (gốc)
- Tài khoản thanh toán nhận: 6,000,000 VND (lãi)
- Kỳ hạn mới: 12 tháng
- Lãi suất mới: 6.2% (ví dụ thay đổi)
```

#### Lựa chọn 3: Tái tục (gốc + lãi)
```
Hành động: Gửi lại cả gốc lẫn lãi
Kết quả:
- Gửi lại: 106,000,000 VND (gốc + lãi)
- Kỳ hạn mới: 12 tháng
- Lãi suất mới: 6.2%
- Lãi dự kiến kỳ sau: 106,000,000 × 6.2% = 6,572,000 VND
```

**Tự động gia hạn:**
- Nếu khách hàng không thao tác gì trong 7 ngày
- Hệ thống tự động tái tục với lãi suất hiện tại
- Gửi thông báo cho khách hàng

---

### 3.3. Rút tiết kiệm trước hạn

**Mô tả:** Khách hàng rút tiền trước khi đến hạn, sẽ bị mất lãi hoặc tính lãi thấp hơn.

**Ví dụ:**
```
Thông tin sổ:
- Số tiền gốc: 100,000,000 VND
- Kỳ hạn: 12 tháng (lãi suất 6%)
- Ngày gửi: 01/01/2025
- Ngày rút: 01/07/2025 (sau 6 tháng)
- Đã gửi: 6/12 tháng
```

**Cách tính lãi khi rút trước hạn:**
```
Lãi suất không kỳ hạn: 0.5%/năm

Lãi = 100,000,000 × 0.5% × (6/12)
    = 250,000 VND

Tổng nhận về = 100,000,000 + 250,000
             = 100,250,000 VND
```

**So sánh:**
- Nếu gửi đủ 12 tháng: +6,000,000 VND
- Rút trước hạn sau 6 tháng: +250,000 VND
- **Chênh lệch: -5,750,000 VND** ❌

**Lưu ý:**
- Một số ngân hàng có thể phạt thêm phí rút trước hạn
- Nên cân nhắc kỹ trước khi rút trước hạn

---

## 4. NGHIỆP VỤ VAY VỐN

### 4.1. Đăng ký khoản vay

**Mô tả:** Khách hàng đăng ký vay tiền từ ngân hàng.

**Các loại khoản vay:**
1. **Vay tiêu dùng** - Mua sắm, du lịch, sửa nhà
2. **Vay mua nhà** - Mua bất động sản
3. **Vay mua xe** - Mua ô tô, xe máy
4. **Vay kinh doanh** - Vốn lưu động, mở rộng sản xuất

**Ví dụ: Đăng ký vay mua nhà**

```
Thông tin khách hàng:
- Họ tên: Nguyễn Văn A
- Thu nhập: 30,000,000 VND/tháng
- Mục đích vay: Mua nhà
- Số tiền vay: 2,000,000,000 VND (2 tỷ)
- Thời hạn: 20 năm (240 tháng)
- Lãi suất: 8%/năm

Tài sản thế chấp:
- Loại: Căn hộ chung cư
- Địa chỉ: Vinhomes, Q.7, TP.HCM
- Giá trị thẩm định: 3,000,000,000 VND
```

**Hồ sơ cần cung cấp:**
- CMND/CCCD (bản gốc)
- Hộ khẩu, sổ kết hôn
- Chứng minh thu nhập (lương 3-6 tháng gần nhất)
- Sổ đỏ/Hợp đồng mua bán nhà
- Giấy tờ tài sản thế chấp

---

### 4.2. Thẩm định hồ sơ vay

**Mô tả:** Cán bộ tín dụng đánh giá khả năng trả nợ và giá trị tài sản.

**Các bước thẩm định:**

#### Bước 1: Kiểm tra hồ sơ
- ✅ Giấy tờ đầy đủ, hợp lệ
- ✅ Chữ ký rõ ràng
- ✅ Thông tin khớp với hệ thống

#### Bước 2: Đánh giá khả năng trả nợ
```
Thu nhập hàng tháng: 30,000,000 VND
Chi phí sinh hoạt ước tính: -10,000,000 VND
Thu nhập còn lại: 20,000,000 VND

Khoản vay đề xuất: 2,000,000,000 VND
Lãi suất: 8%/năm
Thời hạn: 20 năm (240 tháng)

Tính tiền trả hàng tháng (annuity):
PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
Trong đó:
- P = 2,000,000,000 (số tiền vay)
- r = 8%/12 = 0.00667 (lãi suất tháng)
- n = 240 (số tháng)

PMT = 16,729,000 VND/tháng

Tỷ lệ thu nhập/nợ:
= 16,729,000 / 30,000,000
= 55.76%

✅ Đạt yêu cầu (< 60%)
```

#### Bước 3: Thẩm định tài sản thế chấp
```
Giá trị thẩm định: 3,000,000,000 VND
Số tiền vay: 2,000,000,000 VND
LTV Ratio = 2,000,000,000 / 3,000,000,000 = 66.67%

✅ Đạt yêu cầu (< 70% cho vay mua nhà)
```

#### Bước 4: Kiểm tra tín dụng CIC
```
Tra cứu lịch sử vay:
- Không có nợ xấu ✅
- Không có nợ quá hạn hiện tại ✅
- Điểm tín dụng: 750/1000 ✅ (Khá)
```

**Quyết định:**
```
✅ PHÊ DUYỆT KHOẢN VAY
- Số tiền: 2,000,000,000 VND
- Lãi suất: 8%/năm
- Thời hạn: 20 năm
- Trả góp: 16,729,000 VND/tháng
```

---

### 4.3. Giải ngân

**Mô tả:** Sau khi phê duyệt, ngân hàng chuyển tiền vay vào tài khoản khách hàng.

**Quy trình:**

1. **Ký hợp đồng vay**
   - Khách hàng và cán bộ tín dụng ký hợp đồng
   - Có công chứng (với khoản vay lớn)

2. **Thế chấp tài sản**
   - Đăng ký thế chấp tại cơ quan nhà nước
   - Ngân hàng giữ sổ đỏ gốc

3. **Giải ngân**
   ```
   Khoản vay: 2,000,000,000 VND
   Phí giải ngân: -2,000,000 VND (0.1%)
   Số tiền thực nhận: 1,998,000,000 VND
   ```

4. **Tạo lịch trả nợ**
   ```sql
   INSERT INTO Loans (
       customer_id, loan_type_id, collateral_id,
       principal_amount, interest_rate, term_months,
       monthly_payment, outstanding_balance,
       start_date, maturity_date, status
   ) VALUES (
       1, 2, 5,
       2000000000, 8.0, 240,
       16729000, 2000000000,
       '2025-01-01', '2045-01-01', 'ACTIVE'
   );
   ```

5. **Chuyển tiền**
   - Chuyển 1,998,000,000 VND vào tài khoản khách hàng
   - Gửi SMS/Email xác nhận giải ngân

---

### 4.4. Trả nợ

**Mô tả:** Khách hàng trả tiền gốc và lãi định kỳ hàng tháng.

**Ví dụ: Lịch trả nợ tháng 1**

```
Khoản vay:
- Dư nợ gốc: 2,000,000,000 VND
- Lãi suất: 8%/năm = 0.667%/tháng
- Kỳ trả: Tháng 1/240

Tính lãi tháng 1:
Lãi = 2,000,000,000 × 0.667% = 13,340,000 VND

Tiền trả hàng tháng: 16,729,000 VND
Trong đó:
- Trả lãi: 13,340,000 VND
- Trả gốc: 3,389,000 VND

Dư nợ còn lại:
= 2,000,000,000 - 3,389,000
= 1,996,611,000 VND
```

**Lịch trả nợ 3 tháng đầu:**

| Tháng | Dư nợ đầu kỳ | Trả lãi | Trả gốc | Trả tổng | Dư nợ cuối kỳ |
|-------|--------------|---------|---------|----------|---------------|
| 1 | 2,000,000,000 | 13,340,000 | 3,389,000 | 16,729,000 | 1,996,611,000 |
| 2 | 1,996,611,000 | 13,317,407 | 3,411,593 | 16,729,000 | 1,993,199,407 |
| 3 | 1,993,199,407 | 13,294,663 | 3,434,337 | 16,729,000 | 1,989,765,070 |

**Cách thức trả nợ:**

1. **Trả tự động (Auto-debit)**
   - Ngân hàng tự động trừ từ tài khoản thanh toán
   - Khách hàng chỉ cần đảm bảo đủ số dư

2. **Trả thủ công**
   - Khách hàng nộp tiền vào quầy hoặc chuyển khoản
   - Cần thực hiện trước ngày đáo hạn

**Dữ liệu lưu trữ:**
```sql
INSERT INTO LoanRepayments (
    loan_id, payment_date, payment_amount,
    principal_paid, interest_paid,
    outstanding_balance_after, status
) VALUES (
    1, '2025-02-01', 16729000,
    3389000, 13340000,
    1996611000, 'PAID'
);
```

---

### 4.5. Trả nợ trước hạn

**Mô tả:** Khách hàng trả hết nợ trước khi đến hạn.

**Ví dụ:**
```
Thông tin khoản vay:
- Số tiền vay ban đầu: 2,000,000,000 VND
- Đã trả: 36 tháng (3 năm)
- Dư nợ còn lại: 1,820,000,000 VND
- Còn lại: 204 tháng (17 năm)

Khách hàng muốn: Trả hết nợ ngay
```

**Tính toán:**
```
Dư nợ gốc: 1,820,000,000 VND
Lãi tích lũy trong tháng: 12,133,000 VND
Phí trả trước hạn: 9,100,000 VND (0.5% dư nợ)

Tổng phải trả = 1,820,000,000 + 12,133,000 + 9,100,000
              = 1,841,233,000 VND
```

**Lợi ích:**
- Tiết kiệm lãi: ~1.5 tỷ VND (lãi 17 năm còn lại)
- Giải phóng tài sản thế chấp sớm

**Quy trình:**
1. Khách hàng thông báo trả trước hạn (trước 15 ngày)
2. Cán bộ tín dụng tính toán số tiền cần trả
3. Khách hàng nộp tiền
4. Cập nhật trạng thái khoản vay: `CLOSED`
5. Hoàn trả sổ đỏ/tài sản thế chấp

---

### 4.6. Nợ quá hạn

**Mô tả:** Khách hàng không trả nợ đúng hạn.

**Phân loại nợ:**

| Loại nợ | Quá hạn | Lãi phạt | Hành động |
|---------|---------|----------|-----------|
| **Nợ đủ chuẩn** | 0 ngày | - | Bình thường |
| **Nợ cần chú ý** | 1-90 ngày | +2% | Nhắc nhở qua SMS/call |
| **Nợ dưới chuẩn** | 91-180 ngày | +3% | Gặp gỡ khách hàng |
| **Nợ nghi ngờ** | 181-360 ngày | +4% | Đe dọa pháp lý |
| **Nợ có khả năng mất vốn** | > 360 ngày | +5% | Xử lý tài sản thế chấp |

**Ví dụ: Nợ quá hạn 30 ngày**

```
Khoản vay:
- Dư nợ: 1,900,000,000 VND
- Trả hàng tháng: 16,729,000 VND
- Ngày đến hạn: 01/02/2025
- Ngày hiện tại: 03/03/2025 (quá hạn 30 ngày)

Tính lãi phạt:
Lãi phạt = Số tiền chưa trả × Lãi suất phạt × Số ngày
         = 16,729,000 × (8%+2%)/365 × 30
         = 137,765 VND

Tổng phải trả = 16,729,000 + 137,765
              = 16,866,765 VND
```

**Hệ lụy:**
- Tăng lãi suất vay
- Giảm điểm tín dụng
- Báo cáo lên CIC (nợ xấu)
- Có thể bị khởi kiện
- Mất tài sản thế chấp

---

## 5. NGHIỆP VỤ THẺ NGÂN HÀNG

### 5.1. Phát hành thẻ

**Mô tả:** Tạo thẻ ATM/Debit/Credit cho khách hàng.

**Loại thẻ:**

#### 5.1.1. Thẻ Ghi nợ (Debit Card)
```
Đặc điểm:
- Liên kết với tài khoản thanh toán
- Chi tiêu trong hạn mức số dư
- Không có nợ
- Phí thường niên: 50,000 VND/năm
```

**Ví dụ:**
```
Khách hàng: Nguyễn Văn A
Loại thẻ: Visa Debit
Số thẻ: 4111 1111 1111 1111
Tài khoản liên kết: 1001234567
Hạn sử dụng: 01/2030
Hạn mức rút/ngày: 20,000,000 VND
Hạn mức thanh toán/ngày: 100,000,000 VND
```

#### 5.1.2. Thẻ Tín dụng (Credit Card)
```
Đặc điểm:
- Không liên kết tài khoản cụ thể
- Có hạn mức tín dụng
- Chi tiêu trước, trả sau
- Có lãi suất nếu không trả hết
- Phí thường niên: 500,000 VND/năm
```

**Ví dụ:**
```
Khách hàng: Trần Thị B
Loại thẻ: MasterCard Credit
Số thẻ: 5111 1111 1111 1112
Hạn mức: 50,000,000 VND
Đã sử dụng: 15,000,000 VND
Còn lại: 35,000,000 VND
Kỳ thanh toán: Mỗi ngày 15 hàng tháng
Lãi suất: 18%/năm (nếu trả chậm)
```

---

### 5.2. Giao dịch thẻ

**Ví dụ: Thanh toán bằng thẻ tín dụng**

```
Ngày 10/02/2025:
- Mua sắm tại siêu thị: 5,000,000 VND
- Ăn nhà hàng: 2,000,000 VND
- Mua xăng: 500,000 VND
Tổng chi trong ngày: 7,500,000 VND

Hạn mức:
- Ban đầu: 50,000,000 VND
- Đã dùng trước đó: 15,000,000 VND
- Chi hôm nay: 7,500,000 VND
- Còn lại: 27,500,000 VND
```

**Sao kê thẻ tín dụng tháng 2:**
```
Ngày        Mô tả                     Số tiền
01/02       Số dư đầu kỳ              -15,000,000
05/02       Thanh toán hóa đơn         +5,000,000
10/02       Mua sắm siêu thị           -5,000,000
10/02       Ăn nhà hàng                -2,000,000
10/02       Mua xăng                     -500,000
15/02       Ngày đến hạn thanh toán
28/02       Số dư cuối kỳ             -17,500,000
```

**Kỳ thanh toán (ngày 15/02):**
```
Tổng dư nợ: 17,500,000 VND

Lựa chọn 1: Trả toàn bộ
- Trả: 17,500,000 VND
- Lãi: 0 VND ✅

Lựa chọn 2: Trả tối thiểu (5%)
- Trả: 875,000 VND
- Còn nợ: 16,625,000 VND
- Lãi tháng sau: 16,625,000 × (18%/12) = 249,375 VND ❌

Khuyến nghị: Trả toàn bộ để tránh lãi suất cao
```

---

### 5.3. Khóa/Mở khóa thẻ

**Mô tả:** Tạm khóa thẻ khi mất hoặc nghi ngờ bị đánh cắp thông tin.

**Ví dụ: Mất thẻ**

```
Tình huống:
- Chị Lan mất ví có thẻ ATM
- Sợ bị kẻ gian rút tiền

Hành động:
1. Gọi hotline: 1900-xxxx
2. Cung cấp thông tin: CMND, mã khách hàng
3. Yêu cầu khóa thẻ số: 4111 1111 1111 1111
4. Ngân hàng khóa thẻ ngay lập tức
5. Thẻ không thể sử dụng nữa

Kết quả:
- Thẻ bị khóa: ❌ Không thể rút tiền/thanh toán
- Tài khoản vẫn hoạt động: ✅ Có thể nhận tiền
```

**Làm thẻ mới:**
1. Đến chi nhánh với CMND
2. Điền đơn làm lại thẻ
3. Phí làm lại: 50,000 VND
4. Nhận thẻ mới sau 3-5 ngày làm việc

---

## 6. NGHIỆP VỤ TÀI SẢN THẾ CHẤP

### 6.1. Đăng ký tài sản thế chấp

**Mô tả:** Khách hàng đăng ký tài sản để được thẩm định và sử dụng cho vay.

**Các loại tài sản:**
1. **Bất động sản** - Nhà, đất, căn hộ
2. **Xe cộ** - Ô tô, xe máy
3. **Giấy tờ có giá** - Sổ tiết kiệm, cổ phiếu, trái phiếu
4. **Vàng, kim loại quý**

**Ví dụ: Đăng ký thế chấp căn hộ**

```
Thông tin tài sản:
- Loại: Căn hộ chung cư
- Tên: Căn hộ 2PN tại Vinhomes
- Địa chỉ: 789 Nguyễn Văn Linh, Q.7, TP.HCM
- Diện tích: 80m²
- Số giấy chứng nhận: CC123456
- Ngày cấp: 10/03/2020
- Cơ quan cấp: Sở Xây dựng TP.HCM
- Chủ sở hữu: Nguyễn Văn A
- Giá trị khai báo: 3,000,000,000 VND
```

**Hồ sơ cần nộp:**
- Sổ hồng/Sổ đỏ (bản gốc và photo)
- CMND chủ sở hữu
- Hợp đồng mua bán (nếu có)
- Giấy kết hôn (nếu tài sản chung vợ chồng)
- Ảnh chụp tài sản

---

### 6.2. Thẩm định tài sản

**Mô tả:** Cán bộ tín dụng khảo sát và định giá tài sản.

**Quy trình thẩm định:**

#### Bước 1: Kiểm tra hồ sơ pháp lý
```
✅ Sổ hồng hợp lệ, còn hiệu lực
✅ Không có tranh chấp
✅ Không bị thế chấp cho bên khác
✅ Thông tin khớp với thực tế
```

#### Bước 2: Khảo sát thực tế
```
Ngày khảo sát: 15/02/2025
Cán bộ: Phạm Thị Tín Dụng

Kết quả khảo sát:
- Vị trí: Trung tâm Q.7, gần trường học, chợ ✅
- Tình trạng: Mới, đầy đủ nội thất ✅
- Pháp lý: Rõ ràng, không tranh chấp ✅
- Khả năng thanh khoản: Cao ✅
```

#### Bước 3: Định giá
```
Phương pháp định giá:
1. So sánh với giá thị trường cùng khu vực
2. Tham khảo giá đã giao dịch gần đây
3. Điều chỉnh theo tình trạng tài sản

Giá thị trường: 42,000,000 VND/m²
Diện tích: 80m²
Giá trị thị trường = 42,000,000 × 80 = 3,360,000,000 VND

Hệ số thận trọng: 90%
Giá trị thẩm định = 3,360,000,000 × 90%
                  = 3,024,000,000 VND
```

#### Bước 4: Duyệt tài sản
```
Kết luận:
✅ PHÊ DUYỆT TÀI SẢN THẾ CHẤP

Thông tin sau thẩm định:
- Giá trị thẩm định: 3,024,000,000 VND
- Hạn mức tối đa cho vay: 2,116,800,000 VND (70% LTV)
- Trạng thái: AVAILABLE (sẵn sàng sử dụng)
- Người thẩm định: Phạm Thị Tín Dụng
- Ngày thẩm định: 15/02/2025
```

**Dữ liệu lưu trữ:**
```sql
UPDATE Collaterals 
SET appraised_value = 3024000000,
    appraised_by = 4,
    appraised_date = '2025-02-15',
    status = 'AVAILABLE',
    verification_notes = 'Tài sản hợp lệ, giá trị chính xác'
WHERE collateral_id = 5;
```

---

### 6.3. Sử dụng tài sản cho vay

**Mô tả:** Sử dụng tài sản đã thẩm định để đăng ký khoản vay.

**Ví dụ:**
```
Tài sản thế chấp:
- Giá trị thẩm định: 3,024,000,000 VND
- LTV tối đa: 70%
- Số tiền vay tối đa: 2,116,800,000 VND

Khoản vay đăng ký:
- Số tiền vay: 2,000,000,000 VND
- LTV thực tế: 66.14% ✅
- Đủ điều kiện vay
```

**Khi giải ngân:**
```sql
-- Cập nhật trạng thái tài sản
UPDATE Collaterals 
SET status = 'IN_USE'
WHERE collateral_id = 5;

-- Gắn tài sản vào khoản vay
UPDATE Loans 
SET collateral_id = 5
WHERE loan_id = 10;
```

---

### 6.4. Giải phóng tài sản

**Mô tả:** Trả hết nợ, hoàn trả tài sản cho khách hàng.

**Điều kiện:**
- Đã trả hết khoản vay
- Không còn nợ lãi, phí
- Không có khoản vay nào khác đang sử dụng tài sản này

**Quy trình:**
```
1. Khách hàng trả hết nợ
   Dư nợ: 1,820,000,000 → 0 VND ✅

2. Cập nhật trạng thái khoản vay
   Status: ACTIVE → CLOSED ✅

3. Giải phóng tài sản thế chấp
   Collateral status: IN_USE → AVAILABLE ✅

4. Làm thủ tục giải chấp tại cơ quan nhà nước
   - Nộp hồ sơ: 3-5 ngày làm việc
   - Cơ quan xóa ghi chú thế chấp trên sổ

5. Hoàn trả sổ đỏ gốc cho khách hàng
   - Khách hàng ký xác nhận nhận lại
   - Ngân hàng lưu bản sao hồ sơ
```

---

## 7. NGHIỆP VỤ NÂNG CAO

### 7.1. Tính lãi suất thả nổi

**Mô tả:** Lãi suất thay đổi theo lãi suất thị trường.

**Ví dụ:**
```
Khoản vay: 2,000,000,000 VND
Lãi suất: Thả nổi (Floating rate)
Công thức: Lãi suất cơ bản + Biên độ

Năm 1: 6% + 2% = 8%/năm
Năm 2: 6.5% + 2% = 8.5%/năm (NHNN tăng lãi suất)
Năm 3: 6% + 2% = 8%/năm (NHNN giảm lãi suất)

→ Tiền trả hàng tháng thay đổi theo
```

**So sánh:**

| Loại lãi suất | Ưu điểm | Nhược điểm |
|---------------|---------|------------|
| **Cố định** | Dễ tính toán, ổn định | Thường cao hơn lúc đầu |
| **Thả nổi** | Linh hoạt, có thể giảm | Rủi ro tăng khi thị trường tăng |

---

### 7.2. Chuyển nợ (Refinancing)

**Mô tả:** Vay ngân hàng khác để trả nợ ngân hàng cũ (lãi suất thấp hơn).

**Ví dụ:**
```
Khoản vay cũ (Ngân hàng A):
- Dư nợ: 1,500,000,000 VND
- Lãi suất: 10%/năm
- Trả hàng tháng: 15,000,000 VND

Khoản vay mới (Ngân hàng B):
- Vay: 1,500,000,000 VND
- Lãi suất: 8%/năm
- Trả hàng tháng: 13,500,000 VND

Tiết kiệm: 1,500,000 VND/tháng
```

---

### 7.3. Thấu chi (Overdraft)

**Mô tả:** Rút vượt quá số dư trong giới hạn cho phép.

**Ví dụ:**
```
Tài khoản:
- Số dư: 5,000,000 VND
- Hạn mức thấu chi: 10,000,000 VND
- Tổng có thể chi: 15,000,000 VND

Giao dịch:
- Chuyển khoản: 12,000,000 VND
- Số dư sau GD: -7,000,000 VND (thấu chi)

Lãi thấu chi:
- Lãi suất: 18%/năm
- Tính trên số tiền thấu chi: 7,000,000 VND
- Lãi 1 ngày: 7,000,000 × 18% / 365 = 3,452 VND
```

---

## 8. CÁC TÌNH HUỐNG ĐẶC BIỆT

### 8.1. Giao dịch đồng thời (Concurrency)

**Vấn đề:** Hai giao dịch cùng lúc có thể gây mất dữ liệu.

**Ví dụ:**
```
Tài khoản A: Số dư 10,000,000 VND

Cùng lúc:
- Giao dịch 1: Rút 6,000,000 VND
- Giao dịch 2: Rút 7,000,000 VND

Không có khóa (Wrong):
T1 đọc: 10,000,000 ✅
T2 đọc: 10,000,000 ✅
T1 trừ: 10,000,000 - 6,000,000 = 4,000,000 ✅
T2 trừ: 10,000,000 - 7,000,000 = 3,000,000 ✅
→ Kết quả: 3,000,000 VND ❌ (Sai! Đáng lẽ phải từ chối T2)

Có khóa (Correct):
T1 khóa tài khoản
T1 đọc: 10,000,000 ✅
T1 trừ: 4,000,000 ✅
T1 mở khóa
T2 khóa tài khoản
T2 đọc: 4,000,000
T2 kiểm tra: 4,000,000 < 7,000,000 ❌
T2 từ chối giao dịch ✅
```

**Giải pháp: Transaction + Locking**
```sql
START TRANSACTION;
SELECT balance FROM Accounts WHERE account_id = 1 FOR UPDATE;
-- Kiểm tra số dư
IF balance >= amount THEN
    UPDATE Accounts SET balance = balance - amount WHERE account_id = 1;
    COMMIT;
ELSE
    ROLLBACK;
END IF;
```

---

### 8.2. Rollback giao dịch

**Ví dụ: Chuyển khoản bị lỗi**

```
Chuyển khoản: A → B, 5,000,000 VND

Bước 1: Trừ tiền A ✅
A: 10,000,000 → 5,000,000 VND

Bước 2: Cộng tiền B ❌ (Lỗi kết nối)
→ Rollback tất cả

Kết quả:
A: Quay lại 10,000,000 VND
B: Không thay đổi
Giao dịch: FAILED
```

**ACID Properties:**
- **Atomicity**: Tất cả hoặc không có gì
- **Consistency**: Dữ liệu nhất quán
- **Isolation**: Giao dịch độc lập
- **Durability**: Dữ liệu lưu vĩnh viễn

---

## 9. TÓM TẮT LUỒNG DỮ LIỆU

### 9.1. Luồng tiền trong hệ thống

```
Nạp tiền → Tài khoản thanh toán → [Sử dụng]
                                      ↓
                    ┌─────────────────┼─────────────────┐
                    ↓                 ↓                 ↓
              Gửi tiết kiệm     Trả nợ vay      Chuyển khoản
                    ↓                 ↓                 ↓
              Nhận lãi         Giảm dư nợ       Tài khoản khác
                    ↓                 ↓
              Rút về TK       Hoàn thành vay
```

### 9.2. Luồng vay vốn

```
Đăng ký → Thẩm định → Phê duyệt → Giải ngân → Trả nợ → Hoàn thành
   ↓          ↓           ↓           ↓         ↓         ↓
Hồ sơ    Đánh giá    Quyết định   Nhận tiền  Hàng tháng Giải chấp
         Tài sản     Cho vay      Vào TK                Tài sản
```

---

## 10. CHECKLIST NGHIỆP VỤ

### Checklist cho Giao dịch viên

- [ ] Kiểm tra CMND khách hàng
- [ ] Xác nhận số tài khoản
- [ ] Kiểm tra số dư (với rút tiền/chuyển khoản)
- [ ] Đếm tiền chính xác (với giao dịch tiền mặt)
- [ ] In biên lai giao dịch
- [ ] Gửi SMS xác nhận

### Checklist cho Cán bộ tín dụng

- [ ] Kiểm tra hồ sơ vay đầy đủ
- [ ] Tra cứu lịch sử tín dụng CIC
- [ ] Thẩm định tài sản thế chấp
- [ ] Tính toán khả năng trả nợ
- [ ] Tính LTV ratio
- [ ] Phê duyệt/Từ chối có lý do
- [ ] Lập lịch trả nợ
- [ ] Theo dõi nợ quá hạn

---

## PHỤ LỤC

### Công thức tính toán

**1. Lãi đơn:**
```
Lãi = Gốc × Lãi_suất × Thời_gian
```

**2. Lãi kép:**
```
Tổng = Gốc × (1 + Lãi_suất)^Thời_gian
```

**3. Trả góp đều (Annuity):**
```
PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
Trong đó:
- P: Số tiền vay
- r: Lãi suất tháng
- n: Số tháng
```

**4. LTV Ratio:**
```
LTV = Số tiền vay / Giá trị tài sản × 100%
```

**5. Debt-to-Income Ratio:**
```
DTI = Tổng nợ hàng tháng / Thu nhập hàng tháng × 100%
```

---

## KẾT LUẬN

Tài liệu này đã giải thích chi tiết các nghiệp vụ chính trong hệ thống quản lý ngân hàng:

✅ **Quản lý tài khoản**: Mở, đóng băng, đóng tài khoản  
✅ **Giao dịch**: Nạp, rút, chuyển khoản  
✅ **Tiết kiệm**: Gửi, đáo hạn, rút trước hạn  
✅ **Vay vốn**: Đăng ký, thẩm định, giải ngân, trả nợ  
✅ **Thẻ ngân hàng**: Phát hành, sử dụng, quản lý  
✅ **Tài sản thế chấp**: Đăng ký, thẩm định, sử dụng, giải phóng  

Hiểu rõ các nghiệp vụ này giúp phát triển hệ thống chính xác và đầy đủ chức năng.

---

**Tài liệu tham khảo:**
- Luật các tổ chức tín dụng 2010
- Thông tư 39/2016/TT-NHNN về xử lý nợ xấu
- Thông tư 41/2016/TT-NHNN về tỷ lệ bảo đảm an toàn

**Cập nhật lần cuối:** 27/10/2025

