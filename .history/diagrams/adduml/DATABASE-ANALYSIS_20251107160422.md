# Phân tích Database Schema

## Tổng quan
- **Tổng số bảng:** 21 bảng
- **Bảng chính:** 19 bảng
- **Bảng phụ:** 2 bảng

## 19 BẢNG CHÍNH

### 1. Quản lý Tổ chức (3 bảng)
1. **Branches** - Chi nhánh
2. **Roles** - Vai trò
3. **Employees** - Nhân viên

### 2. Quản lý Khách hàng (2 bảng)
4. **Customers** - Khách hàng
5. **CreditScores** - Điểm tín dụng (hiện tại)

### 3. Quản lý Tài khoản (3 bảng)
6. **AccountTypes** - Loại tài khoản
7. **Accounts** - Tài khoản
8. **Cards** - Thẻ ngân hàng

### 4. Giao dịch (2 bảng)
9. **TransactionTypes** - Loại giao dịch
10. **Transactions** - Giao dịch

### 5. Tiết kiệm (3 bảng)
11. **SavingsInterestRates** - Lãi suất tiết kiệm
12. **SavingsDeposits** - Sổ tiết kiệm
13. **SavingsTransactions** - Giao dịch tiết kiệm

### 6. Vay vốn (6 bảng)
14. **CollateralTypes** - Loại tài sản thế chấp
15. **Collaterals** - Tài sản thế chấp
16. **LoanTypes** - Loại hình vay
17. **LoanInterestRates** - Lãi suất cho vay
18. **Loans** - Khoản vay
19. **LoanPaymentSchedule** - Lịch trả nợ

---

## 2 BẢNG PHỤ (Bảng lịch sử/chi tiết)

### 1. **CreditScoreHistory**
- **Mục đích:** Lưu lịch sử thay đổi điểm tín dụng
- **Quan hệ:** 
  - Foreign key: `customer_id` → `Customers(customer_id)`
  - Foreign key: `created_by` → `Employees(employee_id)`
- **Chức năng:**
  - Theo dõi mọi thay đổi điểm tín dụng
  - Lưu lý do thay đổi
  - Lưu loại sự kiện (PAYMENT_ON_TIME, PAYMENT_LATE, etc.)
  - Audit trail cho điểm tín dụng
- **Lý do là bảng phụ:**
  - Không chứa dữ liệu nghiệp vụ chính
  - Chỉ lưu lịch sử thay đổi
  - Có thể xóa mà không ảnh hưởng nghiệp vụ chính
  - Phục vụ mục đích audit và báo cáo

### 2. **LoanPayments**
- **Mục đích:** Lưu lịch sử thanh toán khoản vay
- **Quan hệ:**
  - Foreign key: `loan_id` → `Loans(loan_id)`
  - Foreign key: `schedule_id` → `LoanPaymentSchedule(schedule_id)`
  - Foreign key: `transaction_id` → `Transactions(transaction_id)`
- **Chức năng:**
  - Ghi nhận từng lần thanh toán
  - Lưu chi tiết: principal, interest, late fee
  - Liên kết với transaction và schedule
- **Lý do là bảng phụ:**
  - Lưu lịch sử thanh toán (đã xảy ra)
  - Dữ liệu nghiệp vụ chính nằm ở `LoanPaymentSchedule` (kế hoạch trả nợ)
  - Có thể tái tạo từ `Transactions` và `LoanPaymentSchedule`
  - Phục vụ mục đích audit và báo cáo chi tiết

---

## So sánh Bảng chính vs Bảng phụ

| Tiêu chí | Bảng chính | Bảng phụ |
|----------|------------|----------|
| **Chức năng** | Chứa dữ liệu nghiệp vụ cốt lõi | Lưu lịch sử/audit trail |
| **Tầm quan trọng** | Không thể thiếu | Có thể tái tạo |
| **Xóa dữ liệu** | Ảnh hưởng nghiệp vụ | Không ảnh hưởng nghiệp vụ hiện tại |
| **Mục đích** | Vận hành hệ thống | Báo cáo, audit, phân tích |
| **Tần suất truy vấn** | Thường xuyên | Theo nhu cầu |

---

## Lưu ý

- **CreditScoreHistory** và **LoanPayments** vẫn là các bảng quan trọng cho:
  - Audit và compliance
  - Báo cáo chi tiết
  - Phân tích xu hướng
  - Debug và troubleshooting

- Việc phân loại "chính" vs "phụ" dựa trên:
  - Tầm quan trọng với nghiệp vụ cốt lõi
  - Khả năng tái tạo dữ liệu
  - Mục đích sử dụng chính

