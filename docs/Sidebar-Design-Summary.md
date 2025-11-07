# Tóm Tắt Thiết Kế Sidebar - ABC Bank System

## 📋 Tổng Quan

Sidebar của hệ thống ABC Bank được thiết kế theo phong cách hiện đại, gradient đẹp mắt với các hiệu ứng tương tác mượt mà. Sidebar được sử dụng chung cho tất cả các dashboard (Admin, Teller, Customer, Loan Officer) với các thay đổi nhỏ về nội dung tùy theo vai trò người dùng.

---

## 🎨 Cấu Trúc Sidebar

Sidebar được chia thành **4 phần chính** theo thứ tự từ trên xuống:

### 1. **Sidebar Header (Đầu sidebar)**
- **Chiều cao**: ~70px (padding: 1.38rem × 1.5rem)
- **Màu nền**: Gradient tím đẹp mắt
  - Từ `#667eea` (xanh tím nhạt) đến `#764ba2` (tím đậm)
  - Gradient theo hướng 135 độ
- **Hiệu ứng**: 
  - Có animation pulse (nhấp nháy nhẹ) với radial gradient overlay
  - Animation chạy vô hạn mỗi 4 giây
- **Nội dung**:
  - Icon logo bên trái (Building2 hoặc CreditCard, size 32px)
  - Text "ABC Bank" hoặc "ABC Bank Admin" (font-size: 1.35rem, font-weight: 700)
  - Nút đóng (X) ở bên phải - chỉ hiển thị trên mobile

### 2. **User Info Card (Thông tin người dùng)**
- **Vị trí**: Ngay dưới header, có margin 1rem
- **Kích thước**: 
  - Padding: 1.5rem
  - Border-radius: 16px
- **Màu sắc**:
  - Nền: Gradient xanh lá nhạt (`#f0fdf4` → `#dcfce7`)
  - Border: 1px solid `#86efac` (xanh lá)
  - Box-shadow: nhẹ với màu xanh lá
- **Hiệu ứng hover**:
  - Nâng lên 2px (`translateY(-2px)`)
  - Box-shadow tăng cường
  - Cursor: pointer (có thể click để mở profile modal)
- **Bên trong gồm**:
  - **Avatar**: 
    - Hình tròn 56×56px
    - Gradient tím giống header
    - Hiển thị chữ cái đầu của tên
    - Có border trắng 3px và shadow tím
  - **Thông tin**:
    - Tên: font-weight 700, màu xanh đậm `#166534`
    - Vai trò: Badge tròn màu trắng với text xanh `#15803d`
    - Mã nhân viên/khách hàng: Text nhỏ màu xanh lá, font monospace

### 3. **Navigation Menu (Menu điều hướng)**
- **Vị trí**: Chiếm phần còn lại của sidebar (flex: 1)
- **Padding**: 0.5rem 1rem 1rem
- **Scrollbar**: 
  - Rộng 6px
  - Màu xám nhạt `#cbd5e1`
  - Border-radius: 10px
  - Hover: màu xám đậm hơn `#94a3b8`

#### **Nav Item (Mỗi menu item)**
- **Padding**: 0.875rem 1rem
- **Margin-bottom**: 0.375rem
- **Border-radius**: 12px
- **Màu chữ mặc định**: `#64748b` (xám xanh)
- **Font-size**: 0.9rem, font-weight: 500

**Trạng thái Normal**:
- Màu chữ: xám xanh
- Không có nền

**Trạng thái Hover**:
- Nền: Gradient xám nhạt (`#f1f5f9` → `#e2e8f0`)
- Màu chữ: `#1e293b` (đen xám)
- Dịch chuyển sang phải 4px (`translateX(4px)`)
- Padding-left tăng lên 1.25rem
- Thanh chỉ bên trái xuất hiện (width: 4px) với gradient tím
- Icon phóng to 1.1 lần

**Trạng thái Active (Đang ở trang đó)**:
- Nền: Gradient xanh dương nhạt (`#dbeafe` → `#bfdbfe`)
- Màu chữ: `#1e40af` (xanh dương đậm)
- Font-weight: 700
- Box-shadow: màu xanh dương nhẹ
- Có thanh chỉ bên trái gradient xanh dương
- Icon phóng to 1.1 lần

**Thanh chỉ bên trái**:
- Màu: Gradient tím hoặc xanh dương
- Chiều cao: 70% của item
- Border-radius: 0 4px 4px 0
- Animation: slide từ width 0 → 4px trong 0.3s

### 4. **Logout Button (Nút đăng xuất)**
- **Vị trí**: Dưới cùng, có margin 1rem
- **Padding**: 0.95rem 1rem
- **Border-radius**: 12px
- **Màu sắc**:
  - Nền: Gradient đỏ nhạt (`#fef2f2` → `#fee2e2`)
  - Border: 2px solid `#fee2e2`
  - Chữ: `#dc2626` (đỏ)
- **Hiệu ứng hover**:
  - Nền chuyển thành gradient đỏ đậm (`#dc2626` → `#b91c1c`)
  - Chữ chuyển thành trắng
  - Nâng lên 3px
  - Box-shadow đỏ mạnh
  - Icon xoay -10 độ và phóng to 1.1 lần
- **Animation**: Slide effect từ trái sang phải

---

## 📐 Kích Thước & Layout

### Desktop (Màn hình > 1024px)
- **Chiều rộng sidebar**: 280px cố định
- **Vị trí**: Fixed (cố định) bên trái màn hình
- **Chiều cao**: 100vh (full màn hình)
- **Z-index**: 1000
- **Main content**: Margin-left 280px để tránh bị che

### Tablet/Mobile (Màn hình ≤ 1024px)
- **Sidebar**: 
  - Ẩn mặc định (`translateX(-100%)`)
  - Khi mở: `translateX(0)`
  - Vẫn giữ chiều rộng 280px
- **Overlay**: 
  - Lớp phủ màu đen mờ 50% (`rgba(0, 0, 0, 0.5)`)
  - Che toàn bộ màn hình
  - Z-index: 999 (thấp hơn sidebar)
- **Menu button**: Hiển thị ở topbar để mở sidebar
- **Close button**: Hiển thị ở góc phải header

---

## 🎨 Màu Sắc Chi Tiết

### Gradient Chính
1. **Header**: `#667eea` → `#764ba2` (tím)
2. **User Info**: `#f0fdf4` → `#dcfce7` (xanh lá nhạt)
3. **Nav Item Hover**: `#f1f5f9` → `#e2e8f0` (xám nhạt)
4. **Nav Item Active**: `#dbeafe` → `#bfdbfe` (xanh dương nhạt)
5. **Logout**: `#fef2f2` → `#fee2e2` (đỏ nhạt)
6. **Logout Hover**: `#dc2626` → `#b91c1c` (đỏ đậm)

### Màu Chữ
- **Header**: Trắng
- **User Name**: `#166534` (xanh đậm)
- **User Role**: `#15803d` (xanh lá)
- **User Code**: `#22c55e` (xanh lá sáng)
- **Nav Item**: `#64748b` (xám xanh)
- **Nav Item Hover**: `#1e293b` (đen xám)
- **Nav Item Active**: `#1e40af` (xanh dương đậm)
- **Logout**: `#dc2626` (đỏ)

---

## ✨ Hiệu Ứng & Animation

### Transition
- **Sidebar**: `transform 0.3s ease`
- **Nav Item**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **User Info**: `all 0.3s ease`
- **Logout**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Animation
1. **Pulse trên Header**: 
   - Scale từ 1 → 1.1 → 1
   - Opacity từ 0.5 → 0.3 → 0.5
   - Thời gian: 4s, infinite

2. **Nav Item Hover**:
   - Slide sang phải 4px
   - Thanh chỉ bên trái xuất hiện
   - Icon scale 1.1

3. **Logout Hover**:
   - Slide effect từ trái sang phải
   - Icon rotate -10deg + scale 1.1
   - Nâng lên 3px

---

## 📱 Responsive Behavior

### Breakpoints
- **Desktop**: > 1024px - Sidebar luôn hiển thị
- **Tablet/Mobile**: ≤ 1024px - Sidebar ẩn, có thể mở bằng menu button

### Mobile Features
- Overlay tối khi sidebar mở
- Click overlay để đóng sidebar
- Close button ở header
- Menu button ở topbar để mở

---

## 🔧 Cấu Trúc Component

Mỗi Dashboard component (AdminDashboard, TellerDashboard, CustomerDashboard, LoanOfficerDashboard) có cấu trúc tương tự:

```jsx
<aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
  {/* Header */}
  <div className="sidebar-header">...</div>
  
  {/* User Info */}
  <div className="user-info">...</div>
  
  {/* Navigation */}
  <nav className="sidebar-nav">
    {menuItems.map(item => (
      <Link className="nav-item">...</Link>
    ))}
  </nav>
  
  {/* Logout */}
  <button className="logout-btn">...</button>
</aside>
```

---

## 📝 Ghi Chú Thiết Kế

1. **Shadow**: Sidebar có shadow nhẹ ở bên phải để tạo độ sâu
2. **Gradient**: Sử dụng gradient nhiều nơi để tạo cảm giác hiện đại
3. **Border-radius**: Sử dụng border-radius lớn (12-16px) cho cảm giác mềm mại
4. **Hover Effects**: Mọi element đều có hover effect để tăng tương tác
5. **Color Scheme**: Sử dụng màu tím/xanh làm chủ đạo, đỏ cho logout để nổi bật
6. **Typography**: Font-weight 700 cho các text quan trọng

---

## 🎯 Tóm Tắt Ngắn Gọn

**Sidebar** là một panel cố định bên trái với:
- **Header tím gradient** với logo và tên hệ thống
- **Card thông tin user** màu xanh lá với avatar tròn
- **Menu navigation** với các item có hover/active effects đẹp mắt
- **Nút logout** màu đỏ ở dưới cùng
- **Responsive**: Ẩn trên mobile, mở bằng menu button
- **Animations**: Mượt mà, chuyên nghiệp với các hiệu ứng hover và transition

Thiết kế tổng thể: **Hiện đại, chuyên nghiệp, dễ sử dụng**

