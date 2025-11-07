# HƯỚNG DẪN SỬ DỤNG CÁC SƠ ĐỒ UML CHO ĐỒ ÁN

> Tài liệu hướng dẫn làm đồ án Phân tích & Thiết kế Hệ thống với UML

---

## 📋 YÊU CẦU ĐỒ ÁN THEO CHUẨN

Theo yêu cầu của môn Phân tích & Thiết kế Hệ thống, đồ án cần có:

### 1. PHÂN TÍCH YÊU CẦU

#### ✅ Use Case Diagram
- **File:** `usecase.puml`
- **Kèm theo:** `usecase-specification.md` (Kịch bản chi tiết)
- **Mục đích:** Xác định chức năng hệ thống và người dùng

**Nội dung kịch bản Use Case phải có:**
- Tên use case
- Actor chính và actor phụ
- Điều kiện tiên quyết (Pre-condition)
- Điều kiện kết thúc (Post-condition)
- Luồng sự kiện chính (Main flow)
- Luồng thay thế (Alternative flows)
- Luồng ngoại lệ (Exception flows)
- Quy tắc nghiệp vụ (Business rules)
- Yêu cầu phi chức năng (Non-functional requirements)

**Ví dụ:** Xem file `usecase-specification.md` - có 21 use case chi tiết

---

### 2. SƠ ĐỒ QUY TRÌNH NGHIỆP VỤ

#### ✅ Sequence Diagram (Sơ đồ tuần tự)

**Mục đích:** Mô tả tương tác giữa các đối tượng theo thứ tự thời gian

**Files có sẵn:**
| File | Nghiệp vụ | Độ phức tạp |
|------|-----------|-------------|
| `sequence-mo-tai-khoan.puml` | Mở tài khoản | ⭐⭐ Trung bình |
| `sequence-chuyen-khoan.puml` | Chuyển khoản | ⭐ Đơn giản |
| `sequence-rut-tien.puml` | Rút tiền | ⭐⭐ Trung bình |
| `sequence-mo-tiet-kiem.puml` | Mở sổ tiết kiệm | ⭐⭐⭐ Phức tạp |
| `sequence-vay-von.puml` | Vay vốn đầy đủ | ⭐⭐⭐ Phức tạp |
| `sequence-tra-no.puml` | Trả nợ tự động | ⭐⭐ Trung bình |

**Khuyến nghị cho đồ án:**
- Chọn **3-5 sequence diagrams** để trình bày
- Ưu tiên: `sequence-vay-von.puml` (nghiệp vụ phức tạp nhất)
- Kèm theo: `sequence-chuyen-khoan.puml` (cơ bản)
- Bổ sung: `sequence-mo-tai-khoan.puml` hoặc `sequence-mo-tiet-kiem.puml`

**Đặc điểm của Sequence Diagram:**
- Trục dọc: Thời gian (từ trên xuống)
- Trục ngang: Các đối tượng/actor
- Mũi tên: Message giữa các đối tượng
- Alt/Opt/Loop: Điều kiện và vòng lặp

#### ✅ Communication Diagram (Sơ đồ giao tiếp) - THAY THẾ Sequence

**File:** `communication-chuyen-khoan.puml`

**Mục đích:** Mô tả tương tác giữa các đối tượng tập trung vào cấu trúc (không nhấn mạnh thời gian)

**So sánh với Sequence Diagram:**
| Tiêu chí | Sequence | Communication |
|----------|----------|---------------|
| Trọng tâm | Thứ tự thời gian | Cấu trúc liên kết |
| Đánh số | Tự động | Thủ công (1, 2, 3...) |
| Dễ đọc | ✅ Rất dễ | ⚠️ Cần chú ý số thứ tự |
| Dùng khi nào | Luồng tuyến tính | Quan hệ phức tạp |

**Khuyến nghị:** Dùng **1 Communication Diagram** để thể hiện sự đa dạng

#### ✅ Activity Diagram (Sơ đồ hoạt động)

**Mục đích:** Mô tả luồng công việc và quy trình nghiệp vụ

**Files có sẵn (11 files):**

**Nhóm 1: Quy trình vay vốn (4 files - QUAN TRỌNG)**
| File | Mô tả | Dùng cho |
|------|-------|----------|
| `activity/01-dang-ky-vay.puml` | Đăng ký khoản vay | Bước 1 |
| `activity/02-tham-dinh-vay.puml` | Thẩm định (DTI, LTV, CIC) | Bước 2 |
| `activity/03-phe-duyet-vay.puml` | Phê duyệt | Bước 3 |
| `activity/04-giai-ngan.puml` | Giải ngân | Bước 4 |

**Nhóm 2: Đáo hạn tiết kiệm (3 files)**
| File | Mô tả |
|------|-------|
| `activity/05-dao-han-rut-tien.puml` | Rút tiền về TK |
| `activity/06-dao-han-tai-tuc-goc.puml` | Tái tục gốc |
| `activity/07-dao-han-tai-tuc-full.puml` | Tái tục gốc + lãi |

**Nhóm 3: Trả nợ & Xử lý (2 files)**
| File | Mô tả |
|------|-------|
| `activity/08-tra-no-tu-dong.puml` | Auto-debit hàng tháng |
| `activity/09-xu-ly-no-qua-han.puml` | Xử lý 4 mức nợ quá hạn |

**Nhóm 4: Credit Scoring (2 files)**
| File | Mô tả |
|------|-------|
| `activity/10-tinh-credit-score.puml` | Công thức tính điểm |
| `activity/11-anh-huong-credit-score.puml` | Ảnh hưởng đến lãi suất |

**Khuyến nghị cho đồ án:**
- **BẮT BUỘC:** 4 files quy trình vay vốn (01-04)
- **NÊN CÓ:** 3 files đáo hạn (05-07) hoặc 2 files credit (10-11)
- **Tổng:** 4-6 activity diagrams

**Đặc điểm của Activity Diagram:**
- Start node (●) và End node (◉)
- Decision node (◇) - điểm rẽ nhánh
- Swimlanes - phân vai trò (Customer, System, Teller...)
- Fork/Join - xử lý song song

---

### 3. SƠ ĐỒ TRẠNG THÁI (NẾU CẦN)

#### ✅ State Diagram

**Mục đích:** Mô tả các trạng thái và sự chuyển đổi của đối tượng

**Files có sẵn:**
| File | Mô tả | Số trạng thái |
|------|-------|---------------|
| `state-loan.puml` | Vòng đời khoản vay | 7 trạng thái |
| `state-credit-score.puml` | Chuyển đổi grades | 8 grades |

**Khuyến nghị:**
- **BẮT BUỘC NẾU:** Hệ thống có đối tượng có nhiều trạng thái phức tạp
- Trong hệ thống ngân hàng: Khoản vay (Loan) là đối tượng phù hợp nhất
- Trình bày **1-2 state diagrams**

**Các trạng thái của Loan:**
```
PENDING → UNDER_REVIEW → APPROVED → ACTIVE → PAID_OFF
                       ↓
                   REJECTED
                       ↓
                   DEFAULTED (nếu nợ quá hạn lâu)
```

---

### 4. THIẾT KẾ HỆ THỐNG

#### ✅ Component Diagram (Sơ đồ thành phần)

**File:** `component.puml`

**Mục đích:** Mô tả kiến trúc hệ thống theo các thành phần và dịch vụ

**Nội dung:**
- Presentation Layer: Web App, Mobile App
- API Gateway: Authentication, Rate Limiter
- Business Logic: Account, Loan, Transaction, Savings Services
- Data Access: Repositories
- Database: MySQL + Redis
- External: NAPAS, CIC, SMS, Email

**Khuyến nghị:** **BẮT BUỘC** - Thể hiện kiến trúc kỹ thuật

#### ✅ Package Diagram (Sơ đồ gói) - MỚI THÊM

**File:** `package.puml`

**Mục đích:** Mô tả tổ chức code thành các package/module

**Nội dung:**
- Presentation Layer: web.frontend, web.components
- API Layer: api.controllers, api.middleware
- Business Logic Layer: services.account, services.loan, services.transaction...
- Domain Layer: models.customer, models.account, models.loan...
- Data Access Layer: repositories, database
- Infrastructure: utils, jobs, config

**Khuyến nghị:** **NÊN CÓ** - Thể hiện cấu trúc dự án chi tiết

#### ✅ Deployment Diagram (Sơ đồ triển khai)

**File:** `deployment.puml`

**Mục đích:** Mô tả cấu hình phần cứng và triển khai thực tế

**Nội dung:**
- Load Balancer: Nginx
- Web Servers: 2x Node.js
- Database: Master-Replica MySQL
- Cache: Redis Cluster
- Monitoring: Prometheus, Grafana

**Khuyến nghị:** **NÊN CÓ** - Thể hiện khả năng triển khai thực tế

#### ✅ Class Diagram (Sơ đồ lớp) - VẼ BƯỚC CUỐI CÙNG

**Files có sẵn:**
| File | Mô tả | Số lượng class |
|------|-------|----------------|
| `class.puml` | Core classes | 7 classes |
| `class-full.puml` | Đầy đủ theo schema | 19 classes |

**Mục đích:** Mô tả cấu trúc dữ liệu và quan hệ giữa các class

**Khuyến nghị:**
- **DÙNG:** `class-full.puml` - Đầy đủ nhất
- **VẼ CUỐI CÙNG** - Sau khi đã phân tích xong use case, sequence, activity

**Nội dung Class Diagram đầy đủ:**
- 19 classes với tất cả attributes và methods
- Relationships: Association, Aggregation, Composition
- Cardinality: 1..1, 1..*, 0..1, 0..*
- Notes giải thích công thức tính toán

---

### 5. THIẾT KẾ CƠ SỞ DỮ LIỆU

#### ✅ ER Diagram (Entity-Relationship)

**Files có sẵn:**
| File | Mô tả | Số bảng |
|------|-------|---------|
| `er.puml` | Core tables | 7 bảng |
| `er-full.puml` | Đầy đủ theo schema | 19 bảng |

**Mục đích:** Thiết kế cơ sở dữ liệu chi tiết

**Khuyến nghị:**
- **DÙNG:** `er-full.puml` - Đầy đủ tất cả bảng
- **BẮT BUỘC** - Phải có trong đồ án

**Nội dung ER Diagram:**
- 19 bảng với tất cả fields
- Primary Key, Foreign Key, Unique Key
- Relationships với cardinality
- Indexes
- Constraints (CHECK, DEFAULT)

**So sánh Class vs ER:**
| Tiêu chí | Class Diagram | ER Diagram |
|----------|---------------|------------|
| Quan điểm | OOP | Database |
| Mục đích | Code structure | DB schema |
| Nội dung | Class, methods | Table, columns |
| Dùng cho | Developer | DBA |

---

## 📊 THỨ TỰ VẼ SƠ ĐỒ THEO QUY TRÌNH

### GIAI ĐOẠN 1: PHÂN TÍCH YÊU CẦU

```
1. Use Case Diagram (usecase.puml)
   ↓
2. Use Case Specification (usecase-specification.md)
   - Viết kịch bản chi tiết cho từng use case
   ↓
3. Activity Diagram (activity/01-11)
   - Vẽ quy trình nghiệp vụ chi tiết
```

**Thời gian:** 1-2 tuần

---

### GIAI ĐOẠN 2: THIẾT KẾ TƯƠNG TÁC

```
4. Sequence Diagram (sequence-*.puml)
   - Mô tả tương tác giữa các đối tượng
   ↓
5. Communication Diagram (communication-*.puml)
   - Thay thế 1 sequence để đa dạng
   ↓
6. State Diagram (state-*.puml)
   - Chỉ vẽ cho đối tượng có trạng thái phức tạp
```

**Thời gian:** 1 tuần

---

### GIAI ĐOẠN 3: THIẾT KẾ KIẾN TRÚC

```
7. Component Diagram (component.puml)
   - Thiết kế kiến trúc tổng thể
   ↓
8. Package Diagram (package.puml)
   - Tổ chức code thành module
   ↓
9. Deployment Diagram (deployment.puml)
   - Thiết kế hạ tầng triển khai
```

**Thời gian:** 3-5 ngày

---

### GIAI ĐOẠN 4: THIẾT KẾ CHI TIẾT (CUỐI CÙNG)

```
10. Class Diagram (class-full.puml)
    - Thiết kế chi tiết các class
    ↓
11. ER Diagram (er-full.puml)
    - Thiết kế database schema
```

**Thời gian:** 1 tuần

**⚠️ LƯU Ý:** Class và ER Diagram phải vẽ cuối cùng vì:
- Đã hiểu rõ tất cả yêu cầu
- Đã biết tất cả thuộc tính cần thiết
- Có thể điều chỉnh dựa trên sequence và activity diagrams

---

## 📋 CHECKLIST ĐỒ ÁN ĐẦY ĐỦ

### ✅ PHẦN 1: YÊU CẦU (Requirements)
- [ ] Use Case Diagram (1 file)
- [ ] Use Case Specification (21 kịch bản chi tiết)

### ✅ PHẦN 2: QUY TRÌNH (Process)
- [ ] Sequence Diagrams (3-5 files)
  - [ ] Vay vốn (phức tạp)
  - [ ] Chuyển khoản (cơ bản)
  - [ ] Mở tài khoản hoặc Mở tiết kiệm
- [ ] Communication Diagram (1 file - thay thế sequence)
- [ ] Activity Diagrams (4-6 files)
  - [ ] Quy trình vay vốn (01-04) - BẮT BUỘC
  - [ ] Đáo hạn (05-07) HOẶC Credit (10-11)

### ✅ PHẦN 3: TRẠNG THÁI (nếu cần)
- [ ] State Diagram cho Loan (1 file)
- [ ] State Diagram cho Credit Score (tùy chọn)

### ✅ PHẦN 4: KIẾN TRÚC (Architecture)
- [ ] Component Diagram (1 file) - BẮT BUỘC
- [ ] Package Diagram (1 file) - NÊN CÓ
- [ ] Deployment Diagram (1 file) - NÊN CÓ

### ✅ PHẦN 5: THIẾT KẾ CHI TIẾT (Design)
- [ ] Class Diagram (class-full.puml) - BẮT BUỘC
- [ ] ER Diagram (er-full.puml) - BẮT BUỘC

### ✅ PHẦN 6: TÀI LIỆU (Documentation)
- [ ] README.md - Giới thiệu dự án
- [ ] GUIDE.md - Hướng dẫn sử dụng
- [ ] INDEX.md - Danh sách tất cả diagrams

---

## 🎯 GỢI Ý TRÌNH BÀY THEO CHƯƠNG

### CHƯƠNG 1: TỔNG QUAN HỆ THỐNG
**Nội dung:**
- Giới thiệu hệ thống quản lý ngân hàng
- Mục tiêu, phạm vi
- Công nghệ sử dụng

**Sơ đồ:** Không

---

### CHƯƠNG 2: PHÂN TÍCH YÊU CẦU

#### 2.1. Yêu cầu chức năng
**Sơ đồ:**
- ✅ Use Case Diagram (`usecase.puml`)

#### 2.2. Kịch bản Use Case
**Tài liệu:**
- ✅ Use Case Specification (`usecase-specification.md`)
- Chọn 5-8 use case tiêu biểu để trình bày chi tiết

#### 2.3. Quy trình nghiệp vụ
**Sơ đồ:**
- ✅ Activity Diagram - Quy trình vay vốn (4 files)
- ✅ Activity Diagram - Đáo hạn tiết kiệm (3 files) HOẶC Credit (2 files)

---

### CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

#### 3.1. Thiết kế kiến trúc
**Sơ đồ:**
- ✅ Component Diagram (`component.puml`)
- ✅ Package Diagram (`package.puml`)

#### 3.2. Thiết kế tương tác
**Sơ đồ:**
- ✅ Sequence Diagram - Vay vốn (`sequence-vay-von.puml`)
- ✅ Sequence Diagram - Chuyển khoản (`sequence-chuyen-khoan.puml`)
- ✅ Sequence Diagram - Mở tài khoản (`sequence-mo-tai-khoan.puml`)
- ✅ Communication Diagram - Chuyển khoản (`communication-chuyen-khoan.puml`)

#### 3.3. Thiết kế trạng thái
**Sơ đồ:**
- ✅ State Diagram - Loan (`state-loan.puml`)
- ✅ State Diagram - Credit Score (`state-credit-score.puml`)

#### 3.4. Thiết kế chi tiết
**Sơ đồ:**
- ✅ Class Diagram (`class-full.puml`)

#### 3.5. Thiết kế cơ sở dữ liệu
**Sơ đồ:**
- ✅ ER Diagram (`er-full.puml`)

**Tài liệu:**
- ✅ Database Schema SQL (`database/schema_recommended.sql`)

---

### CHƯƠNG 4: TRIỂN KHAI

#### 4.1. Môi trường triển khai
**Sơ đồ:**
- ✅ Deployment Diagram (`deployment.puml`)

#### 4.2. Cấu trúc code
**Sơ đồ:**
- ✅ Package Diagram (`package.puml`)

---

## 💡 MẸO TRÌNH BÀY

### 1. Giải thích Sơ đồ

**Đừng chỉ dán hình!** Phải giải thích:
- Mục đích của sơ đồ
- Các thành phần chính
- Các mối quan hệ
- Các quy tắc nghiệp vụ đặc biệt

**Ví dụ với Sequence Diagram - Chuyển khoản:**
```
Sơ đồ 3.2.1 mô tả quy trình chuyển khoản nội bộ:

1. Khách hàng nhập thông tin chuyển khoản
2. Hệ thống validate tài khoản nguồn và đích
3. Tính phí giao dịch (miễn phí nội bộ, 5,500đ liên ngân hàng)
4. Yêu cầu OTP nếu số tiền > 10,000,000đ
5. Thực hiện transaction với row-level locking
6. Gửi SMS xác nhận cho cả 2 bên

Điểm đặc biệt: Sử dụng FOR UPDATE lock để đảm bảo
không có 2 giao dịch cùng truy cập 1 tài khoản.
```

### 2. Đánh số hình và tham chiếu

```
Như thể hiện trong Hình 3.2 (Sequence Diagram - Chuyển khoản),
quy trình chuyển khoản đảm bảo tính ACID...
```

### 3. So sánh các phương án

**Ví dụ:** Tại sao chọn sequence thay vì communication?
```
Bảng 3.1: So sánh Sequence và Communication Diagram

| Tiêu chí | Sequence | Communication |
|----------|----------|---------------|
| Dễ đọc   | ⭐⭐⭐  | ⭐⭐          |
| Thứ tự rõ | ✅      | ⚠️           |
| Cấu trúc | ⚠️       | ✅           |

→ Chọn Sequence cho hầu hết các use case vì dễ đọc,
  chỉ dùng Communication cho 1 use case để thể hiện đa dạng.
```

### 4. Liên kết giữa các sơ đồ

```
Use Case "Chuyển khoản" (UC08 trong Hình 2.1) được chi tiết hóa
thành Activity Diagram... và Sequence Diagram...
```

---

## 🔧 CÔNG CỤ VẼ SƠ ĐỒ

### PlantUML Online (Khuyến nghị)
- **Link:** https://www.plantuml.com/plantuml/uml/
- **Ưu điểm:** Không cần cài đặt, nhanh
- **Cách dùng:** Copy code → Paste → Xem ngay
- **Export:** PNG, SVG, PDF

### VS Code + Extension
1. Cài extension "PlantUML"
2. Mở file `.puml`
3. Alt+D để xem
4. Export: Ctrl+Shift+P → "Export"

---

## 📏 QUY ĐỊNH HÌNH THỨC

### Kích thước hình ảnh trong báo cáo
- **Width:** 80-100% trang
- **DPI:** 300 cho in, 150 cho PDF
- **Format:** PNG hoặc SVG

### Chú thích hình
```
Hình 3.2: Sequence Diagram - Quy trình chuyển khoản
(Nguồn: Tác giả)
```

### Đánh số
- Theo chương: Hình 3.1, 3.2, 3.3...
- Liên tục trong toàn báo cáo

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. Tính nhất quán

**Tất cả các sơ đồ phải nhất quán về:**
- Tên class, attribute, method
- Tên bảng, cột trong database
- Tên actor, use case
- Luồng xử lý

**Ví dụ:**
- Use Case: "Chuyển khoản"
- Sequence: `transfer()` method
- Activity: "Thực hiện chuyển khoản" activity
- Class: `Transfer` class
- Database: `transaction` table với `type='TRANSFER'`

### 2. Độ chi tiết phù hợp

- **Use Case Diagram:** Tổng quát, không quá chi tiết
- **Activity Diagram:** Chi tiết về luồng xử lý
- **Sequence Diagram:** Chi tiết về tương tác
- **Class Diagram:** Chi tiết về cấu trúc
- **ER Diagram:** Chi tiết về database

### 3. Giải thích thuật ngữ

**BẮT BUỘC giải thích:**
- DTI (Debt-to-Income Ratio)
- LTV (Loan-to-Value Ratio)
- CIC (Credit Information Center)
- ACID (Atomicity, Consistency, Isolation, Durability)
- OTP (One-Time Password)

### 4. Trích dẫn nguồn

Nếu sử dụng công thức, thuật toán từ nguồn khác → Trích dẫn

**Ví dụ:**
```
Công thức tính Credit Score dựa trên FICO Score [1]

[1] Fair Isaac Corporation. "Understanding FICO Scores", 2023.
```

---

## 📚 TÀI LIỆU THAM KHẢO

### UML Standards
- **OMG UML Specification:** https://www.omg.org/spec/UML/
- **UML Basics:** https://www.uml-diagrams.org

### PlantUML
- **Official Docs:** http://plantuml.com/guide
- **Use Case:** http://plantuml.com/use-case-diagram
- **Sequence:** http://plantuml.com/sequence-diagram
- **Activity:** http://plantuml.com/activity-diagram-beta
- **Class:** http://plantuml.com/class-diagram
- **Component:** http://plantuml.com/component-diagram
- **Deployment:** http://plantuml.com/deployment-diagram
- **State:** http://plantuml.com/state-diagram

### Banking Domain
- **Basel III:** https://www.bis.org/bcbs/basel3.htm
- **Banking Regulations:** Nghị định 88/2019/NĐ-CP

---

## 📞 CHECKLIST TRƯỚC KHI NỘP

- [ ] Tất cả hình ảnh rõ nét, đủ kích thước
- [ ] Tất cả hình có đánh số và chú thích
- [ ] Tất cả sơ đồ có giải thích trong text
- [ ] Tên class/table/method nhất quán giữa các sơ đồ
- [ ] Không có lỗi chính tả trong sơ đồ
- [ ] File PDF không bị vỡ layout
- [ ] Tất cả thuật ngữ đã được giải thích
- [ ] Có danh mục hình (List of Figures)
- [ ] Có mục lục (Table of Contents)
- [ ] Đã kiểm tra plagiarism

---

## 🎓 TIÊU CHÍ CHẤM ĐIỂM (Tham khảo)

### 1. Phân tích yêu cầu (20%)
- Use Case Diagram đầy đủ (5%)
- Kịch bản use case chi tiết (10%)
- Activity Diagram (5%)

### 2. Thiết kế hệ thống (40%)
- Sequence/Communication Diagram (10%)
- State Diagram (5%)
- Component/Package Diagram (10%)
- Class Diagram (10%)
- ER Diagram (5%)

### 3. Triển khai (20%)
- Deployment Diagram (5%)
- Code structure (10%)
- Demo (5%)

### 4. Báo cáo (20%)
- Trình bày (5%)
- Giải thích sơ đồ (10%)
- Tài liệu tham khảo (5%)

---

## ✨ KẾT LUẬN

Dự án này đã cung cấp đầy đủ:
- ✅ 1 Use Case Diagram + 21 kịch bản chi tiết
- ✅ 6 Sequence Diagrams + 1 Communication Diagram
- ✅ 11 Activity Diagrams (chia nhỏ theo nghiệp vụ)
- ✅ 2 State Diagrams
- ✅ 1 Component Diagram
- ✅ 1 Package Diagram
- ✅ 1 Deployment Diagram
- ✅ 2 Class Diagrams (core + full)
- ✅ 2 ER Diagrams (core + full)
- ✅ Database Schema SQL

**Tổng cộng: 28 files UML + 1 file kịch bản + 1 file SQL**

**→ ĐỦ ĐỂ LÀM ĐỒ ÁN HOÀN CHỈNH!**

Chúc bạn làm đồ án thành công! 🎉

---

**Phiên bản:** 1.0  
**Ngày:** 01/11/2025  
**Tác giả:** Hệ thống Quản lý Ngân hàng

