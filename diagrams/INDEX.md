# 📊 INDEX - TẤT CẢ FILE UML

> **Hệ thống Quản lý Ngân hàng - PlantUML Diagrams**

---

## ✅ CẤU TRÚC FILE (Version 2.0)

### 📁 STRUCTURAL DIAGRAMS (Sơ đồ cấu trúc)

| File | Mô tả | Dòng | Mức độ |
|------|-------|------|--------|
| **usecase.puml** | Use Case - Rút gọn | ~50 | ⭐ Dễ |
| **class.puml** | Class - Core classes | ~80 | ⭐⭐ TB |
| **class-full.puml** | Class - Đầy đủ 19 classes | ~250 | ⭐⭐⭐ Đầy đủ |
| **er.puml** | ER - Core tables | ~70 | ⭐⭐ TB |
| **er-full.puml** | ER - Đầy đủ 19 tables | ~280 | ⭐⭐⭐ Đầy đủ |

### 📁 SEQUENCE DIAGRAMS (Sơ đồ tuần tự)

| File | Nghiệp vụ | Dòng | Độ phức tạp |
|------|-----------|------|-------------|
| **sequence-chuyen-khoan.puml** | Chuyển khoản | ~30 | ⭐ Đơn giản |
| **sequence-vay-von.puml** | Vay vốn (3 giai đoạn) | ~45 | ⭐⭐ TB |
| **sequence-tra-no.puml** | Trả nợ tự động | ~30 | ⭐ Đơn giản |

### 📁 ACTIVITY DIAGRAMS (Chia nhỏ từng mảng)

#### Nhóm: Vay vốn (4 phần)
| File | Mô tả | Dòng | Giai đoạn |
|------|-------|------|-----------|
| **activity/01-dang-ky-vay.puml** | Đăng ký khoản vay | ~35 | Bước 1 |
| **activity/02-tham-dinh-vay.puml** | Thẩm định hồ sơ | ~45 | Bước 2 |
| **activity/03-phe-duyet-vay.puml** | Phê duyệt | ~40 | Bước 3 |
| **activity/04-giai-ngan.puml** | Giải ngân | ~40 | Bước 4 |

#### Nhóm: Đáo hạn tiết kiệm (3 lựa chọn)
| File | Mô tả | Dòng | Lựa chọn |
|------|-------|------|----------|
| **activity/05-dao-han-rut-tien.puml** | Rút tiền về TK | ~30 | LC 1 |
| **activity/06-dao-han-tai-tuc-goc.puml** | Tái tục chỉ gốc | ~35 | LC 2 |
| **activity/07-dao-han-tai-tuc-full.puml** | Tái tục gốc + lãi | ~35 | LC 3 |

#### Nhóm: Trả nợ & Xử lý (2 phần)
| File | Mô tả | Dòng | Nội dung |
|------|-------|------|----------|
| **activity/08-tra-no-tu-dong.puml** | Auto-debit | ~35 | Trả tự động |
| **activity/09-xu-ly-no-qua-han.puml** | Xử lý nợ quá hạn | ~40 | 4 mức độ |

#### Nhóm: Credit Scoring (2 phần)
| File | Mô tả | Dòng | Nội dung |
|------|-------|------|----------|
| **activity/10-tinh-credit-score.puml** | Tính điểm (5 yếu tố) | ~50 | Công thức |
| **activity/11-anh-huong-credit-score.puml** | Ảnh hưởng điểm | ~45 | Lãi suất, hạn mức |

### 📁 STATE DIAGRAMS (Sơ đồ trạng thái)

| File | Mô tả | Dòng | Entities |
|------|-------|------|----------|
| **state-loan.puml** | Vòng đời khoản vay | ~20 | Loan |
| **state-credit-score.puml** | Chuyển đổi grades | ~45 | CreditScore |

### 📁 ARCHITECTURE (Kiến trúc)

| File | Mô tả | Dòng | Mục đích |
|------|-------|------|----------|
| **component.puml** | Components & Services | ~40 | Technical |
| **deployment.puml** | Production setup | ~45 | DevOps |

---

## 🎯 CHIẾN LƯỢC SỬ DỤNG

### 📝 Cho báo cáo đồ án:

**Phần 1: Tổng quan**
- ✅ `usecase.puml` - Chức năng hệ thống

**Phần 2: Phân tích**
- ✅ `class.puml` hoặc `class-full.puml` - Cấu trúc dữ liệu
- ✅ `er.puml` hoặc `er-full.puml` - Database

**Phần 3: Thiết kế**
- ✅ `sequence-vay-von.puml` - Nghiệp vụ chính
- ✅ Activity diagrams (chọn theo nội dung)
  - Vay vốn: File 01 → 04
  - Đáo hạn: File 05 → 07
  - Credit: File 10, 11

**Phần 4: Triển khai**
- ✅ `component.puml` - Kiến trúc
- ✅ `deployment.puml` - Deployment

### 💡 Ưu điểm của Activity chia nhỏ:

1. **Dễ hiểu hơn** - Mỗi file 1 mảng nghiệp vụ
2. **Render nhanh** - File ngắn, không quá tải
3. **Linh hoạt** - Chọn file cần thiết thôi
4. **Dễ sửa** - Sửa 1 phần không ảnh hưởng phần khác
5. **Tái sử dụng** - Có thể dùng riêng lẻ

---

## 📖 HƯỚNG DẪN ĐỌC THEO THỨ TỰ

### Người mới bắt đầu:
```
1. usecase.puml          (Hiểu chức năng)
2. class.puml            (Hiểu cấu trúc)
3. sequence-chuyen-khoan.puml  (Flow đơn giản)
4. activity/05-dao-han-rut-tien.puml  (Activity đơn giản)
5. state-loan.puml       (State đơn giản)
```

### Hiểu nghiệp vụ vay vốn:
```
1. activity/01-dang-ky-vay.puml
2. activity/02-tham-dinh-vay.puml
3. activity/03-phe-duyet-vay.puml
4. activity/04-giai-ngan.puml
5. sequence-vay-von.puml (tổng hợp)
```

### Hiểu Credit Scoring:
```
1. activity/10-tinh-credit-score.puml
2. activity/11-anh-huong-credit-score.puml
3. state-credit-score.puml
```

### Hiểu đáo hạn tiết kiệm:
```
1. activity/05-dao-han-rut-tien.puml
2. activity/06-dao-han-tai-tuc-goc.puml
3. activity/07-dao-han-tai-tuc-full.puml
```

---

## 📊 TỔNG KẾT

**Tổng số file:** 20 files

- **Structural:** 5 files (2 rút gọn + 2 đầy đủ + usecase)
- **Sequence:** 3 files
- **Activity:** 11 files (chia nhỏ!)
- **State:** 2 files
- **Architecture:** 2 files

**Đặc điểm:**
- ✅ File đầy đủ: Có đủ fields theo schema
- ✅ File rút gọn: Tập trung vào core
- ✅ Activity nhỏ: Mỗi file 1 mảng (30-50 dòng)
- ✅ Không lỗi syntax
- ✅ Render nhanh

---

## 🚀 QUICK LINKS

**Xem online:** https://www.plantuml.com/plantuml/uml/

**File nhỏ nhất (Test):** `state-loan.puml` (20 dòng)

**File đầy đủ nhất:** `er-full.puml` (280 dòng - đủ 19 tables)

---

**Version:** 2.0 - Optimized & Modular  
**Updated:** 27/10/2025
