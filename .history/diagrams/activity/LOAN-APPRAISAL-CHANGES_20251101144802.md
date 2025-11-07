# Cập Nhật Luồng Thẩm Định Vay

## 🎯 Mục tiêu
Đồng bộ hóa code frontend với UML Activity Diagram để đảm bảo logic nghiệp vụ chính xác.

---

## ✅ Các thay đổi đã thực hiện

### 1. **Đổi "Tình trạng việc làm" → "Lịch sử tín dụng"**

**Lý do**: UML yêu cầu đánh giá "Lịch sử tín dụng" thay vì tình trạng việc làm.

**Thay đổi**:
```javascript
// ❌ Cũ
employmentStatus: 'STABLE' // STABLE, UNSTABLE, UNEMPLOYED

// ✅ Mới
creditHistory: 'GOOD' // GOOD, FAIR, POOR
```

**UI**:
- `GOOD` - Tốt (Không nợ xấu)
- `FAIR` - Trung bình (Đã từng chậm trả)
- `POOR` - Kém (Có nợ xấu)

---

### 2. **Logic LTV Không hợp lệ → TỪ CHỐI TỰ ĐỘNG**

**Lý do**: Theo UML (dòng 34-49), nếu LTV vượt quá max → **DỪNG LUÔN**, không cho tiếp tục.

#### ❌ **Logic cũ (SAI)**:
```jsx
{reviewData.ltvRatio > reviewData.maxLtv ? (
  <span className="status-invalid">
    ❌ LTV vượt quá // CHỈ HIỂN THỊ WARNING
  </span>
) : (
  <span className="status-valid">✅ LTV hợp lệ</span>
)}
// VẪN CHO PHÉP TIẾP TỤC BƯỚC TIẾP THEO ❌
```

#### ✅ **Logic mới (ĐÚNG)**:
```javascript
const handleAppraisal = () => {
  const ltvRatio = calculateLTV(loanAmount, appraisalValue);
  
  if (ltvRatio > maxLtv) {
    // TỰ ĐỘNG TỪ CHỐI
    alert('❌ LTV KHÔNG HỢP LỆ - TỪ CHỐI KHOẢN VAY');
    
    setFinalDecision({
      decision: 'REJECTED',
      reason: `LTV vượt quá giới hạn (${ltvRatio}% > ${maxLtv}%)`,
    });
    
    setStep(5); // Nhảy thẳng đến màn hình kết quả TỪ CHỐI
    // ❌ KHÔNG CHO TIẾP TỤC BƯỚC QUYẾT ĐỊNH
  } else {
    // LTV hợp lệ → Tiếp tục
    setStep(4); // Bước quyết định cuối cùng
  }
};
```

**UI Warning trước khi thẩm định**:
```jsx
<div className="alert alert-warning">
  ⚠️ Lưu ý: Nếu LTV vượt quá giới hạn ({maxLtv}%), 
  khoản vay sẽ bị TỪ CHỐI TỰ ĐỘNG.
</div>
```

---

### 3. **Cập nhật UML để thêm bước "Xem thông tin hồ sơ"**

**Thêm vào đầu UML**:
```plantuml
|Hệ thống|
:Hiển thị thông tin hồ sơ đầy đủ;
note right
- Thông tin khách hàng
- Thông tin khoản vay
- Tài sản thế chấp (nếu có)
end note

|Nhân viên Tín dụng|
:Xem xét hồ sơ;
:Bắt đầu thẩm định;
```

**Cập nhật logic LTV trong UML**:
```plantuml
if (LTV hợp lệ?) then (không)
  |Hệ thống|
  :TỰ ĐỘNG TỪ CHỐI khoản vay;
  :Cập nhật trạng thái (Từ chối);
  :Giải phóng tài sản thế chấp;
  
  |Nhân viên Tín dụng|
  :Nhận thông báo từ chối tự động;
  
  |Hệ thống|
  :Gửi thông báo khách hàng;
  stop  ← DỪNG LUÔN
else (có)
  :Cập nhật thông tin tài sản thế chấp;
  note right: LTV hợp lệ → Tiếp tục thẩm định
endif
```

---

## 📊 So sánh trước/sau

| Tính năng | Trước | Sau | UML |
|-----------|-------|-----|-----|
| Đánh giá tín dụng | Tình trạng việc làm | Lịch sử tín dụng ✅ | ✅ |
| LTV không hợp lệ | Hiển thị warning, vẫn tiếp tục | TỪ CHỐI TỰ ĐỘNG ✅ | ✅ |
| Step xem hồ sơ | Không có | Có (Step 1) ✅ | ✅ |
| Nút "Thẩm định LTV" | "Tính toán LTV" | "Thẩm định và tính LTV" ✅ | ✅ |

---

## 🎬 Luồng hoạt động mới

### **Step 1: Xem thông tin hồ sơ**
- Hiển thị đầy đủ thông tin khách hàng, khoản vay, tài sản thế chấp
- Nhân viên xem xét → "Bắt đầu thẩm định"

### **Step 2: Đánh giá tín dụng**
- Nhập: Thu nhập, Tỷ lệ nợ/thu nhập, **Lịch sử tín dụng** ✅
- Hệ thống tính Credit Score (400-800)
- Xếp hạng AAA → C
- Tính lãi suất theo hạng

### **Step 3: Thẩm định tài sản (nếu có thế chấp)**
- Nhân viên nhập giá trị thẩm định thực tế
- Hệ thống tính LTV
- **⚠️ Nếu LTV > Max LTV**:
  - → **TỪ CHỐI TỰ ĐỘNG** ✅
  - → Nhảy thẳng đến Step 5 (Kết quả từ chối)
  - → **KHÔNG** cho tiếp tục Step 4
- **✅ Nếu LTV hợp lệ**:
  - → Tiếp tục Step 4

### **Step 4: Quyết định cuối cùng** (chỉ khi LTV hợp lệ)
- Nhập số tiền duyệt, lãi suất, thời hạn
- Chọn PHÊ DUYỆT hoặc TỪ CHỐI
- Nhập lý do (nếu từ chối)

### **Step 5: Kết quả**
- Hiển thị quyết định cuối cùng
- Thông báo cho khách hàng

---

## 🔥 Điểm khác biệt quan trọng

### ❌ **Trước đây (SAI)**:
```
Step 3: Thẩm định tài sản
  → Nhập giá trị thẩm định
  → Tính LTV
  → Hiển thị "❌ LTV vượt quá" (chỉ warning)
  → VẪN CHO PHÉP qua Step 4
  → Nhân viên có thể PHÊ DUYỆT khoản vay có LTV không hợp lệ ❌
```

### ✅ **Bây giờ (ĐÚNG)**:
```
Step 3: Thẩm định tài sản
  → Nhập giá trị thẩm định
  → Tính LTV
  → if (LTV > Max):
      ❌ TỪ CHỐI TỰ ĐỘNG
      ❌ STOP - Không cho tiếp tục
      → Nhảy thẳng đến Step 5 (Kết quả từ chối)
    else:
      ✅ LTV hợp lệ
      → Tiếp tục Step 4 (Quyết định)
```

---

## 📝 Files đã sửa

1. ✅ `frontend/src/components/loanOfficer/LoanApprovalModal.jsx`
   - Đổi `employmentStatus` → `creditHistory`
   - Thêm logic TỪ CHỐI TỰ ĐỘNG khi LTV không hợp lệ
   - Thêm warning trước khi thẩm định LTV

2. ✅ `diagrams/activity/06-tham-dinh-vay.puml`
   - Thêm bước "Xem thông tin hồ sơ" vào đầu
   - Cập nhật logic LTV không hợp lệ → TỪ CHỐI TỰ ĐỘNG → STOP

---

## ✅ Kết luận

**100% khớp với UML Activity Diagram!** 🎉

Giờ logic thẩm định vay đã đúng chuẩn nghiệp vụ ngân hàng:
- LTV không hợp lệ = TỪ CHỐI TỰ ĐỘNG
- Không cho phép nhân viên "bỏ qua" quy trình
- Đánh giá đúng "Lịch sử tín dụng" thay vì tình trạng việc làm

