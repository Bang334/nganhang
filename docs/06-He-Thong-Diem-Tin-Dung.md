# HỆ THỐNG ĐIỂM TÍN DỤNG (CREDIT SCORING)

> Tài liệu chi tiết về cách tính điểm tín dụng và ảnh hưởng của nó trong hệ thống ngân hàng

---

## 📊 TỔNG QUAN

### Điểm tín dụng là gì?

**Credit Score** (Điểm tín dụng) là một con số từ **0 đến 1000** được tính toán dựa trên lịch sử tài chính của khách hàng để đánh giá **khả năng trả nợ** và **mức độ rủi ro** khi cho vay.

### Tại sao quan trọng?

- 🎯 **Đánh giá rủi ro:** Giúp ngân hàng quyết định có cho vay hay không
- 💰 **Xác định lãi suất:** Khách hàng có điểm cao được lãi suất ưu đãi
- ⚡ **Tốc độ phê duyệt:** Điểm cao = duyệt nhanh, điểm thấp = xét duyệt kỹ hơn
- 📈 **Hạn mức vay:** Điểm cao có thể vay nhiều hơn

---

## 🎓 THANG ĐIỂM VÀ XẾP HẠNG

### Bảng xếp hạng Credit Score

| Xếp hạng | Khoảng điểm | Đánh giá | Mức độ rủi ro | Khả năng vay |
|----------|-------------|----------|---------------|--------------|
| **AAA** | 900-1000 | Xuất sắc | Rất thấp | Rất cao |
| **AA** | 800-899 | Rất tốt | Thấp | Cao |
| **A** | 700-799 | Tốt | Trung bình thấp | Tốt |
| **BBB** | 600-699 | Khá | Trung bình | Khá |
| **BB** | 500-599 | Trung bình | Trung bình cao | Cân nhắc |
| **B** | 400-499 | Dưới trung bình | Cao | Hạn chế |
| **CCC** | 300-399 | Kém | Rất cao | Rất hạn chế |
| **CC** | 200-299 | Rất kém | Cực cao | Khó vay |
| **C** | 100-199 | Tệ | Nguy hiểm | Từ chối |
| **D** | 0-99 | Xấu nhất | Không chấp nhận | Từ chối |

---

## 🧮 CÁCH TÍNH ĐIỂM TÍN DỤNG

### Công thức tính tổng quát

```
Credit Score = Σ (Trọng số × Điểm từng yếu tố)
```

### Các yếu tố và trọng số

#### 1. Lịch sử trả nợ (35% - 350 điểm)

**Các chỉ số:**
- Số lần trả đúng hạn
- Số lần trả chậm
- Số lần quá hạn > 30 ngày
- Có nợ xấu không?

**Cách tính:**
```javascript
function calculatePaymentHistory(customer) {
  let score = 350; // Điểm tối đa
  
  // Lấy lịch sử trả nợ từ CIC
  const paymentHistory = getPaymentHistoryFromCIC(customer);
  
  // Phạt điểm theo số lần trả chậm
  const latePayments = paymentHistory.filter(p => p.daysLate > 0);
  score -= latePayments.length * 10; // Mỗi lần -10 điểm
  
  // Phạt nặng cho nợ quá hạn
  const overduePayments = paymentHistory.filter(p => p.daysLate > 30);
  score -= overduePayments.length * 30; // Mỗi lần -30 điểm
  
  // Nợ xấu (quá hạn > 90 ngày)
  const badDebts = paymentHistory.filter(p => p.daysLate > 90);
  score -= badDebts.length * 100; // Mỗi lần -100 điểm
  
  return Math.max(0, score); // Không cho âm
}
```

**Ví dụ:**
```
Khách hàng A:
- 48 lần trả đúng hạn
- 2 lần trả chậm (5 ngày và 10 ngày)
- 0 lần quá hạn > 30 ngày
- Không có nợ xấu

→ Score = 350 - (2 × 10) = 330 điểm
```

#### 2. Mức độ sử dụng tín dụng (30% - 300 điểm)

**Các chỉ số:**
- Tổng dư nợ hiện tại
- Tỷ lệ sử dụng hạn mức (Credit Utilization Ratio)
- Số lượng khoản vay đang có

**Cách tính:**
```javascript
function calculateCreditUtilization(customer) {
  let score = 300; // Điểm tối đa
  
  // Lấy tất cả khoản vay đang hoạt động
  const activeLoans = getActiveLoans(customer);
  const creditCards = getCreditCards(customer);
  
  // Tính tỷ lệ sử dụng hạn mức thẻ tín dụng
  creditCards.forEach(card => {
    const utilization = card.usedAmount / card.creditLimit;
    
    if (utilization > 0.9) score -= 50;      // Dùng > 90%: -50 điểm
    else if (utilization > 0.7) score -= 30; // Dùng > 70%: -30 điểm
    else if (utilization > 0.5) score -= 15; // Dùng > 50%: -15 điểm
    else if (utilization < 0.3) score += 10; // Dùng < 30%: +10 điểm
  });
  
  // Số lượng khoản vay
  const loanCount = activeLoans.length;
  if (loanCount > 5) score -= 40;      // > 5 khoản: -40 điểm
  else if (loanCount > 3) score -= 20; // > 3 khoản: -20 điểm
  
  // Tỷ lệ nợ/thu nhập (DTI)
  const monthlyDebt = calculateMonthlyDebt(customer);
  const monthlyIncome = customer.monthly_income;
  const dti = monthlyDebt / monthlyIncome;
  
  if (dti > 0.6) score -= 60;      // DTI > 60%: -60 điểm
  else if (dti > 0.5) score -= 40; // DTI > 50%: -40 điểm
  else if (dti > 0.4) score -= 20; // DTI > 40%: -20 điểm
  else if (dti < 0.3) score += 20; // DTI < 30%: +20 điểm
  
  return Math.max(0, score);
}
```

**Ví dụ:**
```
Khách hàng B:
- Thẻ tín dụng: Dùng 15,000,000/50,000,000 = 30%
- 2 khoản vay đang hoạt động
- Thu nhập: 30,000,000/tháng
- Nợ hàng tháng: 10,000,000 → DTI = 33%

→ Score = 300 - 15 (thẻ 30%) + 20 (DTI tốt) = 305 điểm (tối đa 300)
→ Lấy 300 điểm
```

#### 3. Thời gian sử dụng tín dụng (15% - 150 điểm)

**Các chỉ số:**
- Thời gian là khách hàng ngân hàng
- Tuổi của tài khoản cũ nhất
- Tuổi trung bình các tài khoản

**Cách tính:**
```javascript
function calculateCreditHistory(customer) {
  let score = 0;
  
  // Thời gian là khách hàng (tính từ ngày đăng ký)
  const customerAge = calculateYears(customer.created_at, Date.now());
  
  if (customerAge >= 10) score += 100;      // ≥ 10 năm: 100 điểm
  else if (customerAge >= 5) score += 80;   // ≥ 5 năm: 80 điểm
  else if (customerAge >= 3) score += 60;   // ≥ 3 năm: 60 điểm
  else if (customerAge >= 1) score += 40;   // ≥ 1 năm: 40 điểm
  else score += 20;                         // < 1 năm: 20 điểm
  
  // Tuổi tài khoản cũ nhất
  const oldestAccount = getOldestAccount(customer);
  const accountAge = calculateYears(oldestAccount.opened_date, Date.now());
  
  if (accountAge >= 5) score += 50;   // ≥ 5 năm: 50 điểm
  else if (accountAge >= 3) score += 30;
  else if (accountAge >= 1) score += 10;
  
  return Math.min(150, score); // Tối đa 150
}
```

**Ví dụ:**
```
Khách hàng C:
- Là KH từ 2018 (7 năm)
- Tài khoản cũ nhất: Mở năm 2018 (7 năm)

→ Score = 80 (KH 7 năm) + 50 (TK 7 năm) = 130 điểm
```

#### 4. Các yêu cầu tín dụng mới (10% - 100 điểm)

**Các chỉ số:**
- Số lần đăng ký vay trong 6 tháng gần đây
- Số lần tra cứu tín dụng (hard inquiry)

**Cách tính:**
```javascript
function calculateNewCredit(customer) {
  let score = 100; // Điểm tối đa
  
  // Đếm số lần đăng ký vay trong 6 tháng
  const recentApplications = getLoanApplications(customer, last6Months);
  score -= recentApplications.length * 15; // Mỗi lần -15 điểm
  
  // Đếm số lần tra cứu tín dụng
  const hardInquiries = getCreditInquiries(customer, last6Months);
  score -= hardInquiries.length * 10; // Mỗi lần -10 điểm
  
  return Math.max(0, score);
}
```

**Ví dụ:**
```
Khách hàng D:
- Đăng ký vay 1 lần trong 6 tháng
- Tra cứu tín dụng 2 lần

→ Score = 100 - (1 × 15) - (2 × 10) = 65 điểm
```

#### 5. Cơ cấu tín dụng (10% - 100 điểm)

**Các chỉ số:**
- Đa dạng các loại tín dụng
- Kết hợp giữa vay có thế chấp và không thế chấp

**Cách tính:**
```javascript
function calculateCreditMix(customer) {
  let score = 50; // Điểm cơ bản
  
  const creditTypes = new Set();
  
  // Kiểm tra các loại tín dụng
  const loans = getAllLoans(customer);
  loans.forEach(loan => {
    creditTypes.add(loan.loan_type); // MORTGAGE, AUTO, CONSUMER...
  });
  
  const cards = getCreditCards(customer);
  if (cards.length > 0) creditTypes.add('CREDIT_CARD');
  
  const savings = getSavingsDeposits(customer);
  if (savings.length > 0) creditTypes.add('SAVINGS');
  
  // Điểm thưởng cho đa dạng
  const diversity = creditTypes.size;
  if (diversity >= 5) score += 50;        // ≥ 5 loại: +50
  else if (diversity >= 3) score += 30;   // ≥ 3 loại: +30
  else if (diversity >= 2) score += 15;   // ≥ 2 loại: +15
  
  return Math.min(100, score);
}
```

**Ví dụ:**
```
Khách hàng E:
- Vay mua nhà (mortgage)
- Vay tiêu dùng
- Thẻ tín dụng
- Sổ tiết kiệm

→ 4 loại tín dụng
→ Score = 50 + 30 = 80 điểm
```

---

### Tổng hợp công thức hoàn chỉnh

```javascript
function calculateCreditScore(customer) {
  const paymentHistory = calculatePaymentHistory(customer);      // 350 điểm
  const creditUtilization = calculateCreditUtilization(customer); // 300 điểm
  const creditHistory = calculateCreditHistory(customer);        // 150 điểm
  const newCredit = calculateNewCredit(customer);                // 100 điểm
  const creditMix = calculateCreditMix(customer);                // 100 điểm
  
  const totalScore = paymentHistory + creditUtilization + 
                     creditHistory + newCredit + creditMix;
  
  // Xác định xếp hạng
  let grade;
  if (totalScore >= 900) grade = 'AAA';
  else if (totalScore >= 800) grade = 'AA';
  else if (totalScore >= 700) grade = 'A';
  else if (totalScore >= 600) grade = 'BBB';
  else if (totalScore >= 500) grade = 'BB';
  else if (totalScore >= 400) grade = 'B';
  else if (totalScore >= 300) grade = 'CCC';
  else if (totalScore >= 200) grade = 'CC';
  else if (totalScore >= 100) grade = 'C';
  else grade = 'D';
  
  return {
    score: totalScore,
    grade: grade,
    breakdown: {
      paymentHistory,
      creditUtilization,
      creditHistory,
      newCredit,
      creditMix
    }
  };
}
```

---

## 💰 ẢNH HƯỞNG CỦA ĐIỂM TÍN DỤNG

### 1. Ảnh hưởng đến LÃI SUẤT VAY

#### Bảng lãi suất theo Credit Grade

**Vay mua nhà (Mortgage):**

| Grade | Credit Score | Lãi suất/năm | Chênh lệch |
|-------|--------------|--------------|------------|
| AAA | 900-1000 | 7.0% | Chuẩn |
| AA | 800-899 | 7.5% | +0.5% |
| A | 700-799 | 8.0% | +1.0% |
| BBB | 600-699 | 8.5% | +1.5% |
| BB | 500-599 | 9.5% | +2.5% |
| B | 400-499 | 11.0% | +4.0% |
| CCC-D | <400 | **Từ chối** | - |

**Ví dụ tính toán:**
```
Vay mua nhà: 2,000,000,000 VND, 20 năm (240 tháng)

Khách hàng AAA (lãi suất 7%):
- Trả hàng tháng: 15,504,000 VND
- Tổng lãi 20 năm: 1,720,960,000 VND

Khách hàng BB (lãi suất 9.5%):
- Trả hàng tháng: 18,654,000 VND
- Tổng lãi 20 năm: 2,476,960,000 VND

→ Chênh lệch: 756,000,000 VND (756 triệu!)
```

**Vay tiêu dùng:**

| Grade | Lãi suất/năm |
|-------|--------------|
| AAA | 12.0% |
| AA | 13.0% |
| A | 14.5% |
| BBB | 16.0% |
| BB | 18.0% |
| B | 22.0% |
| CCC-D | **Từ chối** |

**Vay mua xe:**

| Grade | Lãi suất/năm |
|-------|--------------|
| AAA | 8.5% |
| AA | 9.0% |
| A | 9.5% |
| BBB | 10.5% |
| BB | 12.0% |
| B | 15.0% |
| CCC-D | **Từ chối** |

---

### 2. Ảnh hưởng đến HẠN MỨC VAY

#### Công thức tính hạn mức

```
Hạn mức tối đa = Thu nhập × Hệ số × Điều chỉnh theo Credit Grade
```

**Hệ số theo loại vay:**
- Vay mua nhà: 60 tháng thu nhập
- Vay mua xe: 24 tháng thu nhập
- Vay tiêu dùng: 12 tháng thu nhập

**Điều chỉnh theo Credit Grade:**

| Grade | Hệ số điều chỉnh | Ví dụ (thu nhập 30 triệu) |
|-------|------------------|---------------------------|
| AAA | 100% | Vay tối đa: 1,800 triệu (mua nhà) |
| AA | 90% | Vay tối đa: 1,620 triệu |
| A | 80% | Vay tối đa: 1,440 triệu |
| BBB | 70% | Vay tối đa: 1,260 triệu |
| BB | 60% | Vay tối đa: 1,080 triệu |
| B | 50% | Vay tối đa: 900 triệu |
| CCC-D | **Không cho vay** | - |

**Ví dụ cụ thể:**
```
Khách hàng F:
- Thu nhập: 30,000,000 VND/tháng
- Credit Score: 750 (Grade A)
- Muốn vay mua nhà

Hạn mức = 30,000,000 × 60 × 80%
        = 1,440,000,000 VND (1.44 tỷ)

Nếu cải thiện điểm lên 900 (AAA):
Hạn mức = 30,000,000 × 60 × 100%
        = 1,800,000,000 VND (1.8 tỷ)

→ Chênh lệch: 360 triệu!
```

---

### 3. Ảnh hưởng đến YÊU CẦU THẾ CHẤP

**LTV (Loan-to-Value) tối đa theo Credit Grade:**

| Grade | LTV tối đa | Ý nghĩa |
|-------|------------|---------|
| AAA | 85% | Vay được 85% giá trị tài sản |
| AA | 80% | Vay được 80% |
| A | 75% | Vay được 75% |
| BBB | 70% | Vay được 70% |
| BB | 60% | Vay được 60% |
| B | 50% | Vay được 50% |
| CCC-D | **Không chấp nhận** | - |

**Ví dụ:**
```
Tài sản: Căn hộ trị giá 3,000,000,000 VND

Grade AAA: Vay tối đa 2,550 triệu (85%)
Grade A: Vay tối đa 2,250 triệu (75%)
Grade BB: Vay tối đa 1,800 triệu (60%)

→ Grade cao vay được nhiều hơn, cần vốn tự có ít hơn
```

---

### 4. Ảnh hưởng đến TỐC ĐỘ PHÊ DUYỆT

**Thời gian xét duyệt trung bình:**

| Grade | Thời gian | Quy trình |
|-------|-----------|-----------|
| AAA, AA | **2-3 ngày** | Tự động duyệt, ít kiểm tra |
| A, BBB | **5-7 ngày** | Xét duyệt thủ công, kiểm tra cơ bản |
| BB, B | **10-15 ngày** | Xét duyệt kỹ, yêu cầu bổ sung hồ sơ |
| CCC-D | **Từ chối ngay** | Không xét duyệt |

---

### 5. Ảnh hưởng đến PHÍ VAY

**Phí xử lý hồ sơ:**

| Grade | Phí xử lý | Phí giải ngân |
|-------|-----------|---------------|
| AAA | 0% | 0.1% |
| AA | 0.2% | 0.15% |
| A | 0.3% | 0.2% |
| BBB | 0.5% | 0.3% |
| BB | 1.0% | 0.5% |
| B | 1.5% | 0.8% |

**Ví dụ:**
```
Vay 2 tỷ VND

Grade AAA:
- Phí xử lý: 0
- Phí giải ngân: 2,000,000 VND
- Tổng phí: 2 triệu

Grade BB:
- Phí xử lý: 20,000,000 VND
- Phí giải ngân: 10,000,000 VND
- Tổng phí: 30 triệu

→ Chênh lệch: 28 triệu!
```

---

## 📈 CÁCH CẢI THIỆN ĐIỂM TÍN DỤNG

### Điểm cao (> 700) → Duy trì:

✅ **Tiếp tục:**
- Trả nợ đúng hạn
- Giữ tỷ lệ sử dụng tín dụng < 30%
- Không đăng ký vay quá nhiều
- Giữ các tài khoản cũ hoạt động

### Điểm trung bình (400-700) → Cải thiện:

📈 **Hành động:**
1. **Trả nợ đúng hạn:** Không được trễ dù 1 ngày
2. **Giảm dư nợ:** Trả trước một phần các khoản vay hiện có
3. **Giảm sử dụng thẻ tín dụng:** Dùng < 30% hạn mức
4. **Gửi tiết kiệm:** Chứng minh có tiền tiết kiệm
5. **Không vay thêm:** Trong 6-12 tháng tới

**Roadmap 12 tháng:**
```
Tháng 1-3: Trả nợ đúng hạn, giảm dư nợ thẻ
→ Tăng 30-50 điểm

Tháng 4-6: Tiếp tục trả đúng hạn, gửi tiết kiệm
→ Tăng thêm 30-40 điểm

Tháng 7-12: Duy trì thói quen tốt
→ Tăng thêm 50-70 điểm

Tổng cộng: +110 đến +160 điểm trong 1 năm
```

### Điểm thấp (< 400) → Khắc phục:

⚠️ **Ưu tiên:**
1. **Xử lý nợ xấu:** Liên hệ ngân hàng để xử lý nợ quá hạn
2. **Đóng nợ nhỏ trước:** Giảm số lượng khoản vay
3. **Đàm phán tái cấu trúc nợ:** Nếu không trả được
4. **Xây dựng lại tín dụng:** Bắt đầu với thẻ secured, vay nhỏ
5. **Kiên nhẫn:** Cần 2-3 năm để phục hồi

---

## 📊 BẢNG TỔNG HỢP: ĐIỂM CAO VS ĐIỂM THẤP

| Tiêu chí | Điểm cao (AAA-A) | Điểm thấp (B-D) |
|----------|------------------|-----------------|
| **Lãi suất vay nhà** | 7-8%/năm | 11%+ hoặc từ chối |
| **Lãi suất tiêu dùng** | 12-14.5% | 22%+ hoặc từ chối |
| **Hạn mức vay** | 80-100% tối đa | 50-60% hoặc từ chối |
| **LTV tối đa** | 75-85% | 50-60% |
| **Thời gian duyệt** | 2-7 ngày | 10-15 ngày hoặc từ chối |
| **Phí vay** | 0-0.5% | 1-2% |
| **Yêu cầu hồ sơ** | Đơn giản | Phức tạp, nhiều giấy tờ |
| **Yêu cầu thế chấp** | Linh hoạt | Bắt buộc, giá trị cao |

---

## 🔍 KIỂM TRA ĐIỂM TÍN DỤNG

### Trong hệ thống

```sql
-- Xem điểm tín dụng của khách hàng
SELECT 
    c.customer_code,
    c.full_name,
    cs.score,
    cs.grade,
    cs.calculated_at
FROM Customers c
LEFT JOIN CreditScores cs ON c.customer_id = cs.customer_id
WHERE c.customer_code = 'CUS001';
```

### Khi nào được tính lại?

- ⏰ **Tự động:** Mỗi 3 tháng
- 🔄 **Khi có sự kiện:** 
  - Đăng ký vay mới
  - Trả hết một khoản nợ
  - Có nợ quá hạn
  - Tạo tài sản thế chấp mới

---

## ⚖️ KẾT LUẬN

### Tầm quan trọng của Credit Score:

1. **Tiết kiệm tiền:** Có thể tiết kiệm hàng trăm triệu đồng lãi
2. **Tăng khả năng vay:** Vay được nhiều hơn khi cần
3. **Thủ tục đơn giản:** Duyệt nhanh, ít giấy tờ
4. **Linh hoạt hơn:** Nhiều lựa chọn sản phẩm tài chính

### Thông điệp chính:

> 💡 **"Điểm tín dụng là tài sản vô hình của bạn. Xây dựng và bảo vệ nó như bạn bảo vệ tài sản hữu hình."**

- ✅ Trả nợ đúng hạn là yếu tố quan trọng nhất (35%)
- ✅ Giữ mức sử dụng tín dụng thấp (30%)
- ✅ Xây dựng lịch sử tín dụng lâu dài (15%)
- ✅ Không vay quá nhiều cùng lúc (10%)
- ✅ Đa dạng hóa các loại tín dụng (10%)

---

**Cập nhật:** 27/10/2025  
**Phiên bản:** 1.0

