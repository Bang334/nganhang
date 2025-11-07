# 📅 HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG ĐÁO HẠN

## 🎯 Tổng quan

Hệ thống đã bổ sung **2 Modal components** xử lý đáo hạn:
1. **SavingsMaturityModal** - Đáo hạn Sổ tiết kiệm
2. **LoanMaturityModal** - Đáo hạn Khoản vay

---

## 💰 1. ĐÁO HẠN TIẾT KIỆM

### Component: `SavingsMaturityModal.jsx`

### Vị trí sử dụng:
```javascript
// Trong Savings.jsx
import SavingsMaturityModal from './SavingsMaturityModal';

// Hiển thị khi sổ tiết kiệm sắp đến hoặc đã đến maturity_date
<SavingsMaturityModal 
  isOpen={showMaturityModal}
  onClose={() => setShowMaturityModal(false)}
  savingsDeposit={selectedDeposit}
/>
```

### Luồng xử lý (3 bước):

#### **Bước 1: Xem thông tin & chọn phương án**
Hiển thị:
- Thông tin sổ tiết kiệm (số sổ, kỳ hạn, lãi suất)
- Tiền gốc + Lãi đã tích lũy = Tổng cộng

3 Lựa chọn:
1. ✅ **Rút tiền về tài khoản** - Nhận toàn bộ gốc + lãi
2. ✅ **Tái tục chỉ gốc** - Gửi lại gốc, nhận lãi về TK
3. ✅ **Tái tục gốc + lãi** - Gửi lại toàn bộ (lãi kép)

#### **Bước 2: Cấu hình (nếu tái tục)**
- Chọn kỳ hạn mới (1, 3, 6, 12, 24 tháng)
- Xem lãi suất hiện tại
- Dự kiến lãi kỳ mới
- Tùy chọn tự động tái tục

#### **Bước 3: Xác nhận**
- Xem lại thông tin
- Xác nhận thực hiện

### Props:
```typescript
{
  isOpen: boolean;              // Trạng thái hiển thị modal
  onClose: () => void;          // Callback đóng modal
  savingsDeposit: {             // Thông tin sổ tiết kiệm
    deposit_id: number;
    deposit_number: string;
    principal_amount: number;
    interest_rate: number;
    term_months: number;
    start_date: string;
    maturity_date: string;
    total_interest_earned: number;
    status: string;
  }
}
```

### API cần implement:
```javascript
// POST /api/savings/:id/mature
{
  option: 'withdraw' | 'renew_principal' | 'renew_full',
  newTerm?: number,           // Nếu tái tục
  newRate?: number,           // Nếu tái tục
  autoRenew?: boolean         // Nếu tái tục
}
```

---

## 💸 2. ĐÁO HẠN KHOẢN VAY

### Component: `LoanMaturityModal.jsx`

### Vị trí sử dụng:
```javascript
// Trong Loans.jsx
import LoanMaturityModal from './LoanMaturityModal';

// Hiển thị khi khoản vay sắp đến hoặc đã đến maturity_date
<LoanMaturityModal 
  isOpen={showMaturityModal}
  onClose={() => setShowMaturityModal(false)}
  loan={selectedLoan}
/>
```

### Luồng xử lý:

#### **Option 1: Trả hết nợ (2 bước)**

**Bước 1:** Chọn "Trả hết nợ và kết thúc"

**Bước 2:** Xác nhận
- Hiển thị tổng số tiền cần trả
- Lợi ích: Giải phóng tài sản, cải thiện credit score
- Xác nhận thanh toán

#### **Option 2: Gia hạn khoản vay (3 bước)**

**Bước 1:** Chọn "Gia hạn khoản vay"

**Bước 2:** Cấu hình
- Chọn thời gian gia hạn (6, 12, 18, 24, 36 tháng)
- Lãi suất mới (có thể thay đổi)
- Preview: Monthly payment, tổng lãi thêm, ngày đáo hạn mới

**Bước 3:** Xác nhận gửi yêu cầu
- Yêu cầu sẽ được gửi đến Loan Officer
- Thời gian xử lý: 2-3 ngày

#### **Option 3: Tái cấu trúc (3 bước)**

**Bước 1:** Chọn "Tái cấu trúc khoản vay"

**Bước 2:** Xem thông tin
- Giải thích về tái cấu trúc
- Các điều khoản có thể thay đổi
- Yêu cầu cần đáp ứng

**Bước 3:** Xác nhận gửi yêu cầu
- Yêu cầu cần thẩm định lại
- Thời gian xử lý: 5-7 ngày

### Props:
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  loan: {
    loan_id: number;
    loan_number: string;
    loan_amount: number;
    outstanding_balance: number;
    interest_rate: number;
    term_months: number;
    monthly_payment: number;
    disbursement_date: string;
    maturity_date: string;
    status: string;
  }
}
```

### API cần implement:

#### Trả hết nợ:
```javascript
// POST /api/loans/:id/payoff
{
  amount: number
}
```

#### Gia hạn:
```javascript
// POST /api/loans/:id/extend
{
  extensionMonths: number,
  newInterestRate: number
}
```

#### Tái cấu trúc:
```javascript
// POST /api/loans/:id/restructure
{
  newTerms: {
    term_months?: number,
    interest_rate?: number,
    monthly_payment?: number
  }
}
```

---

## 🔔 3. SCHEDULED JOB

### Cần tạo Backend Jobs:

#### Job 1: Check Savings Maturity
```javascript
// Chạy hàng ngày lúc 00:00
checkSavingsMaturity() {
  // SELECT savings WHERE maturity_date <= TODAY + 7
  // Gửi thông báo cho khách hàng
  // Nếu có auto_renew = 'YES' → Tự động tái tục
}
```

#### Job 2: Check Loan Maturity
```javascript
// Chạy hàng ngày lúc 00:00
checkLoanMaturity() {
  // SELECT loans WHERE maturity_date <= TODAY + 30
  // Gửi thông báo nhắc nhở
}
```

---

## 📱 4. CÁCH TÍCH HỢP VÀO HỆ THỐNG

### Trong `Savings.jsx`:
```javascript
import { useState } from 'react';
import SavingsMaturityModal from './SavingsMaturityModal';

const Savings = () => {
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  const handleMaturity = (deposit) => {
    setSelectedDeposit(deposit);
    setShowMaturityModal(true);
  };

  return (
    <>
      {deposits.map(deposit => {
        const daysUntilMaturity = calculateDays(deposit.maturity_date);
        
        return (
          <div key={deposit.deposit_id}>
            {/* ... Hiển thị thông tin sổ ... */}
            
            {/* Hiển thị nút nếu sắp đáo hạn */}
            {daysUntilMaturity <= 7 && (
              <button 
                className="btn btn-warning"
                onClick={() => handleMaturity(deposit)}
              >
                ⚠️ Sắp đáo hạn - Xử lý ngay
              </button>
            )}
            
            {/* Hoặc nếu đã đáo hạn */}
            {deposit.status === 'MATURED' && (
              <button 
                className="btn btn-primary"
                onClick={() => handleMaturity(deposit)}
              >
                Xử lý đáo hạn
              </button>
            )}
          </div>
        );
      })}
      
      <SavingsMaturityModal
        isOpen={showMaturityModal}
        onClose={() => setShowMaturityModal(false)}
        savingsDeposit={selectedDeposit}
      />
    </>
  );
};
```

### Trong `Loans.jsx`:
```javascript
import { useState } from 'react';
import LoanMaturityModal from './LoanMaturityModal';

const Loans = () => {
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleMaturity = (loan) => {
    setSelectedLoan(loan);
    setShowMaturityModal(true);
  };

  return (
    <>
      {loans.map(loan => {
        const daysUntilMaturity = calculateDays(loan.maturity_date);
        
        return (
          <div key={loan.loan_id}>
            {/* ... Hiển thị thông tin khoản vay ... */}
            
            {/* Cảnh báo sắp đáo hạn */}
            {daysUntilMaturity <= 30 && loan.status === 'ACTIVE' && (
              <div className="alert alert-warning">
                ⚠️ Khoản vay sẽ đáo hạn trong {daysUntilMaturity} ngày
                <button 
                  className="btn btn-sm btn-warning ml-2"
                  onClick={() => handleMaturity(loan)}
                >
                  Xử lý ngay
                </button>
              </div>
            )}
          </div>
        );
      })}
      
      <LoanMaturityModal
        isOpen={showMaturityModal}
        onClose={() => setShowMaturityModal(false)}
        loan={selectedLoan}
      />
    </>
  );
};
```

---

## 🎨 5. STYLING

Cả 2 modals đều sử dụng:
- Component-scoped CSS với `<style jsx>{...}</style>`
- Variables từ global CSS (--primary-color, --bg-secondary, etc.)
- Responsive design
- Multi-step form với progress indicator

---

## 📊 6. DATABASE

**Không cần thay đổi** - Schema hiện tại đã đủ:

### Cho Tiết kiệm:
```sql
SavingsDeposits table:
- maturity_date ✅
- auto_renew ✅
- status (ACTIVE, MATURED, CLOSED) ✅

SavingsTransactions table:
- transaction_type (RENEWAL, MATURITY_WITHDRAWAL) ✅
```

### Cho Vay:
```sql
Loans table:
- maturity_date ✅
- outstanding_balance ✅
- status (ACTIVE, PAID_OFF) ✅
```

**Tùy chọn:** Tạo thêm bảng `LoanRestructuring` để lưu lịch sử gia hạn/tái cấu trúc (xem Activity Diagram 10 & 11 để biết chi tiết).

---

## ✅ CHECKLIST TRIỂN KHAI

### Frontend:
- [x] Tạo SavingsMaturityModal.jsx
- [x] Tạo LoanMaturityModal.jsx
- [ ] Tích hợp vào Savings.jsx
- [ ] Tích hợp vào Loans.jsx
- [ ] Thêm logic tính daysUntilMaturity
- [ ] Thêm notifications khi sắp đáo hạn

### Backend:
- [ ] API: POST /api/savings/:id/mature
- [ ] API: POST /api/loans/:id/payoff
- [ ] API: POST /api/loans/:id/extend
- [ ] API: POST /api/loans/:id/restructure
- [ ] Scheduled Job: checkSavingsMaturity()
- [ ] Scheduled Job: checkLoanMaturity()
- [ ] Notification system (SMS, Email)

### Testing:
- [ ] Test đáo hạn tiết kiệm - Rút tiền
- [ ] Test đáo hạn tiết kiệm - Tái tục gốc
- [ ] Test đáo hạn tiết kiệm - Tái tục gốc + lãi
- [ ] Test đáo hạn vay - Trả hết nợ
- [ ] Test đáo hạn vay - Gia hạn
- [ ] Test đáo hạn vay - Tái cấu trúc
- [ ] Test auto-renew cho tiết kiệm

---

**🎉 Hoàn thành tài liệu! Sử dụng 2 Activity Diagrams (10 & 11) để hiểu rõ logic xử lý!**

