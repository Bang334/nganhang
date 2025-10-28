# 🎨 DESIGN SYSTEM & UI GUIDELINES

> Tài liệu chi tiết về thiết kế giao diện và hướng dẫn xây dựng web với style tương tự

---

## 📋 MỤC LỤC

1. [Tổng quan Design System](#1-tổng-quan-design-system)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Animations](#6-animations)
7. [Responsive Design](#7-responsive-design)
8. [Best Practices](#8-best-practices)

---

## 1. TỔNG QUAN DESIGN SYSTEM

### Phong cách thiết kế

**Modern Gradient Banking UI** - Giao diện ngân hàng hiện đại với gradient và glassmorphism

**Đặc điểm nổi bật:**
- ✨ **Gradient backgrounds** - Sử dụng linear-gradient cho các element quan trọng
- 🎯 **Card-based layout** - Mọi thứ được đóng gói trong cards
- 🌊 **Smooth animations** - Transition mượt mà, fade-in effects
- 📱 **Responsive** - Tự động adapt với mọi screen size
- 🎨 **Color-coded** - Mỗi loại thông tin có màu riêng
- 💫 **Interactive** - Hover effects, active states rõ ràng

### Tech Stack

```css
/* Core CSS Features */
- CSS Variables (Custom Properties)
- CSS Grid & Flexbox
- CSS Animations & Transitions
- Pseudo-elements (::before, ::after)
- Linear Gradients
- Box Shadows
- Border Radius
```

---

## 2. COLOR PALETTE

### Primary Colors (CSS Variables)

```css
:root {
  /* Primary - Blue gradient */
  --primary-color: #1e40af;      /* Main blue */
  --primary-dark: #1e3a8a;       /* Darker blue */
  --primary-light: #3b82f6;      /* Lighter blue */
  
  /* Secondary - Green */
  --secondary-color: #10b981;    /* Success green */
  
  /* Semantic Colors */
  --danger-color: #ef4444;       /* Red */
  --warning-color: #f59e0b;      /* Orange */
  --success-color: #10b981;      /* Green */
  
  /* Text Colors */
  --text-primary: #1f2937;       /* Dark gray */
  --text-secondary: #6b7280;     /* Medium gray */
  
  /* Background Colors */
  --bg-primary: #ffffff;         /* White */
  --bg-secondary: #f9fafb;       /* Light gray */
  --bg-tertiary: #f3f4f6;        /* Lighter gray */
  
  /* Border */
  --border-color: #e5e7eb;       /* Light gray */
}
```

### Gradient Presets

**Sử dụng rất nhiều trong project:**

```css
/* Purple Gradient - Header/Hero sections */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Blue Gradient - Primary actions */
background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);

/* Green Gradient - Success states */
background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);

/* Red Gradient - Danger/Delete */
background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);

/* Light Blue Gradient - Cards */
background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);

/* Light Green - Info boxes */
background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);

/* Orange Gradient - Warning */
background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
```

### Semantic Color Usage

| Màu | Sử dụng cho | Ví dụ |
|-----|-------------|-------|
| **Blue** | Primary actions, links | Buttons, active states |
| **Green** | Success, completed, available | Status badges, confirm |
| **Red** | Danger, errors, rejected | Delete, cancel, errors |
| **Orange** | Warning, pending | Alerts, pending status |
| **Purple** | Headers, special features | Dashboard header, highlights |
| **Gray** | Text, borders, disabled | Secondary text, dividers |

---

## 3. TYPOGRAPHY

### Font Stack

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
               'Fira Sans', 'Droid Sans', 'Helvetica Neue',
               sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 
               'Courier New', monospace;
}
```

### Font Sizes

```css
/* Utility classes */
.text-xs   { font-size: 0.75rem; }    /* 12px - Small labels */
.text-sm   { font-size: 0.875rem; }   /* 14px - Body text */
.text-base { font-size: 1rem; }       /* 16px - Base */
.text-lg   { font-size: 1.125rem; }   /* 18px - Subheadings */
.text-xl   { font-size: 1.25rem; }    /* 20px - Card titles */
.text-2xl  { font-size: 1.5rem; }     /* 24px - Section titles */
.text-3xl  { font-size: 1.875rem; }   /* 30px - Page titles */
```

### Font Weights

```css
.font-normal    { font-weight: 400; }  /* Regular text */
.font-medium    { font-weight: 500; }  /* Emphasized */
.font-semibold  { font-weight: 600; }  /* Labels, buttons */
.font-bold      { font-weight: 700; }  /* Titles, important */
```

### Typography Scale Examples

```html
<!-- Page Title -->
<h1 class="page-title">Tổng quan tài khoản</h1>
/* font-size: 1.875rem (30px), font-weight: 700 */

<!-- Card Header -->
<div class="card-header">Thông tin chi tiết</div>
/* font-size: 1.25rem (20px), font-weight: 600 */

<!-- Body Text -->
<p class="text-secondary">Mô tả ngắn gọn</p>
/* font-size: 0.875rem (14px), color: #6b7280 */

<!-- Label -->
<label class="form-label">Số tài khoản</label>
/* font-size: 0.875rem (14px), font-weight: 600 */
```

---

## 4. SPACING & LAYOUT

### Spacing Scale

```css
/* Margin & Padding utilities */
.mt-1 { margin-top: 0.5rem; }     /* 8px */
.mt-2 { margin-top: 1rem; }       /* 16px */
.mt-3 { margin-top: 1.5rem; }     /* 24px */
.mt-4 { margin-top: 2rem; }       /* 32px */

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

/* Gap for flex/grid */
.gap-1 { gap: 0.5rem; }    /* 8px */
.gap-2 { gap: 1rem; }      /* 16px */
.gap-3 { gap: 1.5rem; }    /* 24px */
```

### Grid System

**Responsive Grid với auto-fit:**

```css
/* 2 columns */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* 3 columns */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* 4 columns */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
```

**Cách sử dụng:**
```html
<!-- Auto responsive 3 columns -->
<div class="grid grid-3">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<!-- Tự động xuống 1 cột trên mobile -->
```

### Flexbox Utilities

```css
/* Common flex patterns */
.flex {
  display: flex;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

---

## 5. COMPONENTS

### 5.1. Cards

**Base Card:**
```css
.card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}
```

**Enhanced Card (Teller Dashboard):**
```css
.teller-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.teller-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

**Card with Header:**
```html
<div class="teller-card">
  <div class="teller-card-header blue">
    <h3>Tiêu đề Card</h3>
  </div>
  <div class="teller-card-body">
    Nội dung...
  </div>
</div>
```

**Stat Card (Gradient):**
```css
.stat-card {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

/* Variants */
.stat-card.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-card.warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stat-card.danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}
```

### 5.2. Buttons

**Base Button:**
```css
.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
}
```

**Button Variants:**
```css
/* Primary */
.btn-primary {
  background: var(--primary-color);
  color: white;
}

/* Gradient Button (Enhanced) */
.teller-btn-primary {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.teller-btn-primary:hover {
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Outline */
.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}
```

**Button Usage:**
```html
<!-- Regular button -->
<button class="btn btn-primary">
  <CheckIcon size={18} />
  Xác nhận
</button>

<!-- Gradient button -->
<button class="teller-btn teller-btn-success">
  <Save size={18} />
  Lưu thông tin
</button>
```

### 5.3. Forms

**Form Group:**
```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-label .required {
  color: #e53e3e;
}
```

**Input Fields:**
```css
.form-control,
.teller-form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: white;
}

.form-control:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  background: #f7fafc;
}
```

**Form Example:**
```html
<div class="form-group">
  <label class="form-label">
    Số tiền <span class="required">*</span>
  </label>
  <input 
    type="number" 
    class="form-control" 
    placeholder="Nhập số tiền"
  />
  <small class="form-helper">Số tiền tối thiểu: 100,000 VND</small>
</div>
```

### 5.4. Badges

```css
.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

.badge-success {
  background: #d1fae5;
  color: #065f46;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background: #dbeafe;
  color: #1e40af;
}
```

**Usage:**
```html
<span class="badge badge-success">Hoạt động</span>
<span class="badge badge-warning">Chờ duyệt</span>
<span class="badge badge-danger">Đã từ chối</span>
```

### 5.5. Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: var(--bg-tertiary);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-color);
}

.table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.table tr:hover {
  background: var(--bg-secondary);
}
```

### 5.6. Modals

**Modal Structure:**
```html
<div class="modal-overlay" onClick={closeModal}>
  <div class="modal-content modal-lg" onClick={stopPropagation}>
    <div class="modal-header">
      <h3>Tiêu đề Modal</h3>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      Nội dung...
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Hủy</button>
      <button class="btn btn-primary">Xác nhận</button>
    </div>
  </div>
</div>
```

**Modal Sizes:**
```css
.modal-sm { max-width: 400px; }
.modal-md { max-width: 600px; }
.modal-lg { max-width: 900px; }
```

### 5.7. Sidebar Navigation

**Sidebar với Gradient Header:**
```css
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid #e2e8f0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.06);
}

.sidebar-header {
  padding: 1.38rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.nav-item.active {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}
```

### 5.8. Info Boxes

```css
.teller-info-box {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-left: 4px solid #4299e1;
  padding: 1.25rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.teller-info-box.success {
  background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
  border-left-color: #48bb78;
}

.teller-info-box.danger {
  background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
  border-left-color: #f56565;
}
```

### 5.9. Alerts

```css
.teller-alert {
  padding: 1rem 1.25rem;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.teller-alert.warning {
  background: #fffaf0;
  border: 1px solid #fbd38d;
  color: #744210;
}

.teller-alert.success {
  background: #f0fff4;
  border: 1px solid #9ae6b4;
  color: #22543d;
}
```

---

## 6. ANIMATIONS

### Keyframe Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse (for backgrounds) */
@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.5; 
  }
  50% { 
    transform: scale(1.1); 
    opacity: 0.3; 
  }
}

/* Spin (for loading) */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Transition Effects

```css
/* Smooth transitions for interactive elements */
.btn,
.nav-item,
.card {
  transition: all 0.3s ease;
}

/* Hover elevate */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Button press */
.btn:active {
  transform: translateY(0);
}
```

### Usage Examples

```html
<!-- Fade in content -->
<div class="fade-in">
  <h2>Content appears smoothly</h2>
</div>

<!-- Animated button -->
<button class="btn btn-primary" style="animation: fadeIn 0.5s ease-out">
  Click me
</button>
```

---

## 7. RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First Approach */

/* Base styles - Mobile (< 640px) */
.grid-2, .grid-3, .grid-4 {
  grid-template-columns: 1fr;
}

/* Tablet (≥ 640px) */
@media (min-width: 640px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Mobile Adaptations

```css
@media (max-width: 768px) {
  /* Sidebar becomes drawer */
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  /* Stack cards */
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
  
  /* Reduce padding */
  .card {
    padding: 1rem;
  }
  
  /* Smaller font sizes */
  .stat-value {
    font-size: 1.5rem;
  }
}
```

### Mobile Menu

```html
<!-- Hamburger menu appears on mobile -->
<button class="menu-btn">
  <Menu size={24} />
</button>

<!-- Overlay when sidebar open -->
<div class="sidebar-overlay"></div>
```

---

## 8. BEST PRACTICES

### 8.1. CSS Organization

**File Structure:**
```
styles/
├── index.css          # Global styles, variables
├── App.css            # App-level utilities
├── Dashboard.css      # Dashboard specific
├── TellerDashboard.css # Teller enhancements
├── Modal.css          # Modal components
└── LoginPage.css      # Page-specific styles
```

**CSS Variable Usage:**
```css
/* ✅ GOOD - Use variables */
.button {
  color: var(--primary-color);
}

/* ❌ BAD - Hardcoded values */
.button {
  color: #1e40af;
}
```

### 8.2. Gradient Guidelines

**Angle: Always 135deg**
```css
/* ✅ Consistent angle */
background: linear-gradient(135deg, #start 0%, #end 100%);
```

**Color Stops:**
```css
/* ✅ Use 0% and 100% for clarity */
linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* ❌ Avoid */
linear-gradient(135deg, #667eea, #764ba2);
```

### 8.3. Naming Conventions

**BEM-inspired but relaxed:**
```css
/* Component */
.teller-card { }

/* Component part */
.teller-card-header { }
.teller-card-body { }

/* Component variant */
.teller-card-header.blue { }

/* State */
.nav-item.active { }
```

### 8.4. Hover Effects Pattern

**Standard elevation pattern:**
```css
.element {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.element:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.element:active {
  transform: translateY(0);
}
```

### 8.5. Icon + Text Pattern

**Always use flex with gap:**
```html
<button class="btn btn-primary">
  <IconComponent size={18} />
  Button Text
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;  /* Space between icon and text */
}
```

### 8.6. Box Shadow Levels

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Usage */
.card { box-shadow: var(--shadow); }
.card:hover { box-shadow: var(--shadow-lg); }
```

### 8.7. Border Radius Scale

```css
/* Consistent radius throughout */
.btn { border-radius: 8px; }      /* Buttons */
.card { border-radius: 12px; }    /* Cards */
.teller-card { border-radius: 16px; }  /* Enhanced cards */
.modal { border-radius: 16px; }   /* Modals */
.badge { border-radius: 9999px; } /* Pills */
```

---

## 9. COMMON PATTERNS

### Pattern 1: Gradient Card with Icon

```html
<div class="stat-card success">
  <div class="stat-header">
    <div>
      <div class="stat-title">Tổng số dư</div>
      <div class="stat-value">125,500,000 ₫</div>
      <div class="stat-change">+12.5% so với tháng trước</div>
    </div>
    <DollarSign size={40} style={{opacity: 0.8}} />
  </div>
</div>
```

### Pattern 2: Info Display Grid

```html
<div class="grid grid-3 mb-4">
  <div>
    <label class="form-label">Số tài khoản</label>
    <p class="font-semibold">1001234567</p>
  </div>
  <div>
    <label class="form-label">Ngày mở</label>
    <p class="font-semibold">01/01/2023</p>
  </div>
  <div>
    <label class="form-label">Trạng thái</label>
    <span class="badge badge-success">Hoạt động</span>
  </div>
</div>
```

### Pattern 3: Action Card

```html
<div class="teller-card">
  <div class="teller-card-header blue">
    <h3>
      <CreditCard size={20} />
      Nạp tiền
    </h3>
  </div>
  <div class="teller-card-body">
    <!-- Form content -->
  </div>
  <div class="teller-actions">
    <button class="teller-btn teller-btn-secondary">Hủy</button>
    <button class="teller-btn teller-btn-primary">Xác nhận</button>
  </div>
</div>
```

### Pattern 4: User Info Card

```html
<div class="user-info">
  <div class="user-avatar">NV</div>
  <div>
    <div class="user-name">Nguyễn Văn A</div>
    <div class="user-role">Khách hàng</div>
    <div class="user-code">CUS001</div>
  </div>
</div>
```

---

## 10. QUICK START TEMPLATE

### Minimal HTML Template

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Banking App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>💼 Bank System</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <HomeIcon />
          Tổng quan
        </a>
        <!-- More nav items -->
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="topbar">
        <h1>Dashboard</h1>
      </div>
      <div class="content">
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title">Tổng số dư</div>
            <div class="stat-value">125M ₫</div>
          </div>
        </div>

        <!-- Content Cards -->
        <div class="grid grid-2">
          <div class="card">Card 1</div>
          <div class="card">Card 2</div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
```

### Minimal CSS Template

```css
/* Import or include the design system CSS */
@import 'design-system.css';

/* Your custom styles */
.custom-component {
  /* Inherit from design system */
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
}
```

---

## 11. RESOURCES

### Icons
- **Lucide React**: `npm install lucide-react`
- Consistent 18-24px size for inline icons

### Gradients Generator
- cssgradient.io
- uigradients.com

### Color Palette Tools
- coolors.co
- Adobe Color

### CSS Tools
- CSS Gradient Animator
- Box Shadow Generator

---

## 📝 CHECKLIST KHI XÂY DỰNG WEB MỚI

### Design Phase
- [ ] Định nghĩa color palette với CSS variables
- [ ] Chọn font system phù hợp
- [ ] Thiết kế spacing scale (8px base)
- [ ] Vẽ wireframe cho main components

### Development Phase  
- [ ] Setup CSS variables trong :root
- [ ] Tạo utility classes (grid, flex, spacing)
- [ ] Build base components (card, button, form)
- [ ] Implement gradient patterns
- [ ] Add hover/active states
- [ ] Setup animations (fadeIn, slideUp)

### Polish Phase
- [ ] Test responsive breakpoints
- [ ] Add smooth transitions
- [ ] Optimize shadows and borders
- [ ] Fine-tune color contrasts
- [ ] Test accessibility (keyboard nav, contrast)

### Performance
- [ ] Minimize CSS file size
- [ ] Use CSS variables for dynamic values
- [ ] Lazy load heavy components
- [ ] Optimize animations (use transform/opacity)

---

## 🎯 KEY TAKEAWAYS

1. **Gradients everywhere** - 135deg angle, từ light → dark
2. **Card-based** - Mọi thứ trong cards với border-radius 12-16px
3. **Smooth transitions** - 0.3s ease cho mọi interactive elements
4. **CSS Variables** - Dùng variables cho colors, shadows
5. **Mobile-first** - Grid tự động collapse về 1 cột
6. **Hover effects** - translateY(-2px) + shadow tăng
7. **Icon + Text** - Luôn dùng flex với gap
8. **Consistent spacing** - 0.5rem, 1rem, 1.5rem, 2rem

---

**Happy Coding! 🚀**

---

*Cập nhật: 27/10/2025*  
*Version: 1.0*

