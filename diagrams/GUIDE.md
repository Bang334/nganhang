# 📊 HƯỚNG DẪN SỬ DỤNG CÁC FILE PLANTUML

## 🎯 CHIẾN LƯỢC: ĐẦY ĐỦ + CHIA NHỎ

- **Structural & Sequence:** Giữ đầy đủ hoặc có 2 phiên bản
- **Activity:** Chia nhỏ từng mảng để dễ hiểu

---

## 📁 DANH SÁCH FILE (20 files)

### 1️⃣ STRUCTURAL DIAGRAMS (5 files)

| File | Mô tả | Dòng | Dùng khi nào |
|------|-------|------|--------------|
| **usecase.puml** | Use Case tổng quan | ~50 | Giới thiệu chức năng |
| **class.puml** | 7 classes chính | ~80 | Hiểu core structure |
| **class-full.puml** | 19 classes đầy đủ | ~250 | Báo cáo chi tiết ⭐ |
| **er.puml** | 7 tables chính | ~70 | Hiểu DB cơ bản |
| **er-full.puml** | 19 tables đầy đủ | ~280 | Document DB ⭐ |

### 2️⃣ SEQUENCE DIAGRAMS (3 files)

| File | Nghiệp vụ | Dòng | Độ phức tạp |
|------|-----------|------|-------------|
| **sequence-chuyen-khoan.puml** | Chuyển khoản | ~30 | ⭐ Đơn giản |
| **sequence-vay-von.puml** | Vay vốn đầy đủ | ~45 | ⭐⭐ Trung bình |
| **sequence-tra-no.puml** | Trả nợ auto | ~30 | ⭐ Đơn giản |

### 3️⃣ ACTIVITY DIAGRAMS (11 files - chia nhỏ)

#### 📦 Nhóm A: Quy trình vay vốn (4 files)

| Thứ tự | File | Mô tả | Dòng |
|--------|------|-------|------|
| 1 | **activity/01-dang-ky-vay.puml** | Đăng ký khoản vay | ~35 |
| 2 | **activity/02-tham-dinh-vay.puml** | Thẩm định (DTI, CIC, LTV) | ~45 |
| 3 | **activity/03-phe-duyet-vay.puml** | Quyết định phê duyệt | ~40 |
| 4 | **activity/04-giai-ngan.puml** | Giải ngân và tạo lịch | ~40 |

#### 📦 Nhóm B: Đáo hạn tiết kiệm (3 files)

| LC | File | Mô tả | Dòng |
|----|------|-------|------|
| 1 | **activity/05-dao-han-rut-tien.puml** | Rút tiền về TK | ~30 |
| 2 | **activity/06-dao-han-tai-tuc-goc.puml** | Tái tục gốc, nhận lãi | ~35 |
| 3 | **activity/07-dao-han-tai-tuc-full.puml** | Tái tục gốc + lãi | ~35 |

#### 📦 Nhóm C: Trả nợ (2 files)

| File | Mô tả | Dòng |
|------|-------|------|
| **activity/08-tra-no-tu-dong.puml** | Auto-debit hàng tháng | ~35 |
| **activity/09-xu-ly-no-qua-han.puml** | Xử lý 4 mức nợ quá hạn | ~40 |

#### 📦 Nhóm D: Credit Scoring (2 files)

| File | Mô tả | Dòng |
|------|-------|------|
| **activity/10-tinh-credit-score.puml** | Công thức tính 5 yếu tố | ~50 |
| **activity/11-anh-huong-credit-score.puml** | Ảnh hưởng đến lãi suất | ~45 |

### 4️⃣ STATE DIAGRAMS (2 files)

| File | Mô tả | Dòng |
|------|-------|------|
| **state-loan.puml** | PENDING → ACTIVE → PAID_OFF | ~20 |
| **state-credit-score.puml** | AAA ↔ AA ↔ A ↔ ... | ~45 |

### 5️⃣ ARCHITECTURE (2 files)

| File | Mô tả | Dòng |
|------|-------|------|
| **component.puml** | Layers & Services | ~40 |
| **deployment.puml** | Servers & Infrastructure | ~45 |

---

## 💡 TẠI SAO CHIA NHỎ ACTIVITY DIAGRAMS?

### Trước (1 file lớn):
```
activity-xu-ly-vay-von.puml (300+ dòng)
├── Đăng ký
├── Thẩm định  
├── Phê duyệt
└── Giải ngân
```
❌ Quá dài → Khó đọc  
❌ Render chậm  
❌ Lỗi "Header too large"  
❌ Khó maintain  

### Sau (4 files nhỏ):
```
activity/01-dang-ky-vay.puml (~35 dòng)
activity/02-tham-dinh-vay.puml (~45 dòng)
activity/03-phe-duyet-vay.puml (~40 dòng)
activity/04-giai-ngan.puml (~40 dòng)
```
✅ Dễ đọc - Mỗi file 1 mảng  
✅ Render nhanh  
✅ Không lỗi  
✅ Linh hoạt - Chọn file cần thiết  
✅ Dễ sửa - Sửa 1 phần không ảnh hưởng khác  

---

## 🚀 CÁCH SỬ DỤNG

### Online (Khuyến nghị)
1. Vào: https://www.plantuml.com/plantuml/uml/
2. Copy nội dung file `.puml`
3. Paste vào editor
4. Xem ngay!
5. Download PNG/SVG

### VS Code
1. Cài extension: "PlantUML"
2. Mở file `.puml`
3. `Alt+D` để preview
4. Export: `Ctrl+Shift+P` → "PlantUML: Export"

---

## ✅ ƯU ĐIỂM PHIÊN BẢN MỚI

| Tiêu chí | Trước | Sau |
|----------|-------|-----|
| **Số dòng trung bình** | 200-400 | 30-50 |
| **Syntax errors** | Có | ✅ Không |
| **Render speed** | Chậm | ⚡ Nhanh |
| **Dễ đọc** | Phức tạp | ✅ Đơn giản |
| **Copy/Paste** | Lỗi | ✅ Hoạt động |

---

## 📝 FILE NÀO DÙNG KHI NÀO?

### Báo cáo, thuyết trình:
- ✅ `usecase.puml` - Tổng quan chức năng
- ✅ `class.puml` - Cấu trúc dữ liệu
- ✅ `sequence-vay-von.puml` - Nghiệp vụ chính
- ✅ `state-loan.puml` - Trạng thái

### Thiết kế kỹ thuật:
- ✅ `er.puml` - Database schema
- ✅ `component.puml` - Kiến trúc
- ✅ `deployment.puml` - Infrastructure

### Giải thích nghiệp vụ:
- ✅ `activity-dao-han.puml` - Đáo hạn
- ✅ `activity-xu-ly-vay.puml` - Quy trình vay
- ✅ `credit-score-flow.puml` - Điểm tín dụng

---

## ⚠️ CÁC FILE CŨ (Có thể xóa)

Các file trong thư mục `01-`, `02-`, `sequence/`, `activity/` là phiên bản cũ (dài, phức tạp).

**Khuyến nghị:** Dùng các file mới ở thư mục root `diagrams/`

---

## 🎯 QUICK REFERENCE

```bash
# Use Case - Chức năng tổng quát
usecase.puml

# Class/ER - Cấu trúc dữ liệu
class.puml
er.puml

# Sequence - Luồng giao dịch
sequence-chuyen-khoan.puml
sequence-vay-von.puml
sequence-tra-no.puml

# Activity - Quy trình nghiệp vụ
activity-dao-han.puml
activity-xu-ly-vay.puml
credit-score-flow.puml

# State - Trạng thái
state-loan.puml
state-credit-score.puml

# Architecture
component.puml
deployment.puml
```

---

**Tất cả file đã test và hoạt động tốt trên PlantUML Online! ✅**

