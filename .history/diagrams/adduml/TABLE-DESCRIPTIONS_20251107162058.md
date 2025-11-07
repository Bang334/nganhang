# Mô tả chức năng các bảng trong Database

## 1. QUẢN LÝ TỔ CHỨC

### Branches (Chi nhánh)
Lưu thông tin các chi nhánh ngân hàng: mã, tên, địa chỉ, liên hệ, giám đốc.

### Roles (Vai trò)
Định nghĩa các vai trò trong hệ thống: CUSTOMER, TELLER, LOAN_OFFICER, ADMIN.

### Employees (Nhân viên)
Quản lý thông tin nhân viên: mã, tên, email, số điện thoại, vai trò, chi nhánh, tài khoản đăng nhập.

---

## 2. QUẢN LÝ KHÁCH HÀNG

### Customers (Khách hàng)
Lưu thông tin khách hàng: mã, tên, CMND, ngày sinh, giới tính, địa chỉ, nghề nghiệp, thu nhập, chi nhánh đăng ký, tài khoản đăng nhập.

### CreditScores (Điểm tín dụng)
Lưu điểm tín dụng hiện tại của khách hàng (400-850), hạng tín dụng (AAA-C), lãi suất áp dụng, tỷ lệ LTV tối đa, tỷ lệ trả đúng hạn.

### CreditScoreHistory (Lịch sử điểm tín dụng) - Bảng phụ
Ghi lại mọi thay đổi điểm tín dụng: điểm cũ/mới, lý do thay đổi, loại sự kiện (trả đúng hạn, quá hạn, v.v.).

---

## 3. QUẢN LÝ TÀI KHOẢN

### AccountTypes (Loại tài khoản)
Định nghĩa các loại tài khoản: thanh toán, tiết kiệm, với số dư tối thiểu và lãi suất.

### Accounts (Tài khoản)
Quản lý tài khoản của khách hàng: số tài khoản, loại, số dư, lãi suất, ngày mở, trạng thái.

### Cards (Thẻ ngân hàng)
Quản lý thẻ ghi nợ/tín dụng: số thẻ (mã hóa), ngày phát hành, ngày hết hạn, hạn mức, trạng thái.

---

## 4. GIAO DỊCH

### TransactionTypes (Loại giao dịch)
Định nghĩa các loại giao dịch: nạp tiền, rút tiền, chuyển khoản, thanh toán.

### Transactions (Giao dịch)
Ghi nhận mọi giao dịch: mã giao dịch, tài khoản nguồn/đích, số tiền, phí, mô tả, số dư sau giao dịch, trạng thái.

---

## 5. TIẾT KIỆM

### SavingsInterestRates (Lãi suất tiết kiệm)
Cấu hình lãi suất theo kỳ hạn: số tháng, số tiền tối thiểu/tối đa, lãi suất, thời gian hiệu lực.

### SavingsDeposits (Sổ tiết kiệm)
Quản lý sổ tiết kiệm: mã sổ, khách hàng, số tiền gốc, lãi suất, kỳ hạn, ngày mở, ngày đáo hạn, trạng thái.

### SavingsTransactions (Giao dịch tiết kiệm)
Ghi nhận các giao dịch liên quan đến tiết kiệm: gửi tiền, nhận lãi, rút trước hạn, rút đáo hạn, tái tục.

---

## 6. VAY VỐN

### CollateralTypes (Loại tài sản thế chấp)
Định nghĩa loại tài sản: nhà đất, xe ô tô, với tỷ lệ LTV tối đa.

### Collaterals (Tài sản thế chấp)
Quản lý tài sản thế chấp: tên, mô tả, vị trí, số giấy chứng nhận, giá trị ước tính, giá trị thẩm định, người thẩm định, trạng thái.

### LoanTypes (Loại hình vay)
Định nghĩa loại vay: vay mua nhà, vay tiêu dùng, vay kinh doanh, với số tiền và thời hạn tối đa, yêu cầu thế chấp.

### LoanInterestRates (Lãi suất cho vay)
Cấu hình lãi suất theo loại vay, số tiền, thời hạn, hạng tín dụng, thời gian hiệu lực.

### Loans (Khoản vay)
Quản lý khoản vay: mã khoản vay, khách hàng, số tiền yêu cầu/duyệt, lãi suất, thời hạn, tiền trả hàng tháng, tài sản thế chấp, tỷ lệ LTV, số dư nợ, ngày nộp/duyệt/giải ngân/đáo hạn, trạng thái.

### LoanPaymentSchedule (Lịch trả nợ)
Lịch trả nợ định kỳ: số kỳ, ngày đến hạn, số tiền gốc/lãi, tổng tiền, số dư nợ, trạng thái (chờ thanh toán/đã trả/quá hạn).

### LoanPayments (Thanh toán khoản vay) - Bảng phụ
Ghi nhận từng lần thanh toán: ngày thanh toán, số tiền gốc/lãi/phạt đã trả, phương thức thanh toán, liên kết với transaction và schedule.

---

## TÓM TẮT

| Nhóm | Số bảng | Bảng chính |
|------|---------|------------|
| Quản lý Tổ chức | 3 | Branches, Roles, Employees |
| Quản lý Khách hàng | 3 | Customers, CreditScores, CreditScoreHistory* |
| Quản lý Tài khoản | 3 | AccountTypes, Accounts, Cards |
| Giao dịch | 2 | TransactionTypes, Transactions |
| Tiết kiệm | 3 | SavingsInterestRates, SavingsDeposits, SavingsTransactions |
| Vay vốn | 7 | CollateralTypes, Collaterals, LoanTypes, LoanInterestRates, Loans, LoanPaymentSchedule, LoanPayments* |
| **TỔNG** | **21** | **19 chính + 2 phụ** |

*Bảng phụ: CreditScoreHistory, LoanPayments

